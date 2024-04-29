import pkg from 'whatsapp-web.js';
import { v4 as uuidv4 } from 'uuid';
import { NATURES } from '../../pokedex/constants2.js';
import { pokemonschema } from '../../models/mongoa.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'use';
export const args = true;
export const aliases: string[] = [];
export const description = 'Use any item';
export const category = 'Pokemon';
/**
 * @memberof! Pokemon
 * @name use
 * @description
 * Allows users to use items from their inventory in the Pokemon game.
 *
 * This command handles item usage, including checking item availability, 
 * applying item effects (e.g., XP boosts, level-ups, Pokemon redemption), and 
 * updating the user's inventory and Pokemon data.
 *
 * **Usage:**
 * - `!use {item ID or name} [amount]` - Uses the specified item from the inventory.
 * 
 */ 
export async function run(client: pkg.Client, msg: pkg.Message, args: any[]) {
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	if (!args[0]) {
		return msg.reply('Please enter a item id or name');
	}

	let founditem;
	let amt = 1;
	if (!isNaN(args[args.length - 1])) {
		amt = parseInt(args[args.length - 1]);
		if (amt <= 0) {
			amt = 1;
		}

		args.pop();
	}

	if (!isNaN(args[0])) {
		founditem = client.data.itemByNumber(parseInt(args[0]));
		if (!founditem) {
			return msg.reply('Please enter a valid item id or name');
		}
	} else {
		founditem = client.data.itemByName(args.join(' ').toLowerCase());
		if (!founditem) {
			return msg.reply('Please enter a valid item id or name');
		}
	}

	const has = await user.getItemAmount(founditem.name);
	if (has < amt) {
		return msg.reply('You do not have this item!');
	}

	if (founditem.id == 10005) {
		await user.removeInv(founditem.name, amt);
	} else {
		await user.removeInv(founditem.name, 1);
	}

	if (founditem.id == 10001) {
		let boost = await user.getxpboost();
		// add 30 minutes
		if (!boost) {
			boost = Date.now() + 1800000;
		} else {
			boost += 1800000;
		}

		await user.setxpboost(boost);
		return msg.reply(
			`You gained 30 minutes of xpboost! \nIt will now end at ${new Date(boost).toLocaleString()}`
		);
	}

	if (founditem.id == 10002) {
		let boost = await user.getxpboost();
		// add 1 hour
		if (!boost) {
			boost = Date.now() + 3600000;
		} else {
			boost += 3600000;
		}

		await user.setxpboost(boost);
		return msg.reply(
			`You gained 1 hour of xpboost! \nIt will now end at ${new Date(boost).toLocaleString()}`
		);
	}

	if (founditem.id == 10003) {
		let boost = await user.getxpboost();
		// add 2 hours
		if (!boost) {
			boost = Date.now() + 7200000;
		} else {
			boost += 7200000;
		}

		await user.setxpboost(boost);
		return msg.reply(
			`You gained 2 hours of xpboost! \nIt will now end at ${new Date(boost).toLocaleString()}`
		);
	}

	if (founditem.id == 10004) {
		let boost = await user.getxpboost();
		// add 3 hours
		if (!boost) {
			boost = Date.now() + 10800000;
		} else {
			boost += 10800000;
		}

		await user.setxpboost(boost);
		return msg.reply(
			`You gained 3 hours of xpboost! \nIt will now end at ${new Date(boost).toLocaleString()}`
		);
	}

	if (founditem.id == 10005) {
		// level up a pokemon
		let done = false;
		await msg.reply(
			`Enter pokedex ID of the pokemon you want to level up ${amt} times`
		);
		let res: any = '';
		client.on('message_create', async function trial(msg) {
			if (!done) {
				const mem = await msg.getContact();
				if (mem.number != member.number) {
					return;
				}

				done = true;
				res = msg.body;
				if (isNaN(res)) {
					user.addInv('Rare Candy', amt);
					done = false;
					return msg.reply('Please enter a valid pokedex ID');
				}

				const pokemon = await pokemonschema.findOne({
					owner_id: member.number,
					idx: parseInt(res),
				});
				if (!pokemon) {
					user.addInv('Rare Candy', amt);
					done = false;
					return msg.reply('Please enter a valid pokedex ID');
				}

				pokemon.level += amt - 1;
				pokemon.xp = 99999999;
				if (pokemon.level >= 100) {
					pokemon.level = 99;
				}

				await pokemon.save();
				await client.checkpokemon(msg, mem, pokemon, pokemon.id);
				client.removeListener('message_create', trial);
			}
		});
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			user.addInv('Rare Candy', 1);
			return msg.reply('Command timed out');
		}, 10000);
	}

	if (founditem.id == 15002) {
		// get common pokemon
		let done = false;
		await msg.reply('Enter ID or Name of a common pokemon of your choice');
		let res: any = '';
		client.on('message_create', async function trial(msg) {
			if (!done) {
				const mem = await msg.getContact();
				if (msg.hasQuotedMsg) {
					return;
				}

				if (mem.number != member.number) {
					return;
				}

				done = true;
				res = msg.body;
				let foundpokemon;
				if (!isNaN(res)) {
					foundpokemon = await client.data.findSpeciesByNumber(parseInt(res));
					if (!foundpokemon) {
						done = false;
						user.addInv('Redeem Common', 1);
						return msg.reply('Please enter a valid Species ID');
					}
				} else {
					foundpokemon = await client.data.speciesByName(res);
					if (!foundpokemon) {
						console.log('hereh2');
						done = false;
						user.addInv('Redeem Common', 1);
						return msg.reply('Please enter a valid Species Name');
					}
				}

				if (!foundpokemon) {
					console.log('here');
					done = false;
					user.addInv('Redeem Common', 1);
					return msg.reply('Please enter a valid Species Name');
				}

				if (
					foundpokemon.mythical ||
					foundpokemon.legendary ||
					foundpokemon.ultra_beast
				) {
					user.addInv('Redeem Common', 1);
					done = false;
					return msg.reply('Please enter a valid Species Name');
				}

				const spawned = foundpokemon;
				const ivs = [
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
				];
				let { moves } = spawned;
				shuffleArray(moves);
				const randomuid = uuidv4();
				moves = moves.slice(0, 4);
				for (let i = 0; i < moves.length; i++) {
					moves[i] = moves[i].move_id;
				}

				const newlevel = random_iv();
				const starter = new pokemonschema({
					id: randomuid,
					owner_id: member.number,
					idx: user.getidx(),
					species_id: spawned.id,
					level: newlevel,
					xp: 0,
					nature: NATURES[Math.floor(Math.random() * NATURES.length)],
					shiny: false,
					iv_hp: ivs[0],
					iv_atk: ivs[1],
					iv_defn: ivs[2],
					iv_satk: ivs[3],
					iv_sdef: ivs[4],
					iv_spd: ivs[5],
					iv_total: ivs.reduce((a, b) => a + b, 0),
					moves,
				});
				await starter.save();
				user.addpokemon(randomuid, spawned.slug);
				await msg.reply(`You got a new pokemon! It's a *${cp(spawned.slug)}*!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${cp(client.data.moveByNumber(moves[0]).slug)}*
-> *${cp(client.data.moveByNumber(moves[1])?.slug)}*
-> *${cp(client.data.moveByNumber(moves[2])?.slug)}*
-> *${cp(client.data.moveByNumber(moves[3])?.slug)}*`);
				client.removeListener('message_create', trial);
			}
		});
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			user.addInv('Redeem Common', 1);
			return msg.reply('Command timed out');
		}, 10000);
	}

	if (founditem.id == 16002) {
		// get common pokemon
		let done = false;
		await msg.reply('Enter ID or Name of a mythical pokemon of your choice');
		let res: any = '';
		client.on('message_create', async function trial(msg) {
			if (!done) {
				const mem = await msg.getContact();
				if (msg.hasQuotedMsg) {
					return;
				}

				if (mem.number != member.number) {
					return;
				}

				done = true;
				res = msg.body;
				let foundpokemon;
				if (!isNaN(res)) {
					foundpokemon = await client.data.findSpeciesByNumber(parseInt(res));
					if (!foundpokemon) {
						done = false;
						user.addInv('Redeem Mythical', 1);
						return msg.reply('Please enter a valid Species ID');
					}
				} else {
					foundpokemon = await client.data.speciesByName(res);
					if (!foundpokemon) {
						console.log('hereh2');
						done = false;
						user.addInv('Redeem Mythical', 1);
						return msg.reply('Please enter a valid Species Name');
					}
				}

				if (!foundpokemon) {
					console.log('here');
					done = false;
					user.addInv('Redeem Mythical', 1);
					return msg.reply('Please enter a valid Species Name');
				}

				if (!foundpokemon.mythical) {
					user.addInv('Redeem Mythical', 1);
					done = false;
					return msg.reply('Please enter a valid Species Name');
				}

				const spawned = foundpokemon;
				const ivs = [
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
				];
				let { moves } = spawned;
				shuffleArray(moves);
				const randomuid = uuidv4();
				moves = moves.slice(0, 4);
				for (let i = 0; i < moves.length; i++) {
					moves[i] = moves[i].move_id;
				}

				const newlevel = random_iv();
				const starter = new pokemonschema({
					id: randomuid,
					owner_id: member.number,
					idx: user.getidx(),
					species_id: spawned.id,
					level: newlevel,
					xp: 0,
					nature: NATURES[Math.floor(Math.random() * NATURES.length)],
					shiny: false,
					iv_hp: ivs[0],
					iv_atk: ivs[1],
					iv_defn: ivs[2],
					iv_satk: ivs[3],
					iv_sdef: ivs[4],
					iv_spd: ivs[5],
					iv_total: ivs.reduce((a, b) => a + b, 0),
					moves,
				});
				await starter.save();
				user.addpokemon(randomuid, spawned.slug);
				await msg.reply(`You got a new pokemon! It's a *${cp(spawned.slug)}*!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${cp(client.data.moveByNumber(moves[0]).slug)}*
-> *${cp(client.data.moveByNumber(moves[1]).slug)}*
-> *${cp(client.data.moveByNumber(moves[2]).slug)}*
-> *${cp(client.data.moveByNumber(moves[3]).slug)}*`);
				client.removeListener('message_create', trial);
			}
		});
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			user.addInv('Redeem Mythical', 1);
			return msg.reply('Command timed out');
		}, 10000);
	}

	if (founditem.id == 16003) {
		// get common pokemon
		let done = false;
		await msg.reply('Enter ID or Name of a Legendary pokemon of your choice');
		let res: any = '';
		client.on('message_create', async function trial(msg) {
			if (!done) {
				const mem = await msg.getContact();
				if (msg.hasQuotedMsg) {
					return;
				}

				if (mem.number != member.number) {
					return;
				}

				done = true;
				res = msg.body;
				let foundpokemon;
				if (!isNaN(res)) {
					foundpokemon = await client.data.findSpeciesByNumber(parseInt(res));
					if (!foundpokemon) {
						done = false;
						user.addInv('Redeem Legendary', 1);
						return msg.reply('Please enter a valid Species ID');
					}
				} else {
					foundpokemon = await client.data.speciesByName(res);
					if (!foundpokemon) {
						console.log('hereh2');
						done = false;
						user.addInv('Redeem Legendary', 1);
						return msg.reply('Please enter a valid Species Name');
					}
				}

				if (!foundpokemon) {
					console.log('here');
					done = false;
					user.addInv('Redeem Legendary', 1);
					return msg.reply('Please enter a valid Species Name');
				}

				if (!foundpokemon.legendary) {
					user.addInv('Redeem Legendary', 1);
					done = false;
					return msg.reply('Please enter a valid Species Name');
				}

				const spawned = foundpokemon;
				const ivs = [
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
				];
				let { moves } = spawned;
				shuffleArray(moves);
				const randomuid = uuidv4();
				moves = moves.slice(0, 4);
				for (let i = 0; i < moves.length; i++) {
					moves[i] = moves[i].move_id;
				}

				const newlevel = random_iv();
				const starter = new pokemonschema({
					id: randomuid,
					owner_id: member.number,
					idx: user.getidx(),
					species_id: spawned.id,
					level: newlevel,
					xp: 0,
					nature: NATURES[Math.floor(Math.random() * NATURES.length)],
					shiny: false,
					iv_hp: ivs[0],
					iv_atk: ivs[1],
					iv_defn: ivs[2],
					iv_satk: ivs[3],
					iv_sdef: ivs[4],
					iv_spd: ivs[5],
					iv_total: ivs.reduce((a, b) => a + b, 0),
					moves,
				});
				await starter.save();
				user.addpokemon(randomuid, spawned.slug);
				await msg.reply(`You got a new pokemon! It's a *${cp(spawned.slug)}*!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${cp(client.data.moveByNumber(moves[0]).slug)}*
-> *${cp(client.data.moveByNumber(moves[1]).slug)}*
-> *${cp(client.data.moveByNumber(moves[2]).slug)}*
-> *${cp(client.data.moveByNumber(moves[3]).slug)}*`);
				client.removeListener('message_create', trial);
			}
		});
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			user.addInv('Redeem Legendary', 1);
			return msg.reply('Command timed out');
		}, 10000);
	}

	if (founditem.id == 16004) {
		// get common pokemon
		let done = false;
		await msg.reply('Enter ID or Name of a Ultra Beast pokemon of your choice');
		let res: any = '';
		client.on('message_create', async function trial(msg) {
			if (!done) {
				const mem = await msg.getContact();
				if (msg.hasQuotedMsg) {
					return;
				}

				if (mem.number != member.number) {
					return;
				}

				done = true;
				res = msg.body;
				let foundpokemon;
				if (!isNaN(res)) {
					foundpokemon = await client.data.findSpeciesByNumber(parseInt(res));
					if (!foundpokemon) {
						done = false;
						user.addInv('Redeem Ultra Beast', 1);
						return msg.reply('Please enter a valid Species ID');
					}
				} else {
					foundpokemon = await client.data.speciesByName(res);
					if (!foundpokemon) {
						console.log('hereh2');
						done = false;
						user.addInv('Redeem Ultra Beast', 1);
						return msg.reply('Please enter a valid Species Name');
					}
				}

				if (!foundpokemon) {
					console.log('here');
					done = false;
					user.addInv('Redeem Ultra Beast', 1);
					return msg.reply('Please enter a valid Species Name');
				}

				if (!foundpokemon.ultra_beast) {
					user.addInv('Redeem Ultra Beast', 1);
					done = false;
					return msg.reply('Please enter a valid Species Name');
				}

				const spawned = foundpokemon;
				const ivs = [
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
					random_iv(),
				];
				let { moves } = spawned;
				shuffleArray(moves);
				const randomuid = uuidv4();
				moves = moves.slice(0, 4);
				for (let i = 0; i < moves.length; i++) {
					moves[i] = moves[i].move_id;
				}

				const newlevel = random_iv();
				const starter = new pokemonschema({
					id: randomuid,
					owner_id: member.number,
					idx: user.getidx(),
					species_id: spawned.id,
					level: newlevel,
					xp: 0,
					nature: NATURES[Math.floor(Math.random() * NATURES.length)],
					shiny: false,
					iv_hp: ivs[0],
					iv_atk: ivs[1],
					iv_defn: ivs[2],
					iv_satk: ivs[3],
					iv_sdef: ivs[4],
					iv_spd: ivs[5],
					iv_total: ivs.reduce((a, b) => a + b, 0),
					moves,
				});
				await starter.save();
				user.addpokemon(randomuid, spawned.slug);
				await msg.reply(`You got a new pokemon! It's a *${cp(spawned.slug)}*!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${cp(client.data.moveByNumber(moves[0]).slug)}*
-> *${cp(client.data.moveByNumber(moves[1]).slug)}*
-> *${cp(client.data.moveByNumber(moves[2]).slug)}*
-> *${cp(client.data.moveByNumber(moves[3]).slug)}*`);
				client.removeListener('message_create', trial);
			}
		});
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			user.addInv('Redeem Ultra Beast', 1);
			return msg.reply('Command timed out');
		}, 10000);
	}

	if (founditem.id == 16001) {
		// get random pokemon
		const spawned = client.data.randomSpawn();
		const ivs = [
			random_iv(),
			random_iv(),
			random_iv(),
			random_iv(),
			random_iv(),
			random_iv(),
		];
		let { moves } = spawned;
		shuffleArray(moves);
		const randomuid = uuidv4();
		moves = moves.slice(0, 4);
		for (let i = 0; i < moves.length; i++) {
			moves[i] = moves[i].move_id;
		}

		const newlevel = random_iv();
		const starter = new pokemonschema({
			id: randomuid,
			owner_id: member.number,
			idx: user.getidx(),
			species_id: spawned.id,
			level: newlevel,
			xp: 0,
			nature: NATURES[Math.floor(Math.random() * NATURES.length)],
			shiny: false,
			iv_hp: ivs[0],
			iv_atk: ivs[1],
			iv_defn: ivs[2],
			iv_satk: ivs[3],
			iv_sdef: ivs[4],
			iv_spd: ivs[5],
			iv_total: ivs.reduce((a, b) => a + b, 0),
			moves,
		});
		await starter.save();
		user.addpokemon(randomuid, spawned.slug);
		await msg.reply(`You got a new *${cp(spawned.slug)}*!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${cp(client.data.moveByNumber(moves[0]).slug)}*
-> *${cp(client.data.moveByNumber(moves[1]).slug)}*
-> *${cp(client.data.moveByNumber(moves[2]).slug)}*
-> *${cp(client.data.moveByNumber(moves[3]).slug)}*`);
	}
}

function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function random_iv() {
	return Math.floor(Math.random() * 32);
}

function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
