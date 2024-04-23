import pkg from 'whatsapp-web.js';
import Jimp from 'jimp';
import { type ttts } from '../../types/games.js';

const { Client, LocalAuth, MessageMedia } = pkg;
class ttt implements ttts {
	chatid: string;

	client: pkg.Client;

	players: pkg.Contact[];

	currletter: string;

	subletters: string[][];

	letters: string[];

	playablesq: number;

	res: string;

	guesses: number;

	prev: number;

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
		this.subletters = [
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null],
		];
		this.letters = [null, null, null, null, null, null, null, null, null];
		this.playablesq = null;
		this.res = '';
		this.guesses = 0;
		this.prev = null;
	}

	async start() {
		if (
			this.playablesq != null &&
			!this.subletters[this.playablesq].includes(null)
		) {
			this.playablesq = null;
			await this.client.sendMessage(
				this.chatid,
				'current square is full, choose a new square'
			);
		}

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
			if (user.number != game.players[0].number) {
				return;
			}

			if (chat.id._serialized != game.chatid) {
				return;
			}

			let res: any = msg.body;
			if (res == 'QUIT') {
				await game.client.sendMessage(game.chatid, 'Game stopped!');
				game.client.ingame = false;
				await game.client.removeListener('message_create', wait);
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

			if (game.playablesq === null) {
				if (game.letters[res - 1] != null) {
					return msg.reply('you cannot choose this square');
				}

				await game.client.removeListener('message_create', wait);
				await game.genimage(false, res - 1, '0x538D4EFF');
				game.playablesq = res - 1;
				await game.start();
				return;
			}

			if (game.subletters[game.playablesq][res - 1] != null) {
				return msg.reply('you cannot play here');
			}

			if (done) {
				return;
			}

			done = true;
			game.subletters[game.playablesq][res - 1] = game.currletter;
			game.currletter = game.currletter == 'X' ? 'O' : 'X';
			game.guesses++;
			const won = await game.checkwin();
			const prev = game.playablesq;
			game.prev = game.playablesq;
			game.playablesq = res - 1;
			if (won) {
				if (won == 'one') {
					const chletter = game.currletter == 'X' ? 'O' : 'X';
					game.letters[game.prev] = chletter;
					const gameover = await game.checkwin(true);
					const xcount = game.letters.filter(x => x == 'X').length;
					const ocount = game.letters.filter(x => x == 'O').length;
					if (gameover == 'full') {
						await game.genimage(true);
						const media2 = MessageMedia.fromFilePath('im.png');
						await game.client.sendMessage(game.chatid, media2);
						await game.client.sendMessage(
							game.chatid,
							`Game over! @${game.players[0].number} wins!`
						);
						game.client.ingame = false;
						await game.client.removeListener('message_create', wait);
						return;
					}
					if (gameover == 'draw') {
						await game.genimage(true);
						const media2 = MessageMedia.fromFilePath('im.png');
						await game.client.sendMessage(game.chatid, media2);

						if (xcount == ocount) {
							await game.client.sendMessage(
								game.chatid,
								"Game over! It's a draw!"
							);
							game.client.ingame = false;
							await game.client.removeListener('message_create', wait);
							return;
						}
						await game.client.sendMessage(
							game.chatid,
							`Game over! ${xcount > ocount ? 'X' : 'O'} wins!`
						);
						game.client.ingame = false;
						await game.client.removeListener('message_create', wait);
						return;
					}

					if (xcount == 5 || ocount == 5) {
						await game.client.sendMessage(
							game.chatid,
							`Game over! ${xcount > ocount ? 'X' : 'O'} wins!`
						);
						game.client.ingame = false;
						await game.client.removeListener('message_create', wait);
						return;
					}

					game.subletters[game.prev] = [
						chletter,
						chletter,
						chletter,
						chletter,
						chletter,
						chletter,
						chletter,
						chletter,
						chletter,
					];
					await game.genimage(false, prev, '0x14BDACFF');
				} else if (won == 'draw') {
					await game.genimage(true);
					const media2 = MessageMedia.fromFilePath('im.png');
					await game.client.sendMessage(game.chatid, media2);
					const xcount = game.letters.filter(x => x == 'X').length;
					const ocount = game.letters.filter(x => x == 'O').length;
					if (xcount == ocount) {
						await game.client.sendMessage(
							game.chatid,
							"Game over! It's a draw!"
						);
						game.client.ingame = false;
						await game.client.removeListener('message_create', wait);
						return;
					}
					await game.client.sendMessage(
						game.chatid,
						`Game over! ${xcount > ocount ? xcount : ocount} wins!`
					);
					game.client.ingame = false;
					await game.client.removeListener('message_create', wait);
					return;
				} else if (won == 'full') {
					await game.genimage(true);
					const media2 = MessageMedia.fromFilePath('im.png');
					await game.client.sendMessage(game.chatid, media2);
					await game.client.sendMessage(
						game.chatid,
						`Game over! @${game.players[0].number} wins!`
					);
					game.client.ingame = false;
					await game.client.removeListener('message_create', wait);
					return;
				}

				done = true;
			}

			await game.genimage(false, game.playablesq, '0x538D4EFF');
			game.client.removeListener('message_create', wait);
			game.players.push(game.players.shift());
			await game.start();
		});
	}

	async checkwin(ignore = false) {
		let curr = 0;
		if (this.playablesq != null && !ignore) {
			for (let i = 0; i < 3; i++) {
				if (
					this.subletters[this.playablesq]
						.slice(curr, curr + 3)
						.join('')
						.includes('XXX') ||
					this.subletters[this.playablesq]
						.slice(curr, curr + 3)
						.join('')
						.includes('OOO')
				) {
					return 'one';
				}
				curr += 3;
			}

			for (let i = 0; i < 3; i++) {
				if (
					this.subletters[this.playablesq][i] ==
						this.subletters[this.playablesq][i + 3] &&
					this.subletters[this.playablesq][i] ==
						this.subletters[this.playablesq][i + 6]
				) {
					if (this.subletters[this.playablesq][i] != null) {
						return 'one';
					}
				}
			}

			if (
				this.subletters[this.playablesq][0] ==
					this.subletters[this.playablesq][4] &&
				this.subletters[this.playablesq][0] ==
					this.subletters[this.playablesq][8]
			) {
				if (this.subletters[this.playablesq][0] != null) {
					return 'one';
				}
			}

			if (
				this.subletters[this.playablesq][2] ==
					this.subletters[this.playablesq][4] &&
				this.subletters[this.playablesq][2] ==
					this.subletters[this.playablesq][6]
			) {
				if (this.subletters[this.playablesq][2] != null) {
					return 'one';
				}
			}
		}

		curr = 0;
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
				return 'full';
			}
			curr += 3;
		}

		for (let i = 0; i < 3; i++) {
			if (
				this.letters[i] == this.letters[i + 3] &&
				this.letters[i] == this.letters[i + 6]
			) {
				if (this.letters[i] != null) {
					return 'full';
				}
			}
		}

		if (
			this.letters[0] == this.letters[4] &&
			this.letters[0] == this.letters[8]
		) {
			if (this.letters[0] != null) {
				return 'full';
			}
		}

		if (
			this.letters[2] == this.letters[4] &&
			this.letters[2] == this.letters[6]
		) {
			if (this.letters[2] != null) {
				return 'full';
			}
		}

		if (this.guesses == 81) {
			return 'draw';
		}

		return '';
	}

	async genimage(fullimage = true, square: any = null, sqcolor: any = null) {
		const gridSize = 3;
		const game = this;
		const gridRows = 3;
		const gridWidth = 100;
		const gridHeight = 100;
		const borderWidth = 2;
		const separation = 5;
		const imageWidth = gridSize * gridWidth + (gridSize - 1) * separation;
		const imageHeight = gridRows * gridHeight + (gridRows - 1) * separation;
		const image = new Jimp(imageWidth, imageHeight, 0x000000ff);
		const bigimage = new Jimp(1014, 1014, 0x000000ff);
		async function drawGridCell(
			x: number,
			y: number,
			bgColor: number,
			letter: string = null,
			index: string
		) {
			image.scan(x, y, gridWidth, gridHeight, function (x: any, y: any, idx: number) {
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
			let x2 = 7;
			let y = 8;
			for (let k = 0; k < 9; k++) {
				for (let i = 0; i < gridRows; i++) {
					for (let j = 0; j < gridSize; j++) {
						const x = j * gridWidth + j * separation;
						const y = i * gridHeight + i * separation;
						let letter = game.subletters[k][a - 1];
						if (game.letters[k]) {
							letter = game.letters[k];
						}

						if (square == k) {
							await drawGridCell(x, y, sqcolor, letter, String(a));
						} else {
							await drawGridCell(x, y, 0x14bdacff, letter, String(a));
						}

						a++;
					}
				}

				a = 1;
				await bigimage.blit(image, x2 * 3, y * 3);
				x2 += 110;
				if (x2 > 300) {
					x2 = 7;
					y += 110;
				}
			}
		}

		await drawGrid();
		await bigimage.writeAsync('im.png');
		return 'done';
	}
}
export const name = '3D Tic Tac Toe';
export const args = true;
export const aliases = ['3d', '3dttt'];
export const description = 'Play 3d Tic Tac Toe with someone';
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
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const mentions = await msg.getMentions();

	// for playing with myself :)

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

	if (mentioneduser.number == member.number) {
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
	await game.genimage();
	await client.sendMessage(
		game.chatid,
		`@${chance.number} you start!\n Choose a square to start placing`
	);
	await game.start();
}
