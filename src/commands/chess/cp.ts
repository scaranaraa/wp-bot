import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { Chess } from 'chess.js';
import pkg from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';
import { type chessbase } from '../../types/chess.js';
import client from '../../../index.js';

const { Client, LocalAuth, MessageMedia } = pkg;
// compare fen using san moves that u have with given move
// check for illegal move by playing the move, if played and no error but no match, wrong move, else if error then invalid move else correct

// PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
class puzzle implements chessbase {
	constructor(client: pkg.Client, id: string, mode = 'onemove') {
		this.mode = mode;
		this.chatid = id;
		this.client = client;
		this.points = 10;
		this.rating = 0;
		this.themes = '';
		this.hintsused = 0;
		this.moves = [];
		this.wrongs = 0;
		this.time = 0;
		this.fen = '';
		this.newfen = '';
		this.gamelink = '';
		this.newmedia;
		this.newthemes = '';
		this.chess;
		this.newmoves = [];
		this.newrating = 0;
		this.newpoints = 0;
		this.newgamelink = '';
		this.preloaded = false;
	}

	client: pkg.Client;

	id: string;

	chatid: string;

	mode: string;

	points: number;

	rating: number;

	themes: string;

	hintsused: number;

	moves: string[];

	wrongs: number;

	time: number;

	chess: Chess;

	fen: string;

	newfen: string;

	gamelink: string;

	newmedia: pkg.MessageMedia;

	newthemes: string;

	newmoves: string[];

	newrating: number;

	newpoints: number;

	newgamelink: string;

	preloaded: boolean;

	async preloadpuzzle() {
		const game = this;
		const random = Math.floor(Math.random() * 3678110) + 1;
		createReadStream('./src/commands/chess/lichess_db_puzzle.csv')
			.pipe(parse({ delimiter: ',', from_line: random, to_line: random }))
			.on('data', async function (row) {
				game.newthemes = row[7];
				if (game.mode == 'onemove') {
					game.newmoves = [row[2].split(' ')[1]];
				} else {
					game.newmoves = row[2].split(' ');
					game.newmoves.shift();
				}

				game.newrating = row[3];
				game.newpoints = Math.floor(game.newrating / 100);
				if (game.mode == 'onemove') {
					game.newpoints = Math.floor(game.newpoints / 2);
				}

				game.newgamelink = row[8];
				const chess2 = new Chess(row[1]);
				chess2.move(row[2].slice(0, 4));
				const newFen = chess2.fen();
				game.newfen = newFen;
				const media = await game.getURL(newFen);
				game.newmedia = media;
				game.preloaded = true;
			});
	}

	async preloadmove() {
		// if mode is not 'onemove', preload the next move instead of a new puzzle.
		// skip opponents turn and continue puzzle
	}

	async getpuzzle() {
		if (!this.preloaded) {
			setTimeout(async () => this.getpuzzle(), 2000);
			return;
		}

		this.preloaded = false;
		await this.client.sendMessage(this.chatid, this.newmedia);
		const chess = new Chess(this.newfen);
		this.chess = chess;
		this.rating = this.newrating;
		this.points = this.newpoints;
		this.themes = this.newthemes;
		this.gamelink = this.newgamelink;
		this.moves = this.newmoves;
		this.fen = this.newfen;
		this.hintsused = 0;
		this.wrongs = 0;
		this.time = Date.now();
		this.waitforanswer();
		this.preloadpuzzle();
	}

	async getURL(fen: string) {
		const color = fen.split(' ')[1];
		const url = `https://fen2image.chessvision.ai/${fen}?turn=${color == 'w' ? 'white' : 'black'}&pov=${color == 'w' ? 'white' : 'black'}`;
		const media = await MessageMedia.fromUrl(url, { unsafeMime: true });
		return media;
	}

