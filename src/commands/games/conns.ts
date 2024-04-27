import pkg from 'whatsapp-web.js';
import Jimp from 'jimp';
// @ts-ignore
import shuffleList from 'shuffle-list';
import connsd from '../utils/connections.js';
import { type connections } from '../../types/games.js';

const { Client, LocalAuth, MessageMedia } = pkg;
function random() {
	return connsd[Math.floor(Math.random() * connsd.length)].answers;
}

class conns implements connections {
	chatid: string;

	client: pkg.Client;

	wordlist: Array<{
		level: number;
		group: string;
		members: string[];
	}>;

	showwords: string[];

	res: string;

	ans: string[][];

	guesses: number;

	done: number;

	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.wordlist = random();
		this.res = '';
		this.ans = [];
		this.guesses = 0;
		this.done = 0;
		this.init();
	}

	init() {
		const arr = [];
		for (let i = 0; i < this.wordlist.length; i++) {
			for (let j = 0; j < this.wordlist[i].members.length; j++) {
				arr.push(this.wordlist[i].members[j]);
			}

			this.ans.push(this.wordlist[i].members);
		}

		const res = shuffleList(arr);
		this.showwords = res;
	}

	async guess(words: string[]) {
		for (let i = 0; i < this.ans.length; i++) {
			let count = 0;
			for (let j = 0; j < words.length; j++) {
				if (!this.ans[i].includes(words[j])) {
					break;
				}

				count++;
			}

			if (count == 4) {
				await this.client.sendMessage(
					this.chatid,
					`GROUP - ${this.wordlist[i].group}`
				);
				for (let i = 0; i < words.length; i++) {
					this.showwords[this.showwords.indexOf(words[i])] = '';
				}

				this.done++;
				return i;
			}
		}

		this.guesses++;
		return 69;
	}

	async drawimg() {
		const game = this;
		const gridSize = 4;
		const gridRows = 4;
		const gridWidth = 230;
		const gridHeight = 120;
		const borderWidth = 2;
		const separation = 5;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0xffffffff);
		async function drawGridCell(
			x: number,
			y: number,
			bgColor: number,
			letter: any = null
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x, y, idx) {
				this.bitmap.data[idx + 0] = (bgColor >> 24) & 0xff;
				this.bitmap.data[idx + 1] = (bgColor >> 16) & 0xff;
				this.bitmap.data[idx + 2] = (bgColor >> 8) & 0xff;
				this.bitmap.data[idx + 3] = bgColor & 0xff;
			});

			if (letter) {
				letter = letter.toUpperCase();
				const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				const textWidth = Jimp.measureText(font, letter);
				// @ts-ignore
				const textHeight = Jimp.measureTextHeight(font, letter);
				const textX = x + (gridWidth - textWidth) / 2;
				const textY = y + 20 + (gridHeight - textHeight) / 2;
				await image.print(font, textX, textY, letter);
			}
		}

		async function drawGrid() {
			let a = 0;
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					const letter = game.showwords[a] || '';
					if (!letter) {
						await drawGridCell(x, y, 0xa0c35aff, letter);
					} else {
						await drawGridCell(x, y, 0xefefe6ff, letter);
					}

					a++;
				}
			}
		}

		await drawGrid();
		await image.writeAsync('im.png');
	}
}
export const name = 'connections';
export const args = true;
export const aliases = ['con', 'conns'];
export const description = 'Play connections from NYT games';
export const category = 'Games';
/**
 * Implements the Connections word game from NYT Games within WhatsApp
 *
 * **Usage (within the bot):**
 * - Call `drawimg` to generate the initial image of the word grid. 
 * - Use `guess` to process user guesses and update the game state. 
 * - Call `drawimg` again to generate an updated image after each guess. 
 *
 * **User Commands:**
 * - `!connections` or `!conns` - Starts a new Connections game.
 * - `guess {word1}, {word2}, {word3}, {word4}` - Guesses four words that form a group. 
 * - `quit` - Ends the current game.
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
	const game = new conns(client, chat.id._serialized);
	let done = true;
	await game.drawimg();
	const media2 = MessageMedia.fromFilePath('im.png');
	await msg.reply(media2);
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
			let guessed: any = msg.body.slice(6);
			guessed = guessed.toUpperCase().trim();
			guessed = guessed.split(',');
			if (guessed.length != 4) {
				done = true;
				return msg.reply('You need to guess 4 words seperated by a comma');
			}

			const donewords: string[] = [];
			for (let i = 0; i < guessed.length; i++) {
				guessed[i] = guessed[i].trim();
				if (
					!game.showwords.includes(guessed[i]) ||
					donewords.includes(guessed[i])
				) {
					done = true;
					return msg.reply('Invalid words');
				}

				donewords.push(guessed[i]);
			}

			const res = await game.guess(guessed);
			if (res === 69 && game.guesses != 4) {
				await msg.reply(
					`Words do not form a group\n ${4 - game.guesses} chances left`
				);
			}

			await game.drawimg();
			const media = MessageMedia.fromFilePath('im.png');
			await msg.reply(media);
			done = true;
			if (game.done == 4) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				return msg.reply('Your guess was correct!');
			}

			if (game.guesses == 4) {
				client.removeListener('message_create', trial);
				client.ingame = false;
				let res = 'lmao u lost\n\n';
				for (let i = 0; i < game.wordlist.length; i++) {
					res += `\`${game.wordlist[i].group}\`\n`;
					for (let j = 0; j < game.wordlist[i].members.length; j++) {
						res += `${game.wordlist[i].members[j]} , `;
					}

					res += '\n\n';
				}

				await msg.reply(res);
				return;
			}
		}

		done = true;
	});
}
