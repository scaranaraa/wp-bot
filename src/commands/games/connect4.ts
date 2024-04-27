import { type Client, type Contact, type Message } from 'whatsapp-web.js';
import { type connect4 } from '../../types/games.js';

class c4 implements connect4 {
	constructor(client: Client, id: string, pl1: Contact, pl2: Contact) {
		this.chatid = id;
		this.client = client;
		this.players = [pl1, pl2];
		this.place = ['🔵', '🔴'];
		this.board = [
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
			['⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪', '⁣⚪'],
		];
	}

	chatid: string;

	client: Client;

	players: Contact[];

	place: string[];

	board: string[][];

	async start() {
		await this.sendBoard();
		await this.client.sendMessage(
			this.chatid,
			`It's @${this.players[0].number}'s turn!`
		);
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
			if (res < 1 || res > 7) {
				return;
			}

			res--;
			let available = 6;
			while (available >= 0) {
				if (done) {
					return;
				}

				if (game.board[available][res] == '⁣⚪') {
					game.board[available][res] = game.place[0];
					done = true;
					const over = await game.checkgameover();
					if (over) {
						game.client.ingame = false;
						await game.client.sendMessage(
							game.chatid,
							`Game over! @${game.players[0].number} wins!`
						);
						return;
					}

					const full = await game.checkboardfull();
					if (full) {
						game.client.ingame = false;
						await game.client.sendMessage(
							game.chatid,
							"Game over! It's a draw!"
						);
						return;
					}

					game.place.reverse();
					game.players.reverse();
					await game.client.removeListener('message_create', wait);
					await game.start();
					return;
				}

				available--;
			}

			await game.client.sendMessage(
				game.chatid,
				'You cannot place a piece here!'
			);
		});
	}

	async sendBoard() {
		let stylisedboard = '';
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board[i].length; j++) {
				stylisedboard += `| ${this.board[i][j]} `;
			}

			stylisedboard += '|\n';
		}

		await this.client.sendMessage(this.chatid, stylisedboard);
	}

	async checkgameover() {
		// 4 in a row/column/diagonal to win
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board[i].length; j++) {
				const rowstr = `${this.board[i][j]}${this.board[i][j + 1] ? this.board[i][j + 1] : ''}${this.board[i][j + 2] ? this.board[i][j + 2] : ''}${this.board[i][j + 3] ? this.board[i][j + 3] : ''}`;
				if (rowstr.includes('🔴🔴🔴🔴') || rowstr.includes('🔵🔵🔵🔵')) {
					this.board[i][j] = '⭐';
					this.board[i][j + 1] = '⭐';
					this.board[i][j + 2] = '⭐';
					this.board[i][j + 3] = '⭐';
					await this.sendBoard();
					return true;
				}

				const columnstr = `${this.board[i][j]}${this.board[i + 1] ? this.board[i + 1][j] : ''}${this.board[i + 2] ? this.board[i + 2][j] : ''}${this.board[i + 3] ? this.board[i + 3][j] : ''}`;
				if (columnstr.includes('🔴🔴🔴🔴') || columnstr.includes('🔵🔵🔵🔵')) {
					this.board[i][j] = '⭐';
					this.board[i + 1][j] = '⭐';
					this.board[i + 2][j] = '⭐';
					this.board[i + 3][j] = '⭐';
					await this.sendBoard();
					return true;
				}

				// front diagonal
				let diagonalstr = `${this.board[i][j]}${this.board[i + 1] ? (this.board[i + 1][j + 1] ? this.board[i + 1][j + 1] : '') : ''}${this.board[i + 2] ? (this.board[i + 2][j + 2] ? this.board[i + 2][j + 2] : '') : ''}${this.board[i + 3] ? (this.board[i + 3][j + 3] ? this.board[i + 3][j + 3] : '') : ''}`;
				if (
					diagonalstr.includes('🔴🔴🔴🔴') ||
					diagonalstr.includes('🔵🔵🔵🔵')
				) {
					this.board[i][j] = '⭐';
					this.board[i + 1][j + 1] = '⭐';
					this.board[i + 2][j + 2] = '⭐';
					this.board[i + 3][j + 3] = '⭐';
					await this.sendBoard();
					return true;
				}

				// back diagonal
				diagonalstr = `${this.board[i][j]}${this.board[i + 1] ? (this.board[i + 1][j - 1] ? this.board[i + 1][j - 1] : '') : ''}${this.board[i + 2] ? (this.board[i + 2][j - 2] ? this.board[i + 2][j - 2] : '') : ''}${this.board[i + 3] ? (this.board[i + 3][j - 3] ? this.board[i + 3][j - 3] : '') : ''}`;
				if (
					diagonalstr.includes('🔴🔴🔴🔴') ||
					diagonalstr.includes('🔵🔵🔵🔵')
				) {
					this.board[i][j] = '⭐';
					this.board[i + 1][j - 1] = '⭐';
					this.board[i + 2][j - 2] = '⭐';
					this.board[i + 3][j - 3] = '⭐';
					await this.sendBoard();
					return true;
				}
			}
		}

		return false;
	}

	async checkboardfull() {
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board[i].length; j++) {
				if (this.board[i][j] == '⁣⚪') {
					return false;
				}
			}
		}

		return true;
	}
}

export const name = 'connect4';
export const args = true;
export const aliases = ['connect', 'c4'];
export const description = 'Play connect4 with someone';
export const category = 'Games';
/**
 * Implements the Connect Four game within WhatsApp. 
 *
 * **Usage (within the bot):**
 * - Call `start` to begin the game, send the initial board representation, and handle player moves. 
 * 
 * **User Commands:**
 * - `!connect4` or `!c4` - Starts a new Connect Four game.
 * - `{column number}` - Places a piece in the specified column (1-7).
 * - `QUIT` - Ends the current game.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (client.ingame) {
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

	const mentioneduser = mentions.pop();
	if (mentioneduser.number == member.number) {
		client.ingame = false;
		return msg.reply('please do not play with yourself :(');
	}

	const chance = Math.random() > 0.5 ? member : mentioneduser;
	const c4game = new c4(
		client,
		chat.id._serialized,
		chance,
		chance.number == member.number ? mentioneduser : member
	);
	await c4game.start();
}
