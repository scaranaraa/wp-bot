import pkg from 'whatsapp-web.js';
import { pokemonschema } from '../../models/mongoa.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'select';
export const args = true;
export const aliases: string[] = [];
export const description = 'Select pokemon for your team';
export const category = 'Pokemon';
/**
 * @memberof! Pokemon
 * @name select
 * @description
 * Allows users to select Pokemon for their team in the Pokemon game. 
 *
 * This command manages the selection process, allowing users to add or view 
 * their currently selected Pokemon.
 *
 * **Usage:**
 * - `!select {Pokedex ID}` - Adds the specified Pokemon to the user's team.
 * - `!select` - Displays the user's currently selected Pokemon. 
 * 
 * **Notes:**
 * - Users can have a maximum of 3 Pokemon on their team.
 */ 
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const member = await msg.getContact();
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	const chat = await msg.getChat();
	if (!args[0]) {
		const slc = await user.getselectedpokemon();
		if (!slc) {
			return msg.reply(
				'You have not selected any pokemon!\nRun select <Pokedex ID> to select a pokemon'
			);
		}

		let res = 'Your selected pokemon are-';
		for (let i = 0; i < slc.length; i++) {
			const pokemon = await pokemonschema.findOne({
				owner_id: member.number,
				id: slc[i],
			});
			res += `\n\nPokedex ID - ${pokemon.idx}\nLv.${pokemon.level} ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)}`;
		}

		return msg.reply(res);
	}

	if (isNaN(parseInt(args[0]))) {
		return msg.reply('Please enter a valid Pokedex ID');
	}

	const pokemon = await pokemonschema.findOne({
		owner_id: member.number,
		idx: parseInt(args[0]),
	});
	if (!pokemon) {
		return msg.reply('Please enter a valid Pokedex ID');
	}

	const alrselected = await user.getselectedpokemon();
	if (alrselected) {
		if (alrselected.includes(pokemon.id)) {
			return msg.reply('You have already selected this pokemon!');
		}

		if (alrselected.length >= 3) {
			user.removeselectedpokemon();
		}
	}

	await user.selectpokemon(pokemon.id);
	const slc = await user.getselectedpokemon();
	if (!slc) {
		return msg.reply(
			'You have not selected any pokemon!\nRun select <Pokedex ID> to select a pokemon'
		);
	}

	let res = 'Your selected pokemon are-';
	for (let i = 0; i < slc.length; i++) {
		const pokemon = await pokemonschema.findOne({
			owner_id: member.number,
			id: slc[i],
		});
		res += `\n\nPokedex ID - ${pokemon.idx}\nLv.${pokemon.level} ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)}`;
	}

	return msg.reply(res);
}

function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