	async waitforanswer() {
		const nextmove = this.moves[0];
		const game = this;
		await this.chess.move(nextmove);
		const newfen = this.chess.fen();
		await this.chess.undo();
		this.client.on('message_create', async function wait(msg) {
			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			const user = await msg.getContact();
			let res = msg.body;
			if (
				res.toLowerCase() == 'link' ||
				res.toLowerCase() == 'quit' ||
				res.toLowerCase() == 'solution'
			) {
				game.points = 0;
				game.points -= 5;
				for (let i = 0; i < game.moves.length; i++) {
					game.chess.move(game.moves[i]);
				}

				game.client.sendMessage(
					game.chatid,
					`Solution - ${game.chess.history().join(' ')}`
				);
				game.client.sendMessage(
					game.chatid,
					`Lichess puzzle link - ${game.gamelink}`
				);
				game.client.sendMessage(game.chatid, 'Game ended!');
				game.client.ingame = false;
				game.client.removeListener('message_create', wait);
				return;
			}

			if (res.toLowerCase() == 'hint') {
				if (game.hintsused == 0) {
					game.points -= 3;
					game.client.sendMessage(
						game.chatid,
						`Square to move from - ${nextmove.slice(0, 2)}`
					);
					game.hintsused++;
				} else if (game.hintsused == 1) {
					game.points -= 5;
					game.client.sendMessage(
						game.chatid,
						`Square to move to - ${nextmove.slice(2, 4)}`
					);
					game.hintsused++;
				} else if (game.hintsused == 2) {
					game.points -= 5;
					game.client.sendMessage(game.chatid, `Puzzle tags -  ${game.themes}`);
					game.hintsused++;
				} else {
					game.client.sendMessage(game.chatid, 'All hints used up!');
				}
			} else if (
				res.toLowerCase().startsWith('move ') ||
				res.toLowerCase().startsWith('play ')
			) {
				res = res.slice(5);
				try {
					game.chess.move(res);
					if (game.chess.fen() == newfen) {
						msg.react('✅');
						game.moves.shift();
						if (game.moves.length == 0) {
							const timetaken = (Date.now() - game.time) / 1000;
							game.client.sendMessage(
								game.chatid,
								`Your solution was correct! You solved it in *${timetaken}* seconds! \nYou used *${game.hintsused}* hints. \nYou got *${game.points}* points!`
							);
							game.client.sendMessage(
								game.chatid,
								`Lichess puzzle link - ${game.gamelink}`
							);
							const user2 = new baseuser({
								userId: user.number,
								users: game.client.cachedUsers,
							});
							user2.setPuzzleELO(game.points);
							game.client.ingame = false;
							game.client.removeListener('message_create', wait);
						} else {
							const media = await game.getURL(game.chess.fen());
							game.client.sendMessage(game.chatid, media);
							game.waitforanswer();
						}
					} else {
						msg.react('❌');
						game.points -= 2;
						game.wrongs++;
						game.chess.undo();
					}
				} catch (e) {
					console.log(e);
					msg.react('⁉');
				}
			}
		});
	}
}
const game = new puzzle(client, '', 'onemove');
game.preloadpuzzle();
export const name = 'Chess Puzzle';
export const args = true;
export const aliases = ['chess', 'puzzle', 'cp'];
export const description = 'Get one move chess puzzles';
export const category = 'Chess';
/**
 * @memberof! Chess
 * @name ChessPuzzle
 * @description
 * Manages chess puzzles within a WhatsApp chat.
 * 
 * This class handles puzzle loading, retrieval, user interaction, and scoring.
 * It utilizes the 'chess.js' library for game logic and interacts with a CSV database of puzzles.
 *
 * **Usage (within the bot):**
 * - Instantiate a `puzzle` object with the client and chat ID.
 * - Call `preloadpuzzle` to prepare a puzzle in advance.
 * - Call `getpuzzle` to send a puzzle to the chat and start the solving process.
 * - The class automatically handles user responses and game flow.
 *
 * **User Commands:**
 * - `!chess` or `!cp` - Starts a one-move chess puzzle.
 * - `!chess full` - Starts a multi-move chess puzzle. 
 * - `hint` - Provides a hint (with point deduction).
 * - `move {move}` - Submits a move (e.g., `move e4`).
 * - `link` or `solution` - Ends the game and reveals the solution.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	let mode = 'onemove';
	if (
		args.join(' ').toLowerCase() == 'f' ||
		args.join(' ').toLowerCase() == 'full'
	) {
		mode = 'full';
	}

	game.client = client;
	game.chatid = chat.id._serialized;
	game.mode = mode;
	game.getpuzzle();
}
