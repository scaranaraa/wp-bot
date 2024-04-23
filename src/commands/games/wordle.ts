import pkg, { type Message } from 'whatsapp-web.js';
import Jimp from 'jimp';
import words from '../utils/wordlewords.js';
import { type wordleBase } from '../../types/games.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
let listofwords = words.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class wordle implements wordleBase {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.word = randomWord();
		this.colors = [[], [], [], [], [], []];
		this.letters = [[], [], [], [], [], []];
		this.res = '';
		this.guesses = 0;
	}

	chatid: string;

	client: pkg.Client;

	word: string;

	colors: string[][];

	letters: string[][];

	res: string;

	guesses: number;

	async guess(guessedword: string) {
		this.guesses++;
		const { word } = this;
		let res = '';
		for (let i = 0; i < word.length; i++) {
			if (word[i] == guessedword[i]) {
				this.res += '🟩';
				word.replace(guessedword[i], '$');
				this.colors[this.guesses - 1].push('0x538D4EFF');
				this.letters[this.guesses - 1].push(guessedword[i]);
			} else if (word.includes(guessedword[i])) {
				word.replace(guessedword[i], '$');
				this.colors[this.guesses - 1].push('0xB59F3BFF'); // green 0x538D4EFF yel 0xB59F3BFF
				this.letters[this.guesses - 1].push(guessedword[i]);
				res += this.res += '🟨';
			} else {
				this.colors[this.guesses - 1].push('0x3a3a3cFF');
				this.letters[this.guesses - 1].push(guessedword[i]);
				this.res += '⬛';
			}
		}

		this.res += '\n';
	}

	async genimage() {
		const game = this;
		const gridSize = 5;
		const gridRows = 6;
		const gridWidth = 100;
		const gridHeight = 100;
		const borderWidth = 2;
		const separation = 5;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0x121213ff);

		async function drawGridCell(
			x: number,
			y: number,
			bgColor: any,
			letter: string = null
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x: any, y: any, idx: number) {
				this.bitmap.data[idx + 0] = (bgColor >> 24) & 0xff;
				this.bitmap.data[idx + 1] = (bgColor >> 16) & 0xff;
				this.bitmap.data[idx + 2] = (bgColor >> 8) & 0xff;
				this.bitmap.data[idx + 3] = bgColor & 0xff;
			});

			for (let i = 0; i < borderWidth; i++) {
				for (let j = 0; j < gridWidth; j++) {
					image.setPixelColor(0x3a3a3cff, x + j, y + i);
					image.setPixelColor(0x3a3a3cff, x + j, y + gridHeight - 1 - i);
				}

				for (let j = 0; j < gridHeight; j++) {
					image.setPixelColor(0x3a3a3cff, x + i, y + j);
					image.setPixelColor(0x3a3a3cff, x + gridWidth - 1 - i, y + j);
				}
			}

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
		}

		async function drawGrid() {
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					const color = game.colors[i][j] || 0x121213ff;
					const letter = game.letters[i][j] || null;
					await drawGridCell(x, y, color, letter);
				}
			}
		}

		await drawGrid();
		const b64 = await image.getBase64Async('image/png')
		return b64.slice(22)
	}
}
export const name = 'wordle';
export const args = true;
export const aliases = ['w'];
export const description = 'Play a game of wordle from NYT games';
export const category = 'Games';
export async function run(client: pkg.Client, msg: Message, args: string[]) {
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const game = new wordle(client, chat.id._serialized);
	const b64 = await game.genimage();
	const media2 = new MessageMedia('image/png',b64)
	await msg.reply(media2);
	let done = true;
	client.on('message_create', async function trial(msg) {
		const chatid = await msg.getChat();
		if (chatid.id._serialized != game.chatid) {
			return;
		}

		if (!done) {
			return;
		}

		done = false;
		if (msg.body.toLowerCase() == 'quit') {
			client.removeListener('message_create', trial);
			client.ingame = false;
			return msg.reply('Game ended');
		}

		if (msg.body.toLowerCase().startsWith('guess ')) {
			let guessed = msg.body.slice(6);
			guessed = guessed.toLowerCase().trim();
			if (guessed.length != 5) {
				done = true;
				return msg.reply('Word must be 5 letters');
			}

			if (!listofwords.includes(guessed)) {
				done = true;
				return msg.reply('That is not a word ');
			}

			const res = await game.guess(guessed);
			const base = await game.genimage();
			const media = new MessageMedia('image/png',base)
			await msg.reply(media);
			done = true;
			if (game.res.includes('🟩🟩🟩🟩🟩')) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				const contact = await msg.getContact();
				const user = new baseuser({
					userId: contact.number,
					users: client.cachedUsers,
				});
				user.addWordle();
				return msg.reply('Your guess was correct!');
			}

			if (game.guesses == 6) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				return msg.reply(`lmao u lost. The word was ${game.word}`);
			}
		}

		done = true;
	});
	// ⬛🟩⬛🟨⬛
}
