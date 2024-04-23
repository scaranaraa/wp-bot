import { type Message, type Client } from 'whatsapp-web.js';
import words from '../utils/newwords.js';
import words2 from '../utils/words.js';
import baseuser from '../../models/baseuser.js';

import { type GreenTea } from '../../types/teatypes.js';

let listofwords2 = words2.WORDS.split('\n');
let listofwords = words.words.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());
listofwords2 = listofwords2.map(word => word.trim().toLowerCase());

function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class pinktea implements GreenTea {
	constructor(client: Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.segment = '';
		this.players = new Map();
		this.queue = new Map();
		this.scorers = [];
		this.unanswered = 0;
		this.usedwords = [];
	}

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
			'You have a few seconds to unscramble.\n\nFastest one to write wins 5 points. You can use other letters than the ones given but all given letters must be used. Second wins 3 points and third wins 1 point.';
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

		if (!this.client.ingame) {
			return;
		}

		const game = this;

		let word = randomWord();
		while (word.length < 4 || word.length >= 7 || !regex.test(word)) {
			word = randomWord();
		}

		const segment = shuffle(word);
		this.client.on('message_create', async function wait(msg) {
			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			const user = await msg.getContact();
			const res = msg.body.toLowerCase().trim();

			if (
				listofwords2.includes(res) &&
				areAnagram(segment, res) &&
				!res.includes('@') &&
				game.players.has(user.number) &&
				!game.scorers.includes(user.number) &&
				game.scorers.length < 3 &&
				!game.usedwords.includes(res)
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
			`Unscramble *${segment.toUpperCase()}* as fast as you can!`
		);
	}
}

export const name = 'pinktea';
export const args = true;
export const aliases = ['pt'];
export const description = 'Play a game of pinktea';
export const disabled = false;
export const category = 'Games';
export async function run(client: Client, msg: Message, args: string[]) {
	let activated = false;
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const game = new pinktea(client, chat.id._serialized);

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

function shuffle(str: string) {
	const strArray = Array.from(str);
	for (let i = 0; i < strArray.length - 1; ++i) {
		const j = Math.floor(Math.random() * strArray.length);
		const temp = strArray[i];
		strArray[i] = strArray[j];
		strArray[j] = temp;
	}

	return strArray.join('');
}

function areAnagram(str1: string, str2: string) {
	for (let i = 0; i < str1.length; i++) {
		if (!str2.includes(str1[i])) {
			return false;
		}
	}

	return true;
}
