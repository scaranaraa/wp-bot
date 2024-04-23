import pkg from 'whatsapp-web.js';
import { type Item } from '../../pokedex/models.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'shop';
export const args = true;
export const aliases: string[] = [];
export const description = 'Check the shop';
export const category = 'Pokemon';
export async function run(client: pkg.Client, msg: pkg.Message, args: any[]) {
	let idx = 0;
	if (args[0] && !isNaN(args[0])) {
		idx = parseInt(args[0]);
	}

	const max = 7;
	if (idx > max) {
		idx = max;
	}

	const show: Item[] = [];
	client.data.allItems().forEach((element: any) => {
		if (element.page == idx) {
			show.push(element);
		}
	});
	let res = '';
	// id,name,description,cost,shard,action,page,emote,separate
	show.forEach(element => {
		res += `*${element.name}* - ${element.description || ''}\nCost: ${element.cost}\n\n`;
	});
	res += `\nPage ${idx} of ${max}`;
	await msg.reply(res);
}
