import pkg from 'whatsapp-web.js';
import { pokemonschema } from '../../models/mongoa.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'moveset';
export const args = true;
export const aliases = ['moves'];
export const description = 'Select moves for your pokemon';
export const category = 'Pokemon';
/**
 * @memberof! Pokemon
 * @name moveset
 * @description
 * Allows users to manage the moveset of their Pokemon in the Pokemon game. 
 *
 * This command displays the Pokemon's currently selected moves and allows users to 
 * select different moves from the Pokemon's learned moves. 
 *
 * **Usage:**
 * - `!moveset {Pokedex ID}` - Shows the selected and learned moves for the specified Pokemon. 
 * - `!moveset {Pokedex ID} select {move index}` - Selects the specified move for the Pokemon's moveset.
 * 
 * **Notes:** 
 * - Pokemon can have up to 4 moves in their moveset. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const member = await msg.getContact();
	if (!args[0] || isNaN(parseInt(args[0]))) {
		return msg.reply('Please enter a valid pokemon id');
	}

	const pokemon = await pokemonschema.findOne({
		owner_id: member.number,
		idx: parseInt(args[0]),
	});
	if (!pokemon) {
		return msg.reply('You do not have this pokemon!');
	}

	if (args[1] && args[1].toLowerCase() == 'select') {
		if (!args[2] || isNaN(parseInt(args[2]))) {
			return msg.reply('Please enter a valid move index');
		}

		if (parseInt(args[2]) <= 4) {
			return msg.reply('You have already selected this move');
		}

		if (parseInt(args[2]) > pokemon.moves.length) {
			return msg.reply('You do not have this move');
		}

		pokemon.moves.push(pokemon.moves.shift());
		pokemon.moves.splice(3, 0, pokemon.moves[parseInt(args[2]) - 2]);
		pokemon.moves.splice(parseInt(args[2]) - 1, 1);
		pokemon.save();
		return msg.reply('Move selected!');
	}

	let res = 'Selected moves -\n';
	for (let i = 0; i < 4; i++) {
		res += `${i + 1}. ${cp(client.data.moveByNumber(pokemon.moves[i] || null)?.slug || null)}\n`;
	}

	res += '\n\nLearnt moves -\n';
	for (let i = 0; i < pokemon.moves.length; i++) {
		res += `${i + 1}. ${cp(client.data.moveByNumber(pokemon.moves[i] || null)?.slug || null)}\n`;
	}

	await msg.reply(res);
}

function cp(string: string) {
	try {
		return string.charAt(0).toUpperCase() + string.slice(1);
	} catch {
		return 'No move';
	}
}
