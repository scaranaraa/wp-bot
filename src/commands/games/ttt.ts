import pkg, { type Message } from 'whatsapp-web.js';
import Jimp from 'jimp';
// @ts-ignore
import Minimax from 'tic-tac-toe-minimax';
import { type tttBase } from '../../types/games.js';

const { Client, LocalAuth, MessageMedia } = pkg;

class ttt implements tttBase {
	chatid: string;

	client: pkg.Client;

	players: pkg.Contact[];

	currletter: string;

	letters: string[];

	res: string;

	guesses: number;

	constructor(
		client: pkg.Client,
		id: string,
		pl1: pkg.Contact,
		pl2: pkg.Contact
	) {
		this.chatid = id;
		this.client = client;
		this.players = [pl1, pl2];
		this.currletter = 'X';
		this.letters = [null, null, null, null, null, null, null, null, null];
		this.res = '';
		this.guesses = 0;
	}

	async start() {
		await this.genimage();
		const media = MessageMedia.fromFilePath('im.png');
		await this.client.sendMessage(this.chatid, media);
		let done = false;
		const game = this;
		this.client.on('message_create', async function wait(msg) {
			if (done) {
				return;
			}

			const chat = await msg.getChat();
			const user = await msg.getContact();
			if (user.number == `${process.env.OWNER_NUMBER}`) {
				if (msg.body.toLowerCase() == 'bestmove') {
					const huPlayer = game.currletter;
					const aiPlayer = game.currletter == 'X' ? 'O' : 'X';
					const symbols = {
						huPlayer: aiPlayer,
						aiPlayer: huPlayer,
					};
					const difficulty = 'Hard';
					const board: Array<string | number> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
					for (let i = 0; i < 9; i++) {
						if (game.letters[i] != null) {
							board[i] = game.letters[i];
						}
					}

					const nextMove = Minimax.default.ComputerMove(
						board,
						symbols,
						difficulty
					);
					const resmove = Number(nextMove) + 1;
					await msg.reply(`best move - ${resmove}`);
				}
			}

			if (
				user.number != game.players[0].number &&
				user.number != game.players[1].number
			) {
				return;
			}

			if (chat.id._serialized != game.chatid) {
				return;
			}

			let res: any = msg.body;
			if (res == 'QUIT') {
				await game.client.sendMessage(game.chatid, 'Game stopped!');
				game.client.ingame = false;
				game.client.removeListener('message_create', wait);
				return;
			}

			if (user.number != game.players[0].number) {
				return;
			}

			if (res == 'QUIT') {
				await game.client.sendMessage(game.chatid, 'Game stopped!');
				game.client.ingame = false;
				game.client.removeListener('message_create', wait);
				return;
			}

			if (!res) {
				return;
			}

			if (isNaN(res)) {
				return;
			}

			res = parseInt(res);
			if (res < 1 || res > 9) {
				return;
			}

			if (game.letters[res - 1] != null) {
				return msg.reply('you cannot play here');
			}

			if (done) {
				return;
			}

			done = true;
			game.letters[res - 1] = game.currletter;
			game.currletter = game.currletter == 'X' ? 'O' : 'X';
			game.guesses++;
			const won = await game.checkwin();
			if (won) {
				await game.genimage();
				const media2 = MessageMedia.fromFilePath('im.png');
				await game.client.sendMessage(game.chatid, media2);
				if (won == 'draw') {
					await game.client.sendMessage(game.chatid, "Game over! It's a draw!");
				} else {
					await game.client.sendMessage(
						game.chatid,
						`Game over! @${game.players[0].number} wins!`
					);
				}

				done = true;
				game.client.ingame = false;
				await game.client.removeListener('message_create', wait);
				return;
			}

			game.client.removeListener('message_create', wait);
			game.players.push(game.players.shift());
			await game.start();
		});
	}

