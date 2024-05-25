/**
 * Initializes the WhatsApp bot, including commands, handlers, events, and configuration.
 *
 * sets up the bot's core functionality, loads commands and events, configures 
 * prefixes, initializes external libraries, and sets up various 
 * properties and methods on the `client` object.  
 * 
 * **Other things:** 
 * - Setting up game-related properties and queues. 
 * - `checkpokemon` function for handling Pokemon level-ups and evolutions
 */

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

/**
 * @memberof Client
 * @name commands
 * @type {Map<string, any>}
 * @description Map of commands loaded to the client
*/
client.commands = new Map();

/**
 * @memberof Client
 * @name handlers
 * @type {Map<string, any>}
 * @description Map of handlers loaded to the client
*/
client.handlers = new Map();

/**
 * @memberof Client
 * @name events
 * @type {Map<string, any>}
 * @description Map of events loaded to the client
*/
client.events = new Map();

/**
 * @memberof Client
 * @name aliases
 * @type {Map<string, any>}
 * @description Map of command aliases loaded to the client
*/
client.aliases = new Map();

/**
 * @memberof Client
 * @name muted
 * @type {string[]}
 * @description List of muted members
*/
client.muted = [];

/**
 * @memberof Client
 * @name mgames
 * @type {Map<string, MGame>}
 * @description Map of ongoing monopoly games
*/
client.mgames = new Map();

/**
 * @memberof Client
 * @name sydneyqueue
 * @description Queue messages to be sent to sydney to avoid crash
 * @deprecated
*/
client.sydneyqueue = [];

/**
 * @memberof Client
 * @name prefix
 * @type {string}
 * @description Main prefix for the bot
*/
client.prefix = `@${process.env.PHONE} `;

/**
 * @memberof Client
 * @name s_prefix
 * @type {string[]}
 * @description List of secondary prefixes for the bot
*/
client.s_prefix = ['$','/','?','-','&','*','>',',','.','£','₹','¢','√','π','%','©','®','™','✓','§','∆','pls'];

/**
 * @memberof Client
 * @name prefix2
 * @type {string}
 * @description Prefix for uno bot
*/
client.prefix2 = 'uno';

/**
 * @memberof Client
 * @name gartic
 * @type {boolean}
 * @description Indicates whether a gartic game is ongoing
*/
client.gartic = false;

/**
 * @memberof Client
 * @name gameManager
 * @type {GameManager}
 * @description Manager for uno games
*/
client.gameManager = new GameManager(client);

/**
 * @memberof Client
 * @name commands2
 * @description Loaded uno commands
*/
client.commands2 = {};

/**
 * @memberof Client
 * @name commandMap
 * @description Loaded uno commands
*/
client.commandMap = {};

/**
 * @memberof Client
 * @name getCommand
 * @description Retrieves UNO commands
*/
client.getCommand = function (name: string) {
	const commandName = this.commandMap[name];
	return this.commands2[commandName];
};

/**
 * @memberof Client
 * @name shazam
 * @type {Shazam}
 * @description Shazam client for song recognition
*/
client.shazam = new Shazam();

/**
 * @memberof Client
 * @name loadCommands
 * @description Loads UNO commands
*/
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

/**
 * @memberof Client
 * @name games
 * @description Map of UNO commands
*/
client.games = {};

/**
 * @memberof Client
 * @name getrules
 * @description Get UNO rules
*/
client.getrules = function () {
	return rules;
};

/**
 * @memberof Client
 * @name getruleKeys
 * @description Get UNO rules
*/
client.getruleKeys = function () {
	return ruleKeys;
};

/**
 * @memberof Client
 * @name getruleset
 * @description Get UNO rules
*/
client.getruleset = function () {
	const obj: Ruleset = {};
	for (const key of Object.keys(rules)) {
		obj[key] = rules[key].value;
	}

	return obj;
};

/**
 * @memberof Client
 * @name snipe
 * @type {string[]}
 * @description Stores list of deleted/edited messages to be used by snipe command
*/
client.snipe = [];

/**
 * @memberof Client
 * @name downloading
 * @type {boolean}
 * @description Prevent parallel downloads by yt command
*/
client.downloading = false;

// very badly optimized not worth it
// client.character = 'Leon Kennedy'

/**
 * @memberof Client
 * @name ingame
 * @type {boolean}
 * @description Prevent parallel games in chats
 * @todo Unnecesarry, allow games in different channels
*/
client.ingame = false;
client.ind = false;

/**
 * @memberof Client
 * @name cachedUsers
 * @type {Map<string,BaseUserType>}
 * @description Map of users cached by the bot
*/
client.cachedUsers = new Map();

/**
 * @memberof Client
 * @name battling
 * @type {boolean}
 * @description Prevent parallel pokemon battles
 * @todo Unnecesarry, allow parallel games in seperate chats
*/
client.battling = false;

/**
 * @memberof Client
 * @name data
 * @type {DataManager}
 * @description Base Pokedex for the bot
*/
client.data = new DataManager();

/**
 * @memberof Client
 * @name checkpokemon
 * @type {Function}
 * @description Function to check and level up pokemon basedo n xp
*/
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
				//@ts-ignore
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

if(process.env.CHROME_PATH == ""){
	console.log("CHROME_PATH not given, chromium will be used. Trying to send videos/gifs will throw an error")
}

/**
 * @memberof Client
 * @name curr
 * @type {Function}
 * @description Function to fetch cached users
*/
client.curr = function (userId: string) {
	return new curr({ userId, users: client.cachedUsers });
};

function cp(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
