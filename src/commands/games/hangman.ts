import { type Client, type Message } from 'whatsapp-web.js';
// @ts-ignore
import { init as _init, lookup } from 'wordnet';
import baseuser from '../../models/baseuser.js';
import word from '../utils/newwrods.js';
import { type hangman } from '../../types/games.js';

let listofwords = word.split('\n');
async function init() {
	await _init();
}

init();
listofwords = listofwords.map(word1 => word1.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class HangmanGame implements hangman {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.inGame = false;
		this.word = '';
		this.guesssed = [];
		this.wrongs = 0;
		this.type = '';
		this.definition = '';
	}

	chatid: string;

	client: Client;

	inGame: boolean;

	word: string;

	guesssed: string[];

	wrongs: number;

	type: string;

	definition: string;

	async newGame() {
		if (this.inGame) {
			return;
		}

		let send = true;
		this.inGame = true;
		let gotone = false;

		this.word = randomWord();
		while (this.word.length < 3) {
			this.word = randomWord();
		}

		this.word = this.word.toUpperCase();
		this.word = this.word.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

		await lookup(this.word.toLowerCase())
			.then((definitions: any[]) => {
				definitions.forEach(def => {
					if (gotone) {
						return;
					}

					gotone = true;

					this.type = `${def.meta.synsetType}`;
					this.definition = `${def.glossary}\n`;
				});
			})
			.catch(() => {
				send = false;
				this.inGame = false;
				this.newGame();
			});

		const res = this.getDescription();

		if (send) {
			this.definition = this.definition.split('"')[0];
			if (!this.definition) {
				this.inGame = false;
				this.newGame();
			}

			await this.client.sendMessage(this.chatid, res);
			await this.client.sendMessage(
				this.chatid,
				'Type - ' + `*${this.type}*` + '\n\nDefintion - ' + `${this.definition}`
			);
		}
	}

	async makeGuess(letter: string, user: baseuser) {
		if (!this.guesssed.includes(letter)) {
			this.guesssed.push(letter);

			if (!this.word.includes(letter)) {
				this.wrongs++;

				if (this.wrongs == 6) {
					this.gameOver(false, user);
					return true;
				}
			} else if (
				!this.word
					.split('')
					.map(l => (this.guesssed.includes(l) ? l : '_'))
					.includes('_')
			) {
				this.gameOver(true, user);
				return true;
			}
		}

		if (this.inGame) {
			const res = this.getDescription();
			this.client.sendMessage(this.chatid, res);
		}
	}

	gameOver(win: boolean, user: baseuser) {
		this.inGame = false;
		if (win) {
			user.addHangman();
		}

		this.client.sendMessage(
			this.chatid,
			win
				? '*Your guess was correct!*'
				: '*lmao u lost*' + ` The word - was *${this.word}*`
		);
	}

	getDescription() {
		return (
			`\`\`\`` +
			`|‾‾‾‾‾‾|   \n|     ${this.wrongs > 0 ? '🎩' : ' '}   \n|     ${
				this.wrongs > 1 ? '😟' : ' '
			}   \n|     ${this.wrongs > 2 ? '👕' : ' '}   \n|     ${
				this.wrongs > 3 ? '🩳' : ' '
			}   \n|    ${
				this.wrongs > 4 ? '👞👞' : ' '
			}   \n|     \n|__________\n\n${this.word
				.split('')
				.map(l => (this.guesssed.includes(l) ? l : '_'))
				.join(' ')}\`\`\``
		);
	}
}
export const name = 'hangman';
export const args = true;
export const aliases = ['h'];
export const description = 'Play a game of hangman';
export const category = 'Games';
/**
 * @memberof! Games
 * @name hangman
 * @description
 * Implements the Hangman word game with definitions within WhatsApp.
 *
 * **Usage (within the bot):**
 * - Call `newGame` to start a new game and send the initial word representation and definition. 
 * - Use `makeGuess` to process user guesses and update the game state. 
 * 
 * **User Commands:**
 * - `!hangman` or `!h` - Starts a new Hangman game.
 * - `guess {letter}` - Guesses a letter in the Hangman word. 
 * - `guess {word}` - Guesses the entire word. 
 * - `NEW` - Starts a new Hangman game.
 * - `QUIT` - Ends the current game. 
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();

	const game = new HangmanGame(client, chat.id._serialized);
	await game.newGame();

	client.on('message_create', async function trial(msg: Message) {
		const member = await msg.getContact();
		const user = new baseuser({
			userId: member.number,
			users: client.cachedUsers,
		});

		if (msg.body == 'NEW') {
			game.guesssed = [];
			game.wrongs = 0;
			game.inGame = false;
			game.newGame();
		}

		if (msg.body == 'QUIT') {
			game.inGame = false;
			client.ingame = false;
			client.removeListener('message_create', trial);
			game.gameOver(false, user);
			return;
		}

		if (!msg.body.toLowerCase().startsWith('guess ')) {
			return;
		}

		const chan = await msg.getChat();
		if (game.chatid != chan.id._serialized) {
			return;
		}

		if (!game.inGame) {
			return;
		}

		const guessed = msg.body.slice(6).toUpperCase().trim();

		if (guessed.length != 1) {
			if (game.word == guessed) {
				client.ingame = false;
				game.gameOver(true, user);
				client.removeListener('message_create', trial);
			} else {
				const make = await game.makeGuess(randomletter(), user);
				if (make) {
					client.ingame = false;
					client.removeListener('message_create', trial);
				}
			}

			return;
		}

		const make = await game.makeGuess(guessed, user);
		if (make) {
			client.ingame = false;
			client.removeListener('message_create', trial);
		}
	});
}

const lowercaseletters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
function randomletter() {
	return lowercaseletters[Math.floor(Math.random() * lowercaseletters.length)];
}
