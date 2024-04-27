import pm2 from 'pm2';

import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'restart';
export const args = true;
export const aliases: string[] = ['retar'];
export const description = 'Restart the bot to fix lag';
export const category = 'Dev';
/**
 * Restarts the bot process.
 * 
 * **Usage:**
 * - `!restart` - Initiates a bot restart. (only if running with pm2, otherwise will break the bot)
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	await msg.reply('restarting..');
	pm2.restart('wwjs', async (err, proc) => {
		console.log(err);
	});
}
