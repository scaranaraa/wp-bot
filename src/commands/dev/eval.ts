// @ts-ignore
import { create } from 'sourcebin';
import pkg from 'whatsapp-web.js';
import util from 'util';
import fs from 'fs';

const { Client, Location, Poll, List, Buttons, LocalAuth, MessageMedia } = pkg;
export const name = 'evaluate';
export const args = true;
export const aliases = ['evaluate', 'ev', 'eval'];
export const description = 'Evaluate javascript code';
export const category = 'Dev';
/**
 * @memberof! Dev
 * @name evaluate
 * @description
 * Evaluates JavaScript code and returns the result. 
 * 
 * **Usage:**
 * - `!eval 2+2` - Evaluates the expression and returns `4`.
 * - `!eval console.log('Hello')` - Executes the code and displays `Hello` in the console. 
 * - `!eval (async () => { ... })()` - Evaluates asynchronous code.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const mem = await msg.getContact();
	if (msg.fromMe || mem.number == `${process.env.OWNER_NUMBER}`) {
		try {
			let evaled;
			let code = args.join(' ');
			if (code.endsWith('--async')) {
				code = code.slice(0, -7);
				evaled = await eval(`(async()=>{${code}})();`);
			} else {
				evaled = await eval(code);
			}

			if (typeof evaled !== 'string') {
				evaled = util.inspect(evaled, {
					depth: 0,
				});
			}

			let result = clean(evaled);
			if (result.toString().includes('--math')) {
				result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}

			if (result.length > 1024) {
				const source = await create({
					title: 'wp code',

					files: [
						{
							content: result,
							language: 'javascript',
						},
					],
				});
				result = `[Source](${source.url})`;
			}

			msg.reply(result);
		} catch (err: unknown) {
			console.log(clean(err));
			msg.reply(`error${clean(err)}`);
		}
	} else {
		msg.reply('ur cute :3 but u still cant run this :(');
	}
}

function clean(text: unknown): string {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return String(text);
}
