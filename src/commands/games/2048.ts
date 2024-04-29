import Jimp from 'jimp';
import pkg from 'whatsapp-web.js';
import { type _2048 } from '../../types/games.js';

const colors: Record<
	number,
	{
		text: number;
		background: number;
	}
> = {
	8: {
		text: 0xf8f5f1ff,
		background: 0xf2b179ff,
	},
	2: {
		text: 0x776e65ff,
		background: 0xeee4daff,
	},
	4: {
		text: 0x776e65ff,
		background: 0xeee1c9ff,
	},
	16: {
		text: 0xf8f5f1ff,
		background: 0xf59563ff,
	},
	32: {
		text: 0xf8f5f1ff,
		background: 0xf57c5fff,
	},
	64: {
		text: 0xf8f5f1ff,
		background: 0xf45f3cff,
	},
	128: {
		text: 0xf8f5f1ff,
		background: 0xeccd72ff,
	},
	256: {
		text: 0xf8f5f1ff,
		background: 0xedc12dff,
	},
	512: {
		text: 0xf8f5f1ff,
		background: 0xebc74eff,
	},
	1024: {
		text: 0xf8f5f1ff,
		background: 0xecc441ff,
	},
	2048: {
		text: 0xf8f5f1ff,
		background: 0xebc12fff,
	},
	4096: {
		text: 0xf8f5f1ff,
		background: 0xef666dff,
	},
	8192: {
		text: 0xf8f5f1ff,
		background: 0xeb4d57ff,
	},
	16384: {
		text: 0xf8f5f1ff,
		background: 0xe14338ff,
	},
	32768: {
		text: 0xf8f5f1ff,
		background: 0x72b4d6ff,
	},
	65536: {
		text: 0xf8f5f1ff,
		background: 0x5ca0dfff,
	},
	131072: {
		text: 0xf8f5f1ff,
		background: 0x007bbeff,
	},
};
const gamestarted: string[] = [];
class Game2048 implements _2048 {
	constructor(client: pkg.Client, id: string, userid: string) {
		this.userid = userid;
		this.chatid = id;
		this.client = client;
		this.board = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		const idx = randomidx();
		this.board[Math.floor(idx / 4)][idx % 4] = get2or4();
		this.score = 0;
	}

	userid: string;

	chatid: string;

	client: pkg.Client;

	board: number[][];

	score: number;

	async start(): Promise<void> {
		let idx = randomidx();
		while (this.board[Math.floor(idx / 4)][idx % 4] != 0) {
			idx = randomidx();
		}

		this.board[Math.floor(idx / 4)][idx % 4] = get2or4();
		await this.genimage();
		const media = MessageMedia.fromFilePath('im.png');
		await this.client.sendMessage(this.chatid, media);
		await this.getmove();
	}

	async getmove(): Promise<void> {
		const cantplay = await this.checkgameover();
		if (cantplay) {
			gamestarted.splice(gamestarted.indexOf(this.userid), 1);
			await this.client.sendMessage(
				this.chatid,
				`Game Over, you have no valid moves\nScore - ${this.score}`
			);
			return;
		}

		const game = this;
		let done = false;
		this.client.on('message_create', async function wait(msg) {
			const user = await msg.getContact();
			if (user.number !== game.userid) {
				return;
			}

			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			if (msg.body == 'QUIT') {
				done = true;
				gamestarted.splice(gamestarted.indexOf(game.userid), 1);
				game.client.removeListener('message_create', wait);
				await game.client.sendMessage(game.chatid, 'Game stopped');
				return;
			}

			const res = msg.body.toLowerCase();
			if (done) {
				return;
			}

			if (res == 'left' || res == 'right' || res == 'up' || res == 'down') {
				done = true;
				game.client.removeListener('message_create', wait);
				await game.move(res);
			}
		});
	}

