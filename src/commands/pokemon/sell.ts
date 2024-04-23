import pkg from 'whatsapp-web.js';
import { pokemonschema } from '../../models/mongoa.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'sell';
export const args = true;
export const aliases: string[] = [];
export const description = 'Sell your pokemon';
export const category = 'Pokemon';
export async function run(client: pkg.Client, msg: pkg.Message, args: any[]) {
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	const userbalance = await user.getBalance();
	if (!args[0] || isNaN(args[0])) {
		return msg.reply(`syntax - ${process.env.PHONE} sell <POKEDEX ID>`);
	}

	const foundpoke = await pokemonschema.findOne({
		owner_id: member.number,
		idx: parseInt(args[0]),
	});
	if (!foundpoke) {
		return msg.reply('Enter valid pokedex ID');
	}

	const pokemon = client.data.findSpeciesByNumber(foundpoke.species_id);
	const amt = Math.floor((1000 / pokemon.abundance + 10) * 25);
	let done = false;
	await msg.reply(
		`Do you wish to sell your Lv.${foundpoke.level} ${cp(pokemon.slug)} for *${amt}* coins?\n\nYES/NO`
	);
	client.on('message_create', async function trial(msg) {
		if (!done) {
			setTimeout(async () => {
				if (done) {
					return;
				}

				done = true;
				client.removeListener('message_create', trial);
				return msg.reply('Command timed out');
			}, 10000);
			const mem = await msg.getContact();
			if (msg.hasQuotedMsg) {
				return;
			}

			if (mem.number != member.number) {
				return;
			}

			if (msg.body.toLowerCase() == 'yes') {
				done = true;
				await msg.reply(
					`You have sold your Lv.${foundpoke.level} ${cp(pokemon.slug)} for ${amt} coins`
				);
				await user.addCoins(amt);
				await pokemonschema.deleteOne({
					owner_id: member.number,
					idx: parseInt(args[0]),
				});
				client.removeListener('message_create', trial);
			} else {
				done = true;
				return msg.reply('Cancelled');
			}
		}
	});
}

function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
