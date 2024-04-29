import pkg from 'whatsapp-web.js';
import { pokemonschema, PokemonBase } from '../../models/mongoa.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'pokedex';
export const args = true;
export const aliases = ['dex', 'pd'];
export const description = 'Check your pokedex';
export const category = 'Pokemon';
/**
 * @memberof! Pokemon
 * @name pokedex
 * @description
 * Provides information about Pokemon and moves in the Pokemon game.
 *
 * This command allows users to view details about Pokemon they own, search for Pokemon or moves 
 * in the Pokedex, and retrieve information about specific Pokemon or moves. 
 *
 * **Usage:**
 * - `!pokedex` or `!dex` - Shows information about the user's first Pokemon.
 * - `!pokedex {Pokedex ID or name} [pokemon index]` - Shows details about a specific Pokemon owned by the user. 
 * - `!pokedex all` - Shows information about all Pokemon owned by the user. 
 * - `!pokedex search pokemon {pokemon name}` - Searches for a Pokemon in the Pokedex and displays its information.
 * - `!pokedex search move {move name or ID}` - Searches for a move in the Pokedex and displays its information.
 * - `!pokedex search evolution {pokemon name}` - Searches for the evolution of the pokemon  and displays its information.
 */
export async function run(client: pkg.Client, msg: pkg.Message, args: any) {
	const member = await msg.getContact();
	const chat = await msg.getChat();
	if (args[0]) {
		if (args[0] && args[0].toLowerCase() == 'help') {
			await msg.reply(
				`${process.env.PHONE} pokedex <index|name>\n\n@${process.env.PHONE} search <move|pokemon>`
			);
			return;
		}

		if (args[0] && args[0].toLowerCase() == 'search') {
			if (!args[1]) {
				return msg.reply('Please provide a search term');
			}

			if (args[1].toLowerCase() == 'pokemon') {
				if (!args[2]) {
					return msg.reply('Please provide a pokemon name');
				}

				args = args.slice(2);
				args = args.join(' ');
				const pokemon = client.data.speciesByName(args);
				if (!pokemon) {
					return msg.reply('Pokemon not found');
				}

				try {
					const media = MessageMedia.fromFilePath(
						`./src/commands/pokemon/images2/${pokemon.id}.png`
					);
					await client.sendMessage(chat.id._serialized, media, {
						caption: `Id - *${pokemon.id}*\nName - *${pokemon.slug}*\nHeight - *${pokemon.height}*\nWeight - *${pokemon.weight}*\nAbundance - *${pokemon.abundance}*\nDescription - *${pokemon.description}*`,
					});
				} catch (e) {
					console.log(e);
					await msg.reply(
						`Id - *${pokemon.id}*\nName - *${pokemon.slug}*\nHeight - *${pokemon.height}*\nWeight - *${pokemon.weight}*\nAbundance - *${pokemon.abundance}*\nDescription - *${pokemon.description}*`
					);
				}

				return;
			}

			if (args[1].toLowerCase() == 'evolution') {
				if (!args[2]) {
					return msg.reply('Please provide a pokemon name');
				}

				args = args.slice(2);
				args = args.join(' ');
				const pokemon = client.data.speciesByName(args);
				if (!pokemon) {
					return msg.reply('Pokemon not found');
				}

				try {
					const media = MessageMedia.fromFilePath(
						`./src/commands/pokemon/images2/${pokemon.id}.png`
					);
					await client.sendMessage(chat.id._serialized, media, {
						caption: pokemon.evolution_text,
					});
				} catch (e) {
					console.log(e);
					await msg.reply(
						`Id - *${pokemon.id}*\nName - *${pokemon.slug}*\nHeight - *${pokemon.height}*\nWeight - *${pokemon.weight}*\nAbundance - *${pokemon.abundance}*\nDescription - *${pokemon.description}*`
					);
				}

				return;
			}

			if (args[1]) {
				if (
					args[1].toLowerCase() == 'move' ||
					args[1].toLowerCase() == 'moves'
				) {
					if (!args[2]) {
						return msg.reply('Please provide a move name or id');
					}

					args = args.slice(2);
					args = args.join(' ');
					let move = client.data.moveByName(args);
					if (!move) {
						move = client.data.moveByNumber(args);
						if (!move) {
							return msg.reply('Move not found');
						}
					}

					await msg.reply(
						`Id - *${move.id}*\nName - *${move.slug}*\nPower - *${move.power}*\nPP - *${move.pp}*\nAccuracy - *${move.accuracy}*\nPriority - *${move.priority}*\nType - *${move.type_id}*\nEffect - *${move.effect.description}*`
					);
					return;
				}
			}
		}

		if (args[0] && args[0].toLowerCase() == 'all') {
			const res = await pokemonschema.find({ owner_id: member.number });
			if (!res || res.length == 0) {
				return msg.reply(
					`You don't have any pokemon! Do @${process.env.PHONE} pick to select a starter pokemon`
				);
			}

			let res2 = '';
			for (let i = 0; i < res.length; i++) {
				const pokemon = res[i];
				const pokemon2 = new PokemonBase({
					id: pokemon.id,
					timestamp: pokemon.timestamp,
					owner_id: pokemon.owner_id,
					idx: pokemon.idx,
					species_id: pokemon.species_id,
					level: pokemon.level,
					xp: pokemon.xp,
					nature: pokemon.nature,
					shiny: pokemon.shiny,
					iv_hp: pokemon.iv_hp,
					iv_atk: pokemon.iv_atk,
					iv_defn: pokemon.iv_defn,
					iv_satk: pokemon.iv_satk,
					iv_sdef: pokemon.iv_sdef,
					iv_spd: pokemon.iv_spd,
					iv_total: pokemon.iv_total,
					nickname: pokemon.nickname,
					favorite: pokemon.favorite,
					held_item: pokemon.held_item,
					moves: pokemon.moves,
					has_color: pokemon.has_color,
					color: pokemon.color,
				});
				// @ts-ignore
				res2 += `Pokedex ID - *${res[i].idx}*\nName - *${cp(client.data.findSpeciesByNumber(res[i].species_id).slug)}*\nTypes - ${client.data.findSpeciesByNumber(res[i].species_id).types}\nStats percentage - ${parseInt(pokemon2.ivPercentage * 100)}%\n\n`;
			}

			if (res2.length > 4096) {
				return msg.reply(`${res2.slice(0, 4000)}...`);
			}

			return msg.reply(res2);
		}

		if (args[0] && isNaN(args[0])) {
			const args2 = args.join(' ');
			const pokemon = client.data.speciesByName(args2);
			if (!pokemon) {
				return msg.reply('Pokemon not found');
			}

			const res = await pokemonschema.find({
				owner_id: member.number,
				species_id: pokemon.id,
			});
			if (!res) {
				return msg.reply(
					`You don't have any pokemon! Do @${process.env.PHONE} pick to select a starter pokemon`
				);
			}

			if (!isNaN(args[args.length - 1])) {
				const respokemon = res[args[args.length - 1] - 1] || res[0];
				if (!respokemon) {
					return msg.reply(
						`You don't have any pokemon! Do @${process.env.PHONE} pick to select a starter pokemon`
					);
				}

				return msg.reply(
					`INDEX - *${respokemon.idx}*\n\nSpecies Id - *${respokemon.species_id}*\nName - *${pokemon.slug}*\nLevel - *${respokemon.level}*\nNature - *${respokemon.nature}*\nXP - *${respokemon.xp}*\nHP - *${respokemon.iv_hp}*\nAttack - *${respokemon.iv_atk}*\nDefense - *${respokemon.iv_defn}*\nSpeed - *${respokemon.iv_spd}*\nMoves :-\n  -> *${cp(client.data.moveByNumber(respokemon.moves[0]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[1]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[2]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[3]).slug) || null}* \n\nShowing [${args[args.length - 1]}/${res.length}] pokemon`
				);
			} else {
				const respokemon = res[0];
				if (!respokemon) {
					return msg.reply(
						`You don't have any pokemon! Do @${process.env.PHONE} pick to select a starter pokemon`
					);
				}

				const pokemon = res[0];
				const pokemon2 = new PokemonBase({
					id: pokemon.id,
					timestamp: pokemon.timestamp,
					owner_id: pokemon.owner_id,
					idx: pokemon.idx,
					species_id: pokemon.species_id,
					level: pokemon.level,
					xp: pokemon.xp,
					nature: pokemon.nature,
					shiny: pokemon.shiny,
					iv_hp: pokemon.iv_hp,
					iv_atk: pokemon.iv_atk,
					iv_defn: pokemon.iv_defn,
					iv_satk: pokemon.iv_satk,
					iv_sdef: pokemon.iv_sdef,
					iv_spd: pokemon.iv_spd,
					iv_total: pokemon.iv_total,
					nickname: pokemon.nickname,
					favorite: pokemon.favorite,
					held_item: pokemon.held_item,
					moves: pokemon.moves,
					has_color: pokemon.has_color,
					color: pokemon.color,
				});
				return msg.reply(
					// @ts-ignore
					`Pokedex ID - *${respokemon.idx}*\n\nId - *${respokemon.species_id}*\nName - *${client.data.findSpeciesByNumber(respokemon.species_id).slug}*\nTypes - *${client.data.findSpeciesByNumber(respokemon.species_id).types}*\nLevel - *${respokemon.level}*\nNature - *${respokemon.nature}*\nXP - *${respokemon.xp}*\nHP - *${pokemon2.max_hp}*\nAttack - *${pokemon2.atk}*\nDefense - *${pokemon2.defn}*\nSpeed - *${pokemon2.spd}*\nStats percentage - ${parseInt(pokemon2.ivPercentage * 100)}%\nMoves :-\n  -> *${cp(client.data.moveByNumber(respokemon.moves[0]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[1])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[2])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[3])?.slug) || null}* \n\nShowing [1/${res.length}] pokemon`
				);
			}
		}

		if (args[0] && !isNaN(args[0])) {
			const res = await pokemonschema.find({ owner_id: member.number });
			if (!res) {
				return msg.reply(
					`You don't have any pokemon! Do ${process.env.PHONE} pick to select a starter pokemon`
				);
			}

			const respokemon = res[args[0] - 1] || res[0];
			const pokemon = res[args[0] - 1] || res[0];
			const pokemon2 = new PokemonBase({
				id: pokemon.id,
				timestamp: pokemon.timestamp,
				owner_id: pokemon.owner_id,
				idx: pokemon.idx,
				species_id: pokemon.species_id,
				level: pokemon.level,
				xp: pokemon.xp,
				nature: pokemon.nature,
				shiny: pokemon.shiny,
				iv_hp: pokemon.iv_hp,
				iv_atk: pokemon.iv_atk,
				iv_defn: pokemon.iv_defn,
				iv_satk: pokemon.iv_satk,
				iv_sdef: pokemon.iv_sdef,
				iv_spd: pokemon.iv_spd,
				iv_total: pokemon.iv_total,
				nickname: pokemon.nickname,
				favorite: pokemon.favorite,
				held_item: pokemon.held_item,
				moves: pokemon.moves,
				has_color: pokemon.has_color,
				color: pokemon.color,
			});
			return msg.reply(
				// @ts-ignore
				`Pokedex ID - *${respokemon.idx}*\n\nId - *${respokemon.species_id}*\nName - *${client.data.findSpeciesByNumber(respokemon.species_id).slug}*\nTypes - *${client.data.findSpeciesByNumber(respokemon.species_id).types}*\nLevel - *${respokemon.level}*\nNature - *${respokemon.nature}*\nXP - *${respokemon.xp}*\nHP - *${pokemon2.max_hp}*\nAttack - *${pokemon2.atk}*\nDefense - *${pokemon2.defn}*\nSpeed - *${pokemon2.spd}*\nStats percentage - ${parseInt(pokemon2.ivPercentage * 100)}%\nMoves :-\n  -> *${cp(client.data.moveByNumber(respokemon.moves[0]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[1])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[2])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[3])?.slug) || null}* \n\nShowing [${args[0]}/${res.length}] pokemon`
			);
		}
	}

	const res = await pokemonschema.find({ owner_id: member.number });
	if (!res || res.length == 0) {
		return msg.reply(
			`You don't have any pokemon! Do @${process.env.PHONE} pick to select a starter pokemon`
		);
	}

	const respokemon = res[0];
	const pokemon = res[0];
	const pokemon2 = new PokemonBase({
		id: pokemon.id,
		timestamp: pokemon.timestamp,
		owner_id: pokemon.owner_id,
		idx: pokemon.idx,
		species_id: pokemon.species_id,
		level: pokemon.level,
		xp: pokemon.xp,
		nature: pokemon.nature,
		shiny: pokemon.shiny,
		iv_hp: pokemon.iv_hp,
		iv_atk: pokemon.iv_atk,
		iv_defn: pokemon.iv_defn,
		iv_satk: pokemon.iv_satk,
		iv_sdef: pokemon.iv_sdef,
		iv_spd: pokemon.iv_spd,
		iv_total: pokemon.iv_total,
		nickname: pokemon.nickname,
		favorite: pokemon.favorite,
		held_item: pokemon.held_item,
		moves: pokemon.moves,
		has_color: pokemon.has_color,
		color: pokemon.color,
	});
	return msg.reply(
		// @ts-ignore
		`Pokedex ID - *${respokemon.idx}*\n\nId - *${respokemon.species_id}*\nName - *${client.data.findSpeciesByNumber(respokemon.species_id).slug}*\nTypes - *${client.data.findSpeciesByNumber(respokemon.species_id).types}*\nLevel - *${respokemon.level}*\nNature - *${respokemon.nature}*\nXP - *${respokemon.xp}*\nHP - *${pokemon2.max_hp}*\nAttack - *${pokemon2.atk}*\nDefense - *${pokemon2.defn}*\nSpeed - *${pokemon2.spd}*\nStats percentage - ${parseInt(pokemon2.ivPercentage * 100)}%\nMoves :-\n  -> *${cp(client.data.moveByNumber(respokemon.moves[0]).slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[1])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[2])?.slug) || null}*\n  -> *${cp(client.data.moveByNumber(respokemon.moves[3])?.slug) || null}* \n\nShowing [1/${res.length}] pokemon`
	);
}

function cp(string: string) {
	try {
		return string.charAt(0).toUpperCase() + string.slice(1);
	} catch {
		return 'No move';
	}
}
