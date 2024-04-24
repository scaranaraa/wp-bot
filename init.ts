import { readdirSync } from 'fs';
import { Shazam } from 'node-shazam';
import { type Message, type Contact } from 'whatsapp-web.js';
import GameManager from './src/commands/unogame/Shard/GameManager.js';
import { rules, ruleKeys } from './src/commands/unogame/rules.js';
import client from './index.js';
import { PokemonBase, pokemonschema } from './src/models/mongoa.js';
import { type Ruleset } from './src/types/unotypes.js';
import DataManager from './src/pokedex/init.js';
import curr from './src/models/baseuser.js';

import('./src/commands/monopoly/monopoly.js');

client.commands = new Map();
client.handlers = new Map();
client.events = new Map();
client.aliases = new Map();
client.muted = [];
client.mgames = new Map();
client.sydneyqueue = [];
client.prefix = `@${process.env.PHONE} `;
client.s_prefix = [
	'$',
	'/',
	'?',
	'-',
	'&',
	'*',
	'>',
	',',
	'.',
	'£',
	'₹',
	'¢',
	'√',
	'π',
	'%',
	'©',
	'®',
	'™',
	'✓',
	'§',
	'∆',
];
client.prefix2 = 'uno';
client.gartic = false;
client.gameManager = new GameManager(client);
client.commands2 = {};
client.commandMap = {};

client.getCommand = function (name: string) {
	const commandName = this.commandMap[name];
	return this.commands2[commandName];
};

client.shazam = new Shazam();

client.loadCommands = async function () {
	const files = readdirSync('./dist/src/commands/unogame/Shard/commands/');
	for (const file of files) {
		if (file.endsWith('.js')) {
			const CommandModule = await import(
				`./src/commands/unogame/Shard/commands/${file}`
			);
			const Command = CommandModule.default;
			const command = new Command(this);
			this.commands2[command.name] = command;
			this.commandMap[command.name] = command.name;
			for (const alias of command.aliases) {
				this.commandMap[alias] = command.name;
			}
		}
	}
};

client.loadCommands();
client.games = {};
client.getrules = function () {
	return rules;
};

client.getruleKeys = function () {
	return ruleKeys;
};

client.getruleset = function () {
	const obj: Ruleset = {};
	for (const key of Object.keys(rules)) {
		obj[key] = rules[key].value;
	}

	return obj;
};

client.snipe = [];
client.downloading = false;

// very badly optimized not worth it
// client.character = 'Leon Kennedy'

client.ingame = false;
client.ind = false;
client.cachedUsers = new Map();
client.battling = false;
client.data = new DataManager();

client.checkpokemon = async function (
	msg: Message,
	member: Contact,
	pokemons: PokemonBase,
	selected: any
): Promise<void> {
	const pokemon: PokemonBase = new PokemonBase({
		id: pokemons.id,
		timestamp: pokemons.timestamp,
		owner_id: pokemons.owner_id,
		idx: pokemons.idx,
		species_id: pokemons.species_id,
		level: pokemons.level,
		xp: pokemons.xp,
		nature: pokemons.nature,
		shiny: pokemons.shiny,
		iv_hp: pokemons.iv_hp,
		iv_atk: pokemons.iv_atk,
		iv_defn: pokemons.iv_defn,
		iv_satk: pokemons.iv_satk,
		iv_sdef: pokemons.iv_sdef,
		iv_spd: pokemons.iv_spd,
		iv_total: pokemons.iv_total,
		nickname: pokemons.nickname,
		favorite: pokemons.favorite,
		held_item: pokemons.held_item,
		moves: pokemons.moves,
		has_color: pokemons.has_color,
		color: pokemons.color,
	});
	if (pokemon.xp >= pokemon.max_xp && pokemon.level < 100) {
		pokemon.level += 1;
		pokemon.xp = 0;
		await pokemonschema.updateOne(
			{ owner_id: member.number, id: selected },
			{
				$set: {
					level: pokemon.level,
				},
			}
		);
		await pokemonschema.updateOne(
			{ owner_id: member.number, id: selected },
			{
				$set: {
					xp: pokemon.xp,
				},
			}
		);
		await msg.reply(
			`Your ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)} levelled up!\n Its now level ${pokemon.level}`
		);
		if (pokemon.getNextEvolution()) {
			const evo = pokemon.getNextEvolution();
			if (!evo) {
				return;
			}

			const oldname: string = cp(
				client.data.findSpeciesByNumber(pokemon.species_id).slug
			);
			pokemon.species_id = evo.id;
			await msg.reply(
				`Your ${oldname} evolved into ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)}!`
			);
			await pokemonschema.updateOne(
				{ owner_id: member.number, id: selected },
				{
					$set: {
						species_id: pokemon.species_id,
					},
				}
			);
		} else {
			let res = `Your ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)} learnt these moves :-\n`;
			let flag = false;
			for (const move of pokemon.species.moves) {
				if (move?.method?.level == pokemon.level) {
					pokemon.moves.push(move.move_id);
					flag = true;
					res += `*${cp(client.data.moveByNumber(move.move_id)?.slug || 'broke here')}*\n`;
					await pokemonschema.updateOne(
						{ owner_id: member.number, id: selected },
						{
							$set: {
								moves: pokemon.moves,
							},
						}
					);
				}
			}

			if (flag) {
				await msg.reply(res);
			}
		}
	}
};

client.curr = function (userId: string) {
	return new curr({ userId, users: client.cachedUsers });
};

function cp(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
