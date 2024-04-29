import { type Client, type Contact, type Message } from 'whatsapp-web.js';
import words from '../utils/words.js';
import baseuser from '../../models/baseuser.js';
import { type BlackTea } from '../../types/teatypes.js';

let listofwords = words.WORDS.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class blacktea implements BlackTea {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.segment = '';
		this.players = new Map();
		this.queue = [];
		this.usedwords = [];
	}

	queue: Contact[];

	chatid: string;

	client: Client;

	segment: string;

	time: number;

	players: Map<string, number>;

	usedwords: string[];

	async startgame() {
		this.client.ingame = true;
		const res =
			"You have a few seconds to write a word containing the group of *3 letters indicated*.\n\nYou lose 1 HP when the time is up. You can't reuse a word already played.";
		await this.client.sendMessage(this.chatid, res);
	}

	async sendword() {
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
		const currplayer = this.queue[0];
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
				user.number == currplayer.number &&
				!game.usedwords.includes(res)
			) {
				if (done) {
					return;
				}

				done = true;

				game.usedwords.push(res);
				await msg.react('👍');

				game.client.removeListener('message_create', wait);
				game.queue.push(game.queue.shift());
				await game.sendword();
			}

			if (!done) {
				setTimeout(async () => {
					if (done) {
						return;
					}

					done = true;
					game.client.removeListener('message_create', wait);
					game.players.set(
						currplayer.number,
						game.players.get(currplayer.number) - 1
					);
					const faileduserscore = game.players.get(currplayer.number);
					if (faileduserscore == 0) {
						game.client.sendMessage(
							game.chatid,
							`*@${currplayer.name || currplayer.number}* You have no more lives left`
						);
						game.queue.shift();
						if (game.queue.length == 1) {
							await game.client.sendMessage(
								game.chatid,
								`*@${game.queue[0].name || game.queue[0].number}* You win!`
							);
							const user = new baseuser({
								userId: game.queue[0].number,
								users: game.client.cachedUsers,
							});
							user.addBlacktea();
							game.client.ingame = false;
							return;
						}

						if (game.queue.length == 0) {
							game.client.sendMessage(game.chatid, 'No one won');
							game.client.ingame = false;
							return;
						}
					} else {
						await game.client.sendMessage(
							game.chatid,
							`*@${currplayer.name || currplayer.number}*\n\nTIMES UP! You have *${faileduserscore}* lives left`
						);
						game.queue.push(game.queue.shift());
					}

					await game.sendword();
				}, 11000);
			}
		});
		await this.client.sendMessage(
			this.chatid,
			`*@${currplayer.name || currplayer.number}* Type a word containing ${segment.toUpperCase()}`
		);
	}
}

export const name = 'blacktea';
export const args = true;
export const aliases = ['bt'];
export const description = 'Play a game of blacktea';
export const category = 'Games';
/**
 * @memberof! Games
 * @name blacktea
 * @description
* Implements the Black Tea word game within a WhatsApp chat.
*
* **Usage (within the bot):**
* - Call startgame to initiate the game and send instructions.
* - Use sendword to send a word segment and handle player responses, deducting "lives" for players who fail to answer in time.
* 
* **User Commands:**
* - !blacktea or !bt - Starts a new Black Tea game.
* - join - Joins the ongoing game.
* - {word} - Submits a word containing the provided segment.
*/
export async function run(client: Client, msg: Message, args: string[]) {
	let activated = false;

	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const game = new blacktea(client, chat.id._serialized);
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

		game.players.set(user.number, 3);
		game.queue.push(user);

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