	async move(direction: string): Promise<void> {
		const { board } = this;
		const tempboard = JSON.parse(JSON.stringify(board));
		if (direction == 'left') {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (board[i][j] !== 0) {
						let idx = j;
						while (idx > 0) {
							if (board[i][idx - 1] == 0) {
								board[i][idx - 1] = board[i][idx];
								board[i][idx] = 0;
								idx--;
								continue;
							}

							if (board[i][idx - 1] == board[i][idx]) {
								board[i][idx - 1] *= 2;
								this.score += board[i][idx - 1];
								board[i][idx] = 0;
								break;
							}

							break;
						}
					}
				}
			}
		}

		if (direction == 'right') {
			for (let i = 0; i < 4; i++) {
				for (let j = 3; j >= 0; j--) {
					if (board[i][j] !== 0) {
						let idx = j;
						while (idx < 3) {
							if (board[i][idx + 1] == 0) {
								board[i][idx + 1] = board[i][idx];
								board[i][idx] = 0;
								idx++;
								continue;
							}

							if (board[i][idx + 1] == board[i][idx]) {
								board[i][idx + 1] *= 2;
								this.score += board[i][idx + 1];
								board[i][idx] = 0;
								break;
							}

							break;
						}
					}
				}
			}
		}

		if (direction == 'up') {
			for (let j = 0; j < 4; j++) {
				for (let i = 0; i < 4; i++) {
					if (board[i][j] !== 0) {
						let idx = i;
						while (idx > 0) {
							if (board[idx - 1][j] == 0) {
								board[idx - 1][j] = board[idx][j];
								board[idx][j] = 0;
								idx--;
								continue;
							}

							if (board[idx - 1][j] == board[idx][j]) {
								board[idx - 1][j] *= 2;
								this.score += board[idx - 1][j];
								board[idx][j] = 0;
								break;
							}

							break;
						}
					}
				}
			}
		}

		if (direction == 'down') {
			for (let j = 0; j < 4; j++) {
				for (let i = 3; i >= 0; i--) {
					if (board[i][j] !== 0) {
						let idx = i;
						while (idx < 3) {
							if (board[idx + 1][j] == 0) {
								board[idx + 1][j] = board[idx][j];
								board[idx][j] = 0;
								idx++;
								continue;
							}

							if (board[idx + 1][j] == board[idx][j]) {
								board[idx + 1][j] *= 2;
								this.score += board[idx + 1][j];
								board[idx][j] = 0;
								break;
							}

							break;
						}
					}
				}
			}
		}

		if (JSON.stringify(tempboard) == JSON.stringify(board)) {
			await this.client.sendMessage(this.chatid, 'Invalid move');
			this.board = tempboard;
			await this.getmove();
			return;
		}

		let idx = randomidx();
		while (this.board[Math.floor(idx / 4)][idx % 4] != 0) {
			idx = randomidx();
		}

		this.board[Math.floor(idx / 4)][idx % 4] = get2or4();
		await this.genimage();
		const media = MessageMedia.fromFilePath('im.png');
		await this.client.sendMessage(this.chatid, media, {
			caption: `Score - ${this.score}`,
		});
		await this.getmove();
	}

	async checkgameover(): Promise<boolean> {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.board[i][j] == 0) {
					return false;
				}
			}
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (i > 0 && this.board[i][j] == this.board[i - 1][j]) {
					return false;
				}

				if (j > 0 && this.board[i][j] == this.board[i][j - 1]) {
					return false;
				}
			}
		}

		return true;
	}

	async genimage(): Promise<string> {
		const game = this;
		const gridSize = 4;
		const gridRows = 4;
		const gridWidth = 370;
		const gridHeight = 370;
		const separation = 32;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation + 64;
		const imageHeight =
			gridRows * gridHeight + (gridRows - 1) * separation + 64;
		const image = new Jimp(imageWidth, imageHeight, 0x5e5750ff);

		async function drawGridCell(
			x: number,
			y: number,
			bgColor: number,
			letter: undefined | string = null
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x, y, idx) {
				this.bitmap.data[idx + 0] = (bgColor >> 24) & 0xff;
				this.bitmap.data[idx + 1] = (bgColor >> 16) & 0xff;
				this.bitmap.data[idx + 2] = (bgColor >> 8) & 0xff;
				this.bitmap.data[idx + 3] = bgColor & 0xff;
			});

			if (letter) {
				let font;
				if (letter.length > 8) {
					font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
				} else {
					font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
				}

				const textWidth = Jimp.measureText(font, letter);
				// @ts-ignore
				const textHeight = Jimp.measureTextHeight(font, letter);
				const textX = x + (gridWidth - textWidth) / 2;
				let textY;
				if (letter.length > 8) {
					textY = y + 37 + (gridHeight - textHeight) / 2;
				} else {
					textY = y + 74 + (gridHeight - textHeight) / 2;
				}

				await image.print(font, textX, textY, letter);
			}
		}

		async function drawGrid(): Promise<void> {
			let a = 1;
			for (let i = 0; i < gridRows; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x = j * gridWidth + j * separation;
					const y = i * gridHeight + i * separation;
					const letter = game.board[i][j] || null;
					await drawGridCell(
						x + 32,
						y + 32,
						letter ? colors[letter].background : 0xb9aea2ff,
						letter ? String(letter) : null
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
const { MessageMedia } = pkg;

export const name = '2048';
export const args = true;
export const aliases: string[] = [];
export const description = 'Play a game of 2048';
export const category = 'Games';
/**
 * @memberof! Games
 * @name 2048
 * @description
 * Implements the 2048 game within WhatsApp, including image generation. 
 *
 * **Usage (within the bot):**
 * - Call `start` to begin the game, generate the initial board image, and handle player moves.
 *
 * **User Commands:** 
 * - `!2048` - Starts a new 2048 game.
 * - `{direction}` (left, right, up, down) - Makes a move in the specified direction.
 * - `QUIT` - Ends the current game.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	const user = await msg.getContact();
	if (gamestarted.includes(user.number)) {
		return msg.reply('A 2048 game is already in progress for you');
	}

	gamestarted.push(user.number);

	const game = new Game2048(client, chat.id._serialized, user.number);
	await game.start();
}

function randomidx(): number {
	return Math.floor(Math.random() * 16);
}

function get2or4(): number {
	return Math.random() > 0.1 ? 2 : 4;
}
