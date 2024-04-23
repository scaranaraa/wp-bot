import pkg from 'whatsapp-web.js';
import Jimp from 'jimp';
import words from '../utils/wordlewords.js';
import { type duodle } from '../../types/games.js';

const { Client, LocalAuth, MessageMedia } = pkg;
let listofwords = words.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class wordle implements duodle {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.word = randomWord();
		this.word1done = false;
		this.word2done = false;
		this.word2 = randomWord();
		this.colors = [[], [], [], [], [], [], [], []];
		this.letters = [[], [], [], [], [], [], [], []];
		this.colors2 = [[], [], [], [], [], [], [], []];
		this.letters2 = [[], [], [], [], [], [], [], []];
		this.res = '';
		this.res2 = '';
		this.guesses = 0;
	}

	chatid: string;

	client: pkg.Client;

	word: string;

	word1done: boolean;

	word2done: boolean;

	word2: string;

	colors: string[][];

	letters: string[][];

	colors2: string[][];

	letters2: string[][];

	res: string;

	res2: string;

	guesses: number;

	async guess(guessedword: string) {
		this.guesses++;
		const { word } = this;
		const { word2 } = this;
		let res = '';
		let res2 = '';
		for (let i = 0; i < word.length; i++) {
			if (!this.word1done) {
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
			} else {
				res = '🟩🟩🟩🟩🟩';
			}

			if (!this.word2done) {
				if (word2[i] == guessedword[i]) {
					this.res2 += '🟩';
					word2.replace(guessedword[i], '$');
					this.colors2[this.guesses - 1].push('0x538D4EFF');
					this.letters2[this.guesses - 1].push(guessedword[i]);
				} else if (word2.includes(guessedword[i])) {
					word2.replace(guessedword[i], '$');
					this.colors2[this.guesses - 1].push('0xB59F3BFF'); // green 0x538D4EFF yel 0xB59F3BFF
					this.letters2[this.guesses - 1].push(guessedword[i]);
					res2 += this.res2 += '🟨';
				} else {
					this.colors2[this.guesses - 1].push('0x3a3a3cFF');
					this.letters2[this.guesses - 1].push(guessedword[i]);
					this.res2 += '⬛';
				}
			} else {
				res2 = '🟩🟩🟩🟩🟩';
			}
		}

		this.res += '\n';
		this.res2 += '\n';
	}

	async genimage() {
		const game = this;
		const gridSize = 5;
		const gridRows = 8;
		const gridWidth = 100;
		const gridHeight = 100;
		const borderWidth = 2;
		const separation = 5;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0x121213ff);
		const bigimage = new Jimp(imageWidth * 2.05, imageHeight, 0x121213ff);

		async function drawGridCell(
			x: number,
			y: number,
			bgColor: any,
			letter: any = null
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x, y, idx) {
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

		async function drawGrid(n = 0) {
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					let color;
					let letter;
					if (n == 1) {
						color = game.colors2[i][j] || 0x121213ff;
						letter = game.letters2[i][j] || null;
					} else {
						color = game.colors[i][j] || 0x121213ff;
						letter = game.letters[i][j] || null;
					}

					await drawGridCell(x, y, color, letter);
				}
			}
		}

		await drawGrid(0);
		await bigimage.blit(image, 2, 0);
		await drawGrid(1);
		await bigimage.blit(image, imageWidth + 23, 0);
		await bigimage.writeAsync('im.png');
		return 'done';
	}
}
export const name = 'duodle';
export const args = true;
export const aliases = ['dd'];
export const description = 'Play duodle, 2 wordles at once';
export const category = 'Games';
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
	const game = new wordle(client, chat.id._serialized);
	await game.genimage();
	const media2 = MessageMedia.fromFilePath('im.png');
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
			await game.genimage();
			const media = MessageMedia.fromFilePath('im.png');
			await msg.reply(media);
			done = true;
			if (game.res.includes('🟩🟩🟩🟩🟩')) {
				game.word1done = true;
			}

			if (game.res2.includes('🟩🟩🟩🟩🟩')) {
				game.word2done = true;
			}

			if (game.res.includes('🟩🟩🟩🟩🟩') && game.res2.includes('🟩🟩🟩🟩🟩')) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				return msg.reply('Your guess was correct!');
			}

			if (game.guesses == 8) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				return msg.reply(
					`lmao u lost. The words were ${game.word}, ${game.word2}`
				);
			}
		}

		done = true;
	});
}
