import { type Client, Contact, type Message } from 'whatsapp-web.js';
import words from '../utils/words.js';
import baseuser from '../../models/baseuser.js';
import { type GreenTea } from '../../types/teatypes.js';

let listofwords = words.WORDS.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class greentea implements GreenTea {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.segment = '';
		this.players = new Map();
		this.queue = new Map();
		this.scorers = [];
		this.usedwords = [];
		this.unanswered = 0;
	}

	unanswered: number;

	chatid: string;

	client: Client;

	segment: string;

	players: Map<string, number>;

	queue: Map<string, string>;

	scorers: string[];

	usedwords: string[];

	async startgame() {
		this.client.ingame = true;
		const res =
			"You have a few seconds to write a word containing the group of *3 letters indicated*.\n\nFastest one to write wins 5 points. Second wins 3 points and third wins 1 point. You can't reuse a word already played.";
		await this.client.sendMessage(this.chatid, res);
	}

	async sendword() {
		if (this.unanswered >= 4) {
			this.client.ingame = false;
			await this.client.sendMessage(this.chatid, 'Game cancelled');
			return;
		}

		this.scorers = [];
		let done = false;
		const regex = /^[a-zA-Z]+$/;
		const game = this;
		let word = randomWord();
		while (word.length <= 3 || !regex.test(word)) {
			word = randomWord();
		}

		const randomIndex = Math.floor(Math.random() * (word.length - 2));
		const segment = word.substring(randomIndex, randomIndex + 3);

		this.client.on('message_create', async function wait(msg) {
			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			const user = await msg.getContact();
			const res = msg.body.toLowerCase();

			if (
				listofwords.includes(res) &&
				res.includes(segment.toLowerCase()) &&
				!res.includes('@') &&
				game.players.has(user.number) &&
				!game.usedwords.includes(res) &&
				!game.scorers.includes(user.number) &&
				game.scorers.length < 3
			) {
				game.scorers.push(user.number);
				game.usedwords.push(res);

				if (game.scorers.length == 1) {
					game.players.set(user.number, game.players.get(user.number) + 5);
					await msg.react('🥇');
				} else if (game.scorers.length == 2) {
					game.players.set(user.number, game.players.get(user.number) + 3);
					await msg.react('🥈');
				} else if (game.scorers.length == 3) {
					game.players.set(user.number, game.players.get(user.number) + 1);
					await msg.react('🥉');
				}
			}

			if (!done) {
				setTimeout(async () => {
					if (done) {
						return;
					}

					done = true;
					game.client.removeListener('message_create', wait);
					let res = '';
					if (game.scorers.length == 0) {
						game.unanswered++;
					}

					for (let i = 0; i < game.scorers.length; i++) {
						game.unanswered = 0;
						const playerscore = game.players.get(game.scorers[i]);
						if (playerscore >= 30) {
							game.client.sendMessage(
								game.chatid,
								`*@${game.queue.get(game.scorers[i])}* wins the game!`
							);
							const user = new baseuser({
								userId: game.scorers[i],
								users: game.client.cachedUsers,
							});
							user.addGreentea();
							game.client.ingame = false;
							return;
						}

						res += `*@${game.queue.get(game.scorers[i])}* has ${playerscore} points.\n`;
					}

					if (res) {
						await game.client.sendMessage(game.chatid, res);
					}

					await game.sendword();
				}, 11000);
			}
		});
		await this.client.sendMessage(
			this.chatid,
			`Type a word containing *${segment.toUpperCase()}* as fast as you can!`
		);
	}
}

export const name = 'greentea';
export const args = true;
export const aliases = ['gt'];
export const description = 'Play greentea with someone';
export const category = 'Games';
/** 
 * @memberof! Games
 * @name greentea
 * @description
 * Implements the Green Tea word game within a WhatsApp chat. 
 * 
 * **Usage (within the bot):** 
 * - Call `startgame` to initiate the game and send instructions. 
 * - Use `sendword` to send a word segment and handle player responses, awarding points for the fastest correct answers. 
 * 
 * **User Commands:** 
 * - `!greentea` or `!gt` - Starts a new Green Tea game.
 * - `join` - Joins the ongoing game.
 * - `{word}` - Submits a word containing the provided segment. 
 */ 
export async function run(client: Client, msg: Message, args: string[]) {
	let activated = false;

	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const game = new greentea(client, chat.id._serialized);
	game.startgame();

	client.on('message_create', async function wait(msg) {
		const chat = await msg.getChat();
		if (chat.id._serialized != game.chatid) {
			return;
		}

		if (msg.body.toLowerCase() != 'join') {
			return;
		}

		const user = await msg.getContact();
		if (game.players.has(user.number)) {
			return;
		}

		game.players.set(user.number, 0);
		game.queue.set(user.number, user.name || user.number);
		await msg.react('✅');

		setTimeout(async () => {
			if (activated) {
				return;
			}

			activated = true;
			client.removeListener('message_create', wait);
			await game.sendword();
		}, 10000);
	});
}
