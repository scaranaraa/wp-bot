import pkg from 'whatsapp-web.js';
import Jimp from 'jimp';
import { Icrossword } from '../../types/games.js';

const chats: string[] = [];
const { Client, LocalAuth, MessageMedia } = pkg;

class crossword implements Icrossword {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.gridnums = [];
		this.grid = [];
		this.answers = { across: [], down: [] };
		this.hints = 3;
		this.clues = { across: [], down: [] };
		this.usergrid = [];
	}

	chatid: string;

	client: pkg.Client;

	gridnums: number[];

	grid: string[];

	answers: { across: string[]; down: string[] };

	hints: number;

	clues: { across: string[]; down: string[] };

	usergrid: string[];

	async init() {
		let board;
		const year = Math.floor(Math.random() * (2017 - 1976 + 1)) + 1976;
		let month = String(Math.floor(Math.random() * (12 - 1 + 1)) + 1);
		if (parseInt(month) < 10) month = `0${month}`;
		let day = String(Math.floor(Math.random() * (31 - 1 + 1)) + 1);
		if (parseInt(day) < 10) day = `0${day}`;
		const req = await fetch(
			`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${year}/${month}/${day}.json`
		);
		console.log(
			`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${year}/${month}/${day}.json`
		);
		try {
			board = await req.json();
		} catch {
			await this.init();
			return;
		}
		this.answers = board.answers;
		this.clues = board.clues;
		this.grid = board.grid;
		this.gridnums = board.gridnums;
		for (let i = 0; i < this.grid.length; i++) {
			this.usergrid.push(this.grid[i] === '.' ? '.' : '');
		}
		await this.genimage();
		const media = await MessageMedia.fromFilePath('im.png');
		await this.client.sendMessage(this.chatid, media);
		let across = `Across -\n`;
		for (let i = 0; i < this.clues.across.length; i++) {
			across += `${this.clues.across[i]}\n`;
		}
		await this.client.sendMessage(this.chatid, across);
		let down = `Down -\n`;
		for (let i = 0; i < this.clues.down.length; i++) {
			down += `${this.clues.down[i]}\n`;
		}
		await this.client.sendMessage(this.chatid, down);
		await this.gameStarted();
	}

	async gameStarted() {
		const game = this;
		let end = false;
		this.client.on('message_create', async function wait(msg) {
			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) return;

			if (msg.body.startsWith('CLUE ')) {
				let word = msg.body.slice(5).toLowerCase();
				if (word.endsWith('a')) {
					word = word.replace('a', '');
					if (isNaN(parseInt(word))) return;
					for (let i = 0; i < game.clues.across.length; i++) {
						if (game.clues.across[i].startsWith(word)) {
							await msg.reply(game.clues.across[i]);
							return;
						}
					}
				}
				if (word.endsWith('d')) {
					word = word.replace('d', '');
					if (isNaN(parseInt(word))) return;
					for (let i = 0; i < game.clues.down.length; i++) {
						if (game.clues.down[i].startsWith(word)) {
							await msg.reply(game.clues.down[i]);
							return;
						}
					}
				}
			}
			if (!isNaN(parseInt(msg.body[0]))) {
				const words = msg.body.toLowerCase().split(' ');
				let rc = words.shift();
				if (rc.endsWith('a')) {
					rc = rc.replace('a', '');
					if (isNaN(parseInt(rc))) return;
					const startindex = game.gridnums.indexOf(parseInt(rc));
					if (startindex < 0) return;

					for (let i = 0; i < words[0].length; i++) {
						if (game.usergrid[startindex + i] == '.') break;
						game.usergrid[startindex + i] = words[0][i];
						if ((startindex + i + 1) % 15 == 0) break;
					}
					end = await game.sendimg();
				}
				if (rc.endsWith('d')) {
					rc = rc.replace('d', '');
					if (isNaN(parseInt(rc))) return;
					let startindex = game.gridnums.indexOf(parseInt(rc));
					if (startindex < 0) return;

					for (let i = 0; i < words[0].length; i++) {
						if (game.usergrid[startindex] == '.') break;
						game.usergrid[startindex] = words[0][i];
						startindex += 15;
						if (startindex >= game.grid.length) break;
					}
					end = await game.sendimg();
				}
			}
			if (msg.body == 'QUIT' || end) {
				game.client.removeListener('message_create', wait);
				game.usergrid = game.grid;
				if (!end) await game.sendimg();
				chats.splice(chats.indexOf(game.chatid), 1);
			}
		});
	}

	async sendimg() {
		await this.genimage();
		const media = await MessageMedia.fromFilePath('im.png');
		await this.client.sendMessage(this.chatid, media);
		for (let i = 0; i < this.usergrid.length; i++) {
			if (this.usergrid[i].toUpperCase() != this.grid[i].toUpperCase()) {
				return false;
			}
		}
		return true;
	}

	async genimage() {
		const game = this;
		const gridSize = 15;
		const gridRows = 15;
		const gridWidth = 40;
		const gridHeight = 40;
		const borderWidth = 1;
		const separation = 0;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0xffffffff);

		async function drawGridCell(
			x: number,
			y: number,
			bgColor: number,
			letter: string = null,
			index = 0
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
				const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				const textWidth = Jimp.measureText(font, letter);
				// @ts-ignore
				const textHeight = Jimp.measureTextHeight(font, letter);
				const textX = x + (gridWidth - textWidth) / 2;
				const textY = y + 11 + (gridHeight - textHeight) / 2;
				await image.print(font, textX, textY, letter);
			}
			const font2 = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);
			if (index) await image.print(font2, x + 5, y + 2, index);
		}

		async function drawGrid() {
			let a = 0;
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					if (game.grid[a] == '.') {
						await drawGridCell(
							x,
							y,
							0x000000ff,
							game.usergrid[a],
							game.gridnums[a]
						);
					} else if (game.usergrid[a].toUpperCase() == game.grid[a]) {
						await drawGridCell(
							x,
							y,
							0x538d4eff,
							game.usergrid[a],
							game.gridnums[a]
						);
					} else
						await drawGridCell(
							x,
							y,
							0xffffffff,
							game.usergrid[a],
							game.gridnums[a]
						);
					a++;
				}
			}
		}

		await drawGrid();
		await image.writeAsync('im.png');
		return 'done';
	}
}

export const name = 'crossword';
export const args = true;
export const aliases = ['cw'];
export const description = 'Play crossword from NYT games';
export const category = 'Games';
/**
 * @memberof! Games
 * @name crossword
 * @description
 * Implements a crossword puzzle game using NYT crosswords within WhatsApp, including image generation.
 * 
 * **Usage (within the bot):**
 * - Call `init` to retrieve a random crossword puzzle from the NYT archive and send the initial board image and clues. 
 * - The class will handle user input for filling in answers and requesting clues. 
 *
 * **User Commands:**
 * - `!crossword` or `!cw` - Starts a new crossword puzzle game.
 * - `{number}{direction} {word}` - Fills in a word on the crossword board (e.g., `1a HELLO` for across, `2d WORLD` for down). 
 * - `CLUE {number}{direction}` - Requests the clue for a specific word (e.g., `CLUE 1a`). 
 * - `QUIT` - Ends the current crossword game and reveals the solution. 
 */ 
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	if (chats.includes(chat.id._serialized))
		return msg.reply('A game is active in this chat!');
	chats.push(chat.id._serialized);
	const game = new crossword(client, chat.id._serialized);
	await game.init();
}
