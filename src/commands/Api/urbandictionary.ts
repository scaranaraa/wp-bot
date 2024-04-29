import axios from 'axios';
import pkg2, { type Client, type Message } from 'whatsapp-web.js';

const { MessageMedia } = pkg2;

export const name = 'urbandictionary';
export const args = true;
export const aliases = ['ud', 'urban'];
export const description = 'Get upto 5 definitions from urban dictionary';
export const category = 'API';
/**
 * @memberof! API
 * @name urbandictionary
 * @description
 * Retrieves definitions from Urban Dictionary for a given term.
 *
 * **Usage:**
 * - `!urbandictionary {term}` or `!ud {term}` - Searches Urban Dictionary for the specified term and displays definitions. 
 *
 * **Notes:**
 * - This command requires an API key for 'lolhuman.xyz'.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply('Provide queeyyrry');
	}

	const chat = await msg.getChat();
	let res: any = await fetch(
		`https://api.lolhuman.xyz/api/urdict?apikey=${process.env.LOL_API}&query=${encodeURIComponent(args.join(' '))}`
	);
	res = await res.json();
	if (res.status != 200) {
		return msg.reply('Not found :(');
	}

	if (res.result) {
		for (let i = 0; i < (res.result.length <= 5 ? res.result.length : 5); i++) {
			await msg.reply(
				res.result[i].definition.replace('[', '').replace(']', '')
			);
		}
	}
}
