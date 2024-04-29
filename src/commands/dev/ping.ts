import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'ping';
export const args = true;
export const aliases: string[] = ['p'];
export const description = 'Check bot reponse time';
export const category = 'Dev';
/**
 * @memberof! Dev
 * @name ping
 * @description
 * Measures and reports the bot's response time
 * 
 * **Usage:**
 * - `!ping` - Replies with the time taken for the bot to process and respond.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[],
	date: number
) {
	await msg.reply(`Execution time - ${Date.now() - date} ms`);
}
