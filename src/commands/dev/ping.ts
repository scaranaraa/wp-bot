import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'ping';
export const args = true;
export const aliases: string[] = ['p'];
export const description = 'Check bot reponse time';
export const category = 'Dev';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[],
	date: number
) {
	await msg.reply(`Execution time - ${Date.now() - date} ms`);
}
