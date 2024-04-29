import { type Client, type Message } from 'whatsapp-web.js';
import words from '../utils/words.js';
import baseuser from '../../models/baseuser.js';
import { type GreenTea } from '../../types/teatypes.js';

let listofwords = words.WORDS.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class yellowtea implements GreenTea {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.segment = '';
		this.players = new Map();
		this.queue = new Map();
		this.scores = new Map();
		this.usedwords = [];
		this.unanswered = 0;
	}

	currwords?: number[];

	chatid: string;

	scores?: Map<string, number>;

	client: Client;

	segment: string;

	players: Map<string, number>;

	queue: Map<string, string>;

	usedwords: string[];

	unanswered: number;

	async startgame() {
		this.client.ingame = true;
		const res =
			"You have a few seconds to write as many words as you can containing the group of *3 letters indicated*.\n\nPoints are awarded on the basis of words guessed. You can't reuse a word already played.";
		await this.client.sendMessage(this.chatid, res);
	}

	async sendword() {
		if (this.unanswered >= 4) {
			this.client.ingame = false;
			await this.client.sendMessage(this.chatid, 'Game cancelled');
			return;
		}

		this.scores = new Map();
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
				!game.usedwords.includes(res) &&
				!game.usedwords.includes(res.slice(0, -1)) &&
				!game.usedwords.includes(`${res}s`)
			) {
				game.usedwords.push(res);
				if (game.scores.has(user.number)) {
					game.scores.set(user.number, game.scores.get(user.number) + 1);
				} else {
					game.scores.set(user.number, 1);
				}

				await msg.react('👍');
			}

			if (!done) {
				setTimeout(async () => {
					if (done) {
						return;
					}

					done = true;
					game.client.removeListener('message_create', wait);
					let res = '';
					if (game.scores.size == 0) {
						game.unanswered++;
					}

					game.scores.forEach(async (value, key) => {
						game.unanswered = 0;
						game.players.set(key, game.players.get(key) + value);
						const playerscore = game.players.get(key);
						if (playerscore >= 30) {
							await game.client.sendMessage(
								game.chatid,
								`*@${game.queue.get(key)}* wins the game!`
							);
							const user = new baseuser({
								userId: key,
								users: game.client.cachedUsers,
							});
							user.addYellowtea();
							game.client.ingame = false;
							return;
						}

						res += `*@${game.queue.get(key)}* has ${playerscore} points.\n`;
					});
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

export const name = 'yellowtea';
export const args = true;
export const aliases = ['yet', 'ywt'];
export const description = 'Play a game of yellowtea with someone';
export const category = 'Games';
/**
 * @memberof! Games
 * @name yellowtea
 * @description
 * Implements the Yellow Tea word game within a WhatsApp chat.
 * 
 * **Usage (within the bot):**
 * - Call `startgame` to start the game and send instructions. 
 * - Use `sendword` to send a word segment and handle player responses. 
 * 
 * **User Commands:**
 * - `!yellowtea` or `!yet` - Starts a new Yellow Tea game.
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
	const game = new yellowtea(client, chat.id._serialized);
	await game.startgame();

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
