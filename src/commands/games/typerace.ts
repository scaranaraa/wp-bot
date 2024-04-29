// @ts-ignore
import { getRandomQuote } from 'everyday-fun';
import { stringSimilarity as similarity } from 'string-similarity-js';
import pkg, { type Message } from 'whatsapp-web.js';
import { generate } from 'text-to-image';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;

function textGenerator() {
	let phrase = '';
	const quote = getRandomQuote();
	phrase += `${quote.quote} - ${quote.author}`;
	return phrase;
}

export const name = 'typerace';
export const args = true;
export const aliases = ['tp', 'type', 'race'];
export const description =
	'Play a game of typerace to measure your typing speed';
export const category = 'Games';
/**
 * @memberof! Games
 * @name typerace
 * @description
 * Implements a typing race game within WhatsApp. 
 *
 * **Usage:**
 * - `!typerace` or `!tp` - Starts a new typing race. 
 * - The bot will send an image with a phrase to type. 
 * - Users compete to type the phrase accurately and as quickly as possible. 
 */
export async function run(client: pkg.Client, msg: Message, args: string[]) {
	if (client.ingame) {
		msg.reply('A game is currently active!');
		return;
	}

	client.ingame = true;
	const chat = await msg.getChat();
	const phase = textGenerator();
	const img = await generate(phase, {
		margin: 50,
		textAlign: 'center',
		bgColor: 'black',
		textColor: 'white',
		verticalAlign: 'center',
		fontSize: 24,
		// @ts-ignore
	}).then(async function (dataUri) {
		msg.reply('Type the following sentence as fast as you can');
		const media = new MessageMedia('image/png', dataUri.slice(22));
		await client.sendMessage(chat.id._serialized, media);
	});
	let done = false;
	const time = Date.now();
	client.on('message_create', async function trial(msg) {
		const res = msg.body;
		let closeness = similarity(
			res.toLowerCase(),
			phase.toLowerCase(),
			undefined,
			true
		);
		closeness *= 100;
		if (closeness >= 92) {
			done = true;
			client.ingame = false;
			client.removeListener('message_create', trial);

			const user = await msg.getContact();
			const timeTaken = Date.now() - time;
			const user2 = new baseuser({
				userId: user.number,
				users: client.cachedUsers,
			});
			user2.addTyperace();

			await msg.reply(
				`${user.name || user.number} finished first! \n\n` +
					`You took *${timeTaken / 1000}* seconds to type the phrase with a *${closeness.toFixed(2)}%* accuracy!\nYou have a raw speed of *${(((phase.length / (timeTaken / 1000)) * 60) / 5).toFixed(2)}* wpm`
			);
			return;
		}

		setTimeout(async () => {
			if (done) {
				return;
			}

			client.removeListener('message_create', trial);
			client.ingame = false;
			await msg.reply('No one finished in time :(');
		}, 60000);
	});
}
