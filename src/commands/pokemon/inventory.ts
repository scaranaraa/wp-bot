import pkg from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'inventory';
export const args = true;
export const aliases = ['inv', 'items'];
export const description = 'Check your inventory';
export const category = 'Pokemon';
/**
 * @memberof! module:Pokemon
 * @name inventory
 * @description
 * Displays the items in the user's inventory for the Pokemon game. 
 * 
 * **Usage:**
 * - `!inventory` or `!inv` - Shows the list of items and their quantities in the user's inventory.
 *
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	let res = '';
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	const userinv = await user.getInv();
	if (!userinv || userinv.length == 0) {
		return msg.reply('You have nothing in your inventory!');
	}

	userinv.forEach(async item => {
		res += `\n${item.name} x${item.amount}`;
	});
	return msg.reply(res);
}
