import pkg, { Contact, type Message } from 'whatsapp-web.js';
import { Iwchain } from '../../types/games.js';
import baseuser from '../../models/baseuser.js';

import words from '../utils/words.js';

const { Client, LocalAuth, MessageMedia } = pkg;
let listofwords = words.WORDS.split('\n');
listofwords = listofwords.map(word => word.trim().toLowerCase());

class wchain implements Iwchain {
	chatid: string;

	client: pkg.Client;

	currletter: string;

	players: Contact[];

	lives: number;

	usedwords?: string[];

	score: number;

	constructor(client: pkg.Client, chatid: string) {
		this.client = client;
		this.currletter = randomletter();
		this.chatid = chatid;
		this.players = [];
		this.usedwords = [];
		this.lives = 3;
		this.score = 0;
	}

	async StartGame() {
		let res = `The order is -\n`;
		let idx = 1;
		for (const player of this.players) {
			res += `${idx}. \`${player.name || player.number}\`\n`;
			idx++;
		}
		await this.client.sendMessage(this.chatid, res);
		await this.start();
	}

	async start() {
		if (this.lives <= 0) {
			await this.client.sendMessage(
				this.chatid,
				`Game over!\nYour score - \`${this.score}\``
			);
			this.client.ingame = false;
			return;
		}
		const game = this;
		let canguess = true;
		let settimeout = true;
		this.client.on('message_create', async function wait(msg) {
			if (settimeout) {
				setTimeout(async function () {
					if (canguess) {
						canguess = false;
						game.client.removeListener('message_create', wait);
						await game.client.sendMessage(game.chatid, 'Times up!');
						game.lives--;
						await game.start();
					}
				}, 5000);
			}
			settimeout = false;
			const user = await msg.getContact();
			if (user.number !== game.players[0].number) return;
			if (
				msg.body.toLowerCase().startsWith(game.currletter) &&
				listofwords.includes(msg.body.toLowerCase())
			) {
				canguess = false;
				game.client.removeListener('message_create', wait);
				game.score++;
				game.players.push(game.players.shift());
				game.currletter = msg.body[msg.body.toLowerCase().length - 1];
				await game.start();
			}
		});
		await this.client.sendMessage(this.chatid, this.currletter.toUpperCase());
	}
}

export const name = 'Word chain';
export const args = true;
export const aliases = ['chain', 'wc', 'wch'];
export const description =
	'Play a game of word chain, type words that start with the previous words end';
export const category = 'Games';
/**
 * @memberof! Games
 * @name wordchain
 * @description
 * Implements the Word Chain game within a WhatsApp chat.
 *
 * **Usage (within the bot):**
 * - Call `StartGame` to initiate the game and send instructions.
 * - Use `start` to begin the word chain and handle player responses. 
 * 
 * **User Commands:**
 * - `!wordchain` or `!wc` - Starts a new Word Chain game.
 * - `join` - Joins the ongoing game. 
 * - `{word}` - Submits a word starting with the previous word's ending letter.
 */
export async function run(client: pkg.Client, msg: Message, args: string[]) {
	return msg.reply('WIP');
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const game = new wchain(client, chat.id._serialized);
	let started = false;
	client.on('message_create', async function wait(msg) {
		const chat = await msg.getChat();

		if (chat.id._serialized != game.chatid) {
			return;
		}

		if (msg.body.toLowerCase() != 'join') {
			return;
		}

		const user = await msg.getContact();

		if (game.players.find(a => a.number == user.number)) {
			return;
		}
		const base = new baseuser({
			userId: user.number,
			users: game.client.cachedUsers,
		});

		game.players.push(user);
		await msg.react('✅');

		setTimeout(async () => {
			if (started) {
				return;
			}

			started = true;
			client.removeListener('message_create', wait);
			if (game.players.length < 1) {
				await client.sendMessage(
					game.chatid,
					'You need atleast 2 players to start'
				);
				client.ingame = false;
				return;
			}

			await game.StartGame();
		}, 10000);
	});
	await msg.reply('A new game has started!\nType `join` to join the game');
}

const lowercaseletters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
function randomletter() {
	return lowercaseletters[Math.floor(Math.random() * lowercaseletters.length)];
}
