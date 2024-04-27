import { type Client, type Message } from 'whatsapp-web.js';
import words from '../utils/words.js';
import baseuser from '../../models/baseuser.js';
import { type GreenTea } from '../../types/teatypes.js';

let listofwords = words.WORDS.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class redtea implements GreenTea {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.segment = '';
		this.players = new Map();
		this.queue = new Map();
		this.scorers = [];
		this.currwords = [];
		this.usedwords = [];
		this.unanswered = 0;
	}

	currwords?: number[];

	chatid: string;

	client: Client;

	segment: string;

	players: Map<string, number>;

	queue: Map<string, string>;

	scorers: string[];

	usedwords: string[];

	unanswered: number;

	async startgame() {
		this.client.ingame = true;
		const res =
			"You have a few seconds to write a word containing the group of *3 letters indicated*.\n\nLongest word wins 5 points. Second longest wins 3 points and third wins 1 point. If two words have same length, the first person to say it gets more points. You can't reuse a word already played.";
		await this.client.sendMessage(this.chatid, res);
	}

	async sendword() {
		if (this.unanswered >= 4) {
			this.client.ingame = false;
			await this.client.sendMessage(this.chatid, 'Game cancelled');
			return;
		}

		this.currwords = [0, 0, 0];
		this.scorers = [];
		let done = false;
		const regex = /^[a-zA-Z]+$/;

		if (!this.client.ingame) {
			return;
		}

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
				!game.usedwords.includes(res)
			) {
				game.usedwords.push(res);
				if (res.length > game.currwords[0]) {
					game.currwords.unshift(res.length);
					game.currwords.pop();
					const index = game.scorers.indexOf(user.number);
					if (index >= 0) {
						game.scorers.splice(index, 1);
					}

					game.scorers.unshift(user.number);
					await msg.react('🥇');
				} else if (res.length > game.currwords[1]) {
					game.currwords[2] = game.currwords[1];
					game.currwords[1] = res.length;
					const index = game.scorers.indexOf(user.number);
					if (index >= 0) {
						game.scorers.splice(index, 1);
					}

					game.scorers.splice(1, 0, user.number);
					await msg.react('🥈');
				} else if (res.length > game.currwords[2]) {
					game.currwords[2] = res.length;
					const index = game.scorers.indexOf(user.number);
					if (index >= 0) {
						game.scorers.splice(index, 1);
					}

					game.scorers.splice(2, 0, user.number);
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
					let toadd = 5;
					if (game.scorers.length == 0) {
						game.unanswered++;
					}

					for (let i = 0; i < game.scorers.length; i++) {
						game.unanswered = 0;
						game.players.set(
							game.scorers[i],
							game.players.get(game.scorers[i]) + toadd
						);
						toadd -= 2;
						res += `*@${game.queue.get(game.scorers[i])}* has ${game.players.get(game.scorers[i])} points.\n`;
					}

					for (let i = 0; i < game.scorers.length; i++) {
						const playerscore = game.players.get(game.scorers[i]);
						if (playerscore >= 30) {
							await game.client.sendMessage(
								game.chatid,
								`*@${game.queue.get(game.scorers[i])}* wins the game!`
							);
							const user = new baseuser({
								userId: game.scorers[i],
								users: game.client.cachedUsers,
							});
							user.addRedtea();
							game.client.ingame = false;
							return;
						}
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
			`Type the longest word containing *${segment.toUpperCase()}* as fast as you can!`
		);
	}
}

export const name = 'redtea';
export const args = true;
export const aliases = ['rt'];
export const description = 'Play a game of redtea';
export const category = 'Games';
/**
 * Implements the Red Tea word game within a WhatsApp chat. 
 *
 * **Usage (within the bot):**
 * - Call `startgame` to initiate the game and send instructions. 
 * - Use `sendword` to send a word segment and handle player responses, awarding points for the longest words.
 * 
 * **User Commands:**
 * - `!redtea` or `!rt` - Starts a new Red Tea game.
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
	const game = new redtea(client, chat.id._serialized);

	await game.startgame();

	client.on('message_create', async function wait(msg: Message) {
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
