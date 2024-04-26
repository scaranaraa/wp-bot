import { Aki } from 'aki-api';
import pkg from 'whatsapp-web.js';
import { type aki } from '../../types/games.js';

const region = 'en';
const childMode = false;
const proxyOptions: any = undefined;
const { Client, LocalAuth, MessageMedia } = pkg;
class akinator implements aki {
	constructor(aki: Aki, client: pkg.Client, id: string) {
		this.aki = aki;
		this.chatid = id;
		this.questions = 0;
		this.client = client;
	}

	chatid: string;

	client: pkg.Client;

	aki: Aki;

	questions: number;

	async nextQuestion() {
		this.questions++;
		const game = this;
		const { question } = this.aki;
		const { answers } = this.aki;
		const options = [];
		const res = `${question}\n\n`;
		for (let i = 0; i < answers.length; i++) {
			options.push(`${i + 1}) ${answers[i]}`);
		}

		await this.client.sendMessage(this.chatid, res + options.join('\n'));
		let done = true;
		this.client.on('message_create', async function trial(msg) {
			if (!done) {
				return;
			}

			done = false;
			if (msg.body.toLowerCase() == 'quit') {
				game.client.removeListener('message_create', trial);
				game.client.ingame = false;
				return msg.reply('Game ended');
			}

			if (msg.body.toLowerCase().startsWith('ans ')) {
				let ans = parseInt(msg.body.slice(4).trim());
				if (isNaN(ans) || ans < 1 || ans > answers.length) {
					done = true;
					return msg.reply('Invalid answer');
				}

				ans--;
				try {
					await game.aki.step(ans);
				} catch (e) {
					await game.aki.step(ans);
				}

				const win = await game.checkwin();
				if (game.aki.guess) {
					game.client.removeListener('message_create', trial);
					game.client.ingame = false;
					const guess = game.aki.guess
					const res = 'Im thinking of....';
					await msg.reply(res);
					const media = await MessageMedia.fromUrl(guess.photo);
					await game.client.sendMessage(game.chatid, media, {
						caption: `Is your character *${guess.name_proposition}*? \n\nProbability - ${game.aki.progress}\nDescription - ${guess.description_proposition}`,
					});
					return;
				}
				game.client.removeListener('message_create', trial);
				await game.nextQuestion();
			}

			done = true;
		});
	}

	async checkwin() {
		return false;
	}
}

export const name = 'akinator';
export const args = true;
export const aliases = ['aki'];
export const description = 'Start a game of akinator';
export const category = 'General';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	if (client.ingame) {
		msg.reply('A game is currenty active!');
		return;
	}

	client.ingame = true;
	const aki = new Aki({ region, childMode, proxyOptions });
	await aki.start();
	const game = new akinator(aki, client, chat.id._serialized);
	await game.nextQuestion();
}
