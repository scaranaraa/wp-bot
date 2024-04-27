import { stringSimilarity as similarity } from 'string-similarity-js';
import pkg from 'whatsapp-web.js';
import words from '../utils/garticwords.js';

import { type charadesBase } from '../../types/games.js';

let listofwords = words.split(',');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class charades implements charadesBase {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.currword = '';
		this.players = [];
		this.hints = 5;
		this.lives = 3;
		this.usedwords = [];
	}

	usedwords: string[];

	chatid: string;

	client: pkg.Client;

	currword: string;

	players: pkg.Contact[];

	hints: number;

	lives: number;

	async next_turn() {
		if (this.lives == 0) {
			await this.client.sendMessage(this.chatid, 'Game over!');
			this.client.gartic = false;
			return;
		}

		this.players.push(this.players.shift());
		const current_player = this.players[0];
		this.currword = randomWord();
		while (this.usedwords.includes(this.currword)) {
			this.currword = randomWord();
		}

		this.usedwords.push(this.currword);
		const game = this;
		await this.client.sendMessage(
			current_player.id._serialized,
			`Your word is - \`${this.currword}\`\nYou have 150 seconds. You can only answer yes/no`
		);
		await this.client.sendMessage(
			this.chatid,
			`${current_player.name || current_player.number}'s turn!\nYou have 150 seconds and ${game.hints} hints left\nYou have ${game.lives} lives left`
		);
		const hint: string[] = game.currword
			.split('')
			.map(l => (l == ' ' ? ' ' : '_'));
		hint.shift();
		hint.unshift(game.currword[0]);
		hint.pop();
		hint.push(game.currword[game.currword.length - 1]);
		await this.client.sendMessage(this.chatid, hint.join(' '));
		await game.guess_word();
	}

	async guess_word() {
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
						await game.next_turn();
					}
				}, 150000);
			}

			settimeout = false;
			if (!msg.body || msg.body.length < 3 || msg.hasMedia) {
				return;
			}

			if (!canguess) {
				return;
			}

			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			const user = await msg.getContact();
			const words = game.currword.split(' ');
			const checkword = msg.body.toLowerCase().replace(' ', '');
			if (user.number == game.players[0].number) {
				for (const word of words) {
					if (
						checkword.includes(word) ||
						word.includes(checkword) ||
						similarity(
							msg.body.toLowerCase(),
							game.currword,
							game.currword.length >= 4 ? 1 : 2,
							false
						) > 0.9
					) {
						await game.client.sendMessage(
							game.chatid,
							'You cannot say the word'
						);
						canguess = false;
						game.lives--;
						game.client.removeListener('message_create', wait);
						await game.next_turn();
						return;
					}
				}
			}

			if (!game.players.find(a => a.number == user.number)) {
				return;
			}

			/* if(msg.body.toLowerCase() == 'ghint' && game.hints > 0){
                let hint: string[] = game.currword.split("").map(l => l == ' ' ? ' ' : "_")
                hint.shift()
                hint.unshift(game.currword[0])
                await msg.reply(hint.join(' '))
                game.hints--
            } */

			if (msg.body.toLowerCase() == 'gquit') {
				canguess = false;
				game.client.removeListener('message_create', wait);
				game.client.gartic = false;
				await game.client.sendMessage(game.chatid, 'Game stopped!');
				return;
			}

			if (msg.body.trim().toLowerCase() == game.currword && canguess) {
				canguess = false;
				game.client.removeListener('message_create', wait);
				await msg.reply('Your guess was correct!');
				await game.next_turn();
			}
		});
	}
}
export const name = '20Questions';
export const args = true;
export const aliases = ['tq', '2q', '20q'];
export const description = 'Play 20 questions with someone';
export const category = 'Games';

const { MessageMedia } = pkg;
/**
 * Implements a 20 Questions-style guessing game within WhatsApp.
 *
 * **Usage (within the bot):**
 * - Call `next_turn` to start the game and assign the first player to think of a word. 
 * - The class will prompt other players to ask yes/no questions and guess the word.
 * 
 * **User Commands:**
 * - `!20questions` or `!20q` - Starts a new 20 Questions game. 
 * - `join` - Joins the ongoing game. 
 * - (Guessers) Ask yes/no questions to try to guess the word. 
 * - (Guessers) `{word}` - Submits a guess for the word.
 * - `gquit` - Stops the game.
 */ 
export async function run(client: pkg.Client, msg: pkg.Message) {
	if (client.gartic) {
		msg.reply('A game is currently active!');
		return;
	}

	client.gartic = true;
	const chat = await msg.getChat();
	const game = new charades(client, chat.id._serialized);
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

		game.players.push(user);
		await msg.react('✅');

		setTimeout(async () => {
			if (started) {
				return;
			}

			started = true;
			client.removeListener('message_create', wait);
			if (game.players.length < 2) {
				await client.sendMessage(
					game.chatid,
					'You need atleast 2 players to start'
				);
				client.gartic = false;
				return;
			}

			await game.next_turn();
		}, 10000);
	});
	await msg.reply('A new game has started!\nType `join` to join the game');
}