	async checkwin() {
		let curr = 0;
		for (let i = 0; i < 3; i++) {
			if (
				this.letters
					.slice(curr, curr + 3)
					.join('')
					.includes('XXX') ||
				this.letters
					.slice(curr, curr + 3)
					.join('')
					.includes('OOO')
			) {
				return true;
			}
			curr += 3;
		}

		for (let i = 0; i < 3; i++) {
			if (
				this.letters[i] == this.letters[i + 3] &&
				this.letters[i] == this.letters[i + 6]
			) {
				if (this.letters[i] != null) {
					return true;
				}
			}
		}

		if (
			this.letters[0] == this.letters[4] &&
			this.letters[0] == this.letters[8]
		) {
			if (this.letters[0] != null) {
				return true;
			}
		}

		if (
			this.letters[2] == this.letters[4] &&
			this.letters[2] == this.letters[6]
		) {
			if (this.letters[2] != null) {
				return true;
			}
		}

		if (this.guesses == 9) {
			return 'draw';
		}
	}

	async genimage() {
		const game = this;
		const gridSize = 3;
		const gridRows = 3;
		const gridWidth = 100;
		const gridHeight = 100;
		const borderWidth = 2;
		const separation = 5;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0x348c84ff);

		async function drawGridCell(
			x: number,
			y: number,
			bgColor: number,
			letter: string = null,
			index: string
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x, y, idx) {
				this.bitmap.data[idx + 0] = (bgColor >> 24) & 0xff;
				this.bitmap.data[idx + 1] = (bgColor >> 16) & 0xff;
				this.bitmap.data[idx + 2] = (bgColor >> 8) & 0xff;
				this.bitmap.data[idx + 3] = bgColor & 0xff;
			});

			if (letter) {
				letter = letter.toUpperCase();
				const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
				const textWidth = Jimp.measureText(font, letter);
				// @ts-ignore
				const textHeight = Jimp.measureTextHeight(font, letter);
				const textX = x + (gridWidth - textWidth) / 2;
				const textY = y + 37 + (gridHeight - textHeight) / 2;
				await image.print(font, textX, textY, letter);
			}

			const font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
			await image.print(font2, x + 4, y + 2, index);
		}

		async function drawGrid() {
			let a = 1;
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					const letter = game.letters[a - 1] || null;
					await drawGridCell(x, y, 0x14bdacff, letter, String(a));
					a++;
				}
			}
		}

		await drawGrid();
		await image.writeAsync('im.png');
		return 'done';
	}
}
export const name = 'Tic Tac Toe';
export const args = true;
export const aliases = ['tic', 'tac', 'toe', 'ttt'];
export const description = 'Play Tic Tac Toe with someone';
export const category = 'Games';
/**
 * Implements the Tic Tac Toe game within WhatsApp, including image generation.
 *
 * **Usage (within the bot):**
 * - Call `genimage` to create an initial image of the game board.
 * - Use `start` to begin the game and handle player moves.
 * - Call `genimage` again to generate an updated image after each move.
 * 
 * **User Commands:**
 * - `!tictactoe` or `!ttt` - Starts a new Tic Tac Toe game.
 * - `{number}` - Places a mark on the specified square (1-9).
 * - `QUIT` - Ends the current game. 
 */
export async function run(client: pkg.Client, msg: Message, args: string[]) {
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const mentions = await msg.getMentions();
	if (mentions.length == 0) {
		client.ingame = false;
		return msg.reply('please do not play with yourself :(');
	}

	let mentioneduser = mentions.pop();
	if (mentioneduser.number == `${process.env.PHONE}`) {
		mentioneduser = mentions.pop();
	}

	if (!mentioneduser) {
		client.ingame = false;
		return msg.reply('please do not play with yourself :(');
	}

	if (mentioneduser?.number == member.number) {
		client.ingame = false;
		return msg.reply('please do not play with yourself :(');
	}

	const chance = Math.random() > 0.5 ? member : mentioneduser;
	const game = new ttt(
		client,
		chat.id._serialized,
		chance,
		chance.number == member.number ? mentioneduser : member
	);
	await client.sendMessage(game.chatid, `@${chance.number} you start!`);
	await game.start();
}
