import pkg from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'balance';
export const args = true;
export const aliases = ['bal', 'coins'];
export const description = 'Check your balance';
export const category = 'Pokemon';
/**
 * @memberof! Pokemon
 * @name balance
 * @description
 * Displays the user's current coin balance in the Pokemon game. 
 *
 * **Usage:**
 * - `!balance` or `!bal` - Shows the user's current coin balance. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	const userbalance = await user.getBalance();
	await msg.reply(`You have *${userbalance}* coins`);
}
