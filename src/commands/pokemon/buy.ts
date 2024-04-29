import pkg from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'buy';
export const args = true;
export const aliases: string[] = [];
export const description = 'Buy something from the shop';
export const category = 'Pokemon';
/**
 * @memberof! module:Pokemon
 * @name buy
 * @description
 * Allows users to buy items from the shop in the Pokemon game.
 * 
 * This command handles the purchasing process, checking affordability, deducting coins, 
 * and adding items to the user's inventory. 
 *
 * **Usage:**
 * - `!buy {item name} [amount]` - Buys the specified item from the shop.
 *
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
	if (!args[0]) {
		return msg.reply('Specify the item you want to buy');
	}

	let amt = 1;
	if (!isNaN(parseInt(args[args.length - 1]))) {
		amt = parseInt(args[args.length - 1]);
	}

	let kwargs = args.join(' ');
	let founditem;
	founditem = client.data.itemByName(kwargs);
	if (amt != 1 && founditem) {
		amt = 1;
	}

	if (!founditem) {
		args.pop();
		kwargs = args.join(' ');
		founditem = client.data.itemByName(kwargs);
	}

	if (!founditem) {
		return msg.reply('Item not found');
	}

	const cost = founditem.cost * amt;
	if (cost > userbalance) {
		return msg.reply('You cannot afford this');
	}

	await user.removeCoins(cost);
	await user.addInv(founditem.name, amt);
	await msg.reply(`You bought x${amt} ${founditem.name} for ${cost} coins!`);
}
