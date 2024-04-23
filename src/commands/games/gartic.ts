import pkg from 'whatsapp-web.js';
import { type charadesBase } from '../../types/games.js';
import words from '../utils/garticwords.js';

let listofwords = words.split(',');
listofwords = listofwords.map(word => word.trim().toLowerCase());
function randomWord() {
	return listofwords[Math.floor(Math.random() * listofwords.length)];
}

class gartic implements charadesBase {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.currword = '';
		this.players = [];
		this.hints = 5;
		this.lives = 3;
	}

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

		const media = MessageMedia.fromFilePath('commands/utils/white.jpg');
		const game = this;
		let cansend = true;
		await this.client.sendMessage(current_player.id._serialized, media, {
			caption: `Your word is - \`${this.currword}\`\nYou have 90 seconds to draw it!`,
		});

		this.client.on('message_create', async function wait(msg) {
			setTimeout(async function () {
				if (cansend) {
					cansend = false;
					game.client.removeListener('message_create', wait);
					await game.client.sendMessage(
						current_player.id._serialized,
						'Timeout'
					);
					await game.client.sendMessage(
						game.chatid,
						'they took too long to draw'
					);
					game.lives--;
					await game.next_turn();
				}
			}, 90000);
			if (!cansend) {
				return;
			}

			const chat = await msg.getChat();
			if (chat.id._serialized != current_player.id._serialized) {
				return;
			}

			if (!msg.hasMedia) {
				return;
			}

			const downloaded_media = await msg.downloadMedia();
			if (!downloaded_media?.mimetype.includes('image')) {
				return;
			}

			cansend = false;
			game.client.removeListener('message_create', wait);
			game.client.sendMessage(game.chatid, downloaded_media, {
				caption: `Guess the drawing in 60 seconds\n${game.hints} hints left\nYou have ${game.lives} lives left`,
			});
			await game.guess_word();
		});
		await this.client.sendMessage(
			this.chatid,
			`${current_player.name || current_player.number} is drawing!`
		);
	}

	async guess_word() {
		const game = this;
		let canguess = true;
		this.client.on('message_create', async function wait(msg) {
			setTimeout(async function () {
				if (canguess) {
					canguess = false;
					game.client.removeListener('message_create', wait);
					await game.client.sendMessage(game.chatid, 'times up!');
					game.lives--;
					await game.next_turn();
				}
			}, 60000);

			if (!canguess) {
				return;
			}

			const chat = await msg.getChat();
			if (chat.id._serialized != game.chatid) {
				return;
			}

			const user = await msg.getContact();

			if (
				!game.players.find(a => a.number == user.number) ||
				user.number == game.players[0].number
			) {
				return;
			}

			if (msg.body.toLowerCase() == 'ghint') {
				const hint: string[] = game.currword
					.split('')
					.map(l => (l == ' ' ? ' ' : '_'));
				hint.shift();
				hint.unshift(game.currword[0]);
				await msg.reply(hint.join(' '));
				game.hints--;
			}

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
export const name = 'gartic';
export const args = true;
export const aliases = ['gc', 'ga'];
export const description = 'Play a game of gartic with someone';
export const category = 'Games';
const { MessageMedia } = pkg;
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (client.gartic) {
		msg.reply('A game is currently active!');
		return;
	}

	client.gartic = true;
	const chat = await msg.getChat();
	const game = new gartic(client, chat.id._serialized);
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

			game.next_turn();
		}, 15000);
	});
	await msg.reply('A new game has started\nType `join` to join the game');
}
