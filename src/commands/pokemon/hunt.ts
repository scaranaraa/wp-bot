import pkg from 'whatsapp-web.js';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import puppeteer from 'puppeteer';
import constants from '../../pokedex/constants.js';
import { pokemonschema, PokemonBase } from '../../models/mongoa.js';
import baseuser from '../../models/baseuser.js';
import { type Move, StatStages } from '../../pokedex/models.js';
import { type BattleBase, type TrainerBase } from '../../types/pokemontypes.js';

const { Client, LocalAuth, MessageMedia } = pkg;

class Trainer implements TrainerBase {
	constructor(user: baseuser, client: pkg.Client, pokemon: PokemonBase[]) {
		this.user = user;
		this.pokemon = pokemon || [];
		this.selected = pokemon[0];
		this.selected_idx = 0;
		this.done = false;
		this.client = client;
	}

	user: baseuser;

	pokemon: PokemonBase[];

	selected: PokemonBase;

	selected_idx: number;

	done: boolean;

	client: pkg.Client;

	get selectedd() {
		if (this.selected_idx === -1) {
			return null;
		}

		return this.pokemon[this.selected_idx];
	}
}

class Battle implements BattleBase {
	constructor(
		user1: TrainerBase,
		user2: TrainerBase,
		client: pkg.Client,
		channel: string
	) {
		this.turn = [user2, user1];
		this.trainers = [user1, user2];
		this.channel = channel;
		this.passed_turns = 0;
		this.client = client;
	}

	turn: TrainerBase[];

	trainers: TrainerBase[];

	channel: string;

	passed_turns: number;

	client: pkg.Client;

	betamount: number;

	async sendBattle(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async send_battle() {
		this.turn.push(this.turn.shift());
		const app = express();
		app.set('view engine', 'ejs');
		app.set('views','./src/pokedex')
		app.use((req, res, next) => {
			res.setHeader(
				'Cache-Control',
				'no-store, no-cache, must-revalidate, private'
			);
			res.setHeader('Expires', '0');
			res.setHeader('Pragma', 'no-cache');
			next();
		});
		const serveStatic = express.static;
		app.use(serveStatic('./src/commands/pokemon/public'));
		let res = '';
		res += `@${this.trainers[0].user.userId}'s Team`;
		for (let i = 0; i < this.trainers[0].pokemon.length; i++) {
			const p = this.trainers[0].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		res += '\n\n\n';
		res += "Opponent's Team";
		for (let i = 0; i < this.trainers[1].pokemon.length; i++) {
			const p = this.trainers[1].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		let avail = this.trainers[0].selected.moves;
		for (let i = 0; i < avail.length; i++) {
			if (!avail[i]) {
				avail.splice(i, 1);
				i--;
			}
		}

		// shuffleArray(avail)
		avail = avail.slice(0, 4);
		const movenames: string[] = [];
		for (let i = 0; i < avail.length; i++) {
			movenames.push(cp(this.client.data.moveByNumber(avail[i]).name));
		}

		const serv = app.listen(3000, () => {});
		app.get('/', (req, res) => {
			let data;
			data = {
				opponentPokemonSrc: `sprites\\front\\${this.trainers[1].selected.species.id}.png`,
				userPokemonSrc: `sprites\\back\\${this.trainers[0].selected.species.id}.png`,
				opponentName: `${cp(this.trainers[1].selected.species.slug)}`,
				userName: `${cp(this.trainers[0].selected.species.slug)}`,
				opponentHP: `${this.trainers[1].selected.hp}`,
				opponentMAXHP: `${this.trainers[1].selected.max_hp}`,
				userHP: `${this.trainers[0].selected.hp}`,
				userMAXHP: `${this.trainers[0].selected.max_hp}`,
				attacks: [
					{ name: `${movenames[0]}`, remaining: 1 },
					{ name: `${movenames[1]}`, remaining: 2 },
					{ name: `${movenames[2]}`, remaining: 3 },
					{ name: `${movenames[3]}`, remaining: 4 },
				],
			};
			res.render('index', data);
		});
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setViewport({ width: 850, height: 500 });
		const website_url = 'http://localhost:3000';
		await page.goto(website_url);
		await page.setCacheEnabled(false);
		await page.screenshot({
			path: './src/commands/utils/screenshot.png',
		});
		await browser.close();
		await serv.close();
		const media = MessageMedia.fromFilePath(
			'./src/commands/utils/screenshot.png'
		);
		await this.client.sendMessage(this.channel, media);
		if (this.turn[0].user) {
			await this.send_moves(avail);
		} else {
			setTimeout(async () => {
				await this.send_opponentmove();
			}, 5000);
		}
	}

	async send_moves(avail: string[]) {
		let res = '';
		res += `@${this.trainers[0].user.userId}'s Team`;
		for (let i = 0; i < this.trainers[0].pokemon.length; i++) {
			const p = this.trainers[0].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		res += '\n\n\n';
		res += "Opponent's Team";
		for (let i = 0; i < this.trainers[1].pokemon.length; i++) {
			const p = this.trainers[1].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		await this.client.sendMessage(this.channel, res);
		let done = false;
		const bat = this;
		this.client.on('message_create', async function trial(msg) {
			if (done) {
				return;
			}

			const chat = await msg.getChat();
			const member = await msg.getContact();
			if (member.number != bat.trainers[0].user.userId) {
				return;
			}

			let res = msg.body.toLowerCase();
			if (res == 'quit') {
				bat.client.removeListener('message_create', trial);
				done = true;
				return;
			}

			if (res.startsWith('use ')) {
				res = res.slice(4);
				if (isNaN(parseInt(res))) {
					return msg.reply('Please enter a valid move number');
				}

				const nres: number = parseInt(res);
				if (bat.trainers[0].selected.hp <= 0) {
					return bat.client.sendMessage(
						bat.channel,
						`${cp(bat.trainers[0].selected.species.slug)} has fainted! Select a different pokemon`
					);
				}

				if (nres < 1 || nres > avail.length) {
					return msg.reply('Please enter a valid move number');
				}

				res = avail[nres - 1];
				bat.client.removeListener('message_create', trial);
				await bat.run_move(
					bat.client.data.moveByNumber(nres),
					bat.trainers[0],
					bat.trainers[1]
				);
				done = true;
				return;
			}

			if (res.startsWith('select ')) {
				res = res.slice(7);
				if (isNaN(parseInt(res))) {
					return msg.reply('Please enter a valid pokemon id');
				}

				const nres: number = parseInt(res);
				if (nres < 1 || nres > bat.trainers[0].pokemon.length) {
					return msg.reply('Please enter a valid pokemon id');
				}

				bat.trainers[0].selected = bat.trainers[0].pokemon[nres - 1];
				bat.client.removeListener('message_create', trial);
				await bat.send_battle();
				done = true;
			}
		});
	}

	async send_opponentmove() {
		const poke = this.trainers[1].selected;
		let avail = this.trainers[1].selected.moves;
		shuffleArray(avail);
		avail = avail.slice(3, avail.length);
		const movenames = [];
		for (let i = 0; i < avail.length; i++) {
			movenames.push(this.client.data.moveByNumber(avail[i]));
		}

		const randommove = movenames[Math.floor(Math.random() * movenames.length)];
		if (!randommove) {
			await this.game_over(true);
			return;
		}

		await this.run_move(randommove, this.trainers[1], this.trainers[0], true);
	}

	async run_move(
		move: Move,
		trainer: TrainerBase,
		opponent: TrainerBase,
		op = false
	) {
		if (op) {
			let res = '';
			for (const trainer1 of this.trainers) {
				if (!trainer1.selected.stages) {
					trainer1.selected.stages = new StatStages();
				}

				if (!trainer1.selected.ailments) {
					trainer1.selected.ailments = [];
				}

				// @ts-ignore
				if (trainer1.selected.ailments?.includes('Burn')) {
					trainer1.selected.hp -= (1 / 16) * trainer1.selected.max_hp;
				}

				// @ts-ignore
				if (trainer1.selected.ailments?.includes('Poison')) {
					trainer1.selected.hp -= (1 / 8) * trainer1.selected.max_hp;
				}
			}

			const result = move.calculate_turn(trainer.selected, opponent.selected);
			res += `${cp(trainer.selected.species.slug)} used ${cp(move.name)}!\n`;
			res += `It dealt ${result.damage} damage!\n ${result.messages}`;
			if (result.success) {
				opponent.selected.hp -= result.damage;
				trainer.selected.hp += result.healing;
				trainer.selected.hp = Math.min(
					trainer.selected.hp,
					trainer.selected.max_hp
				);
				if (result.healing > 0) {
					res += `\n${cp(trainer.selected.species.slug)} restored ${result.healing} HP!`;
				} else if (result.healing < 0) {
					res += `\n${cp(trainer.selected.species.slug)} took ${-result.healing} damage!`;
				}

				if (result.ailment && result.ailment != 'null') {
					res += `\n${cp(opponent.selected.species.slug)} is now affected by ${result.ailment}!`;
					// @ts-ignore
					opponent.selected.ailments.push(result.ailment);
				}

				for (const change of result.stat_changes) {
					let target;
					if (move.target_id === 7) {
						target = trainer.selected;
						if (change.change < 0) {
							res += `\nLowered opponent ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
						} else {
							res += `\nRaised opponent ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
						}
					} else {
						target = opponent.selected;
						if (change.change < 0) {
							res += `\nLowered user ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
						} else {
							res += `\nRaised user ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
						}
					}
				}
			} else {
				res += 'It missed!';
			}

			if (opponent.selected.hp <= 0) {
				res += `\n${cp(opponent.selected.species.slug)} fainted!`;
				let fainted = 0;
				for (let i = 0; i < opponent.pokemon.length; i++) {
					if (opponent.pokemon[i].hp < 0) {
						fainted += 1;
					}
				}

				if (fainted == opponent.pokemon.length) {
					await this.client.sendMessage(this.channel, res);
					await this.game_over(false);
					return;
				}
			}

			await this.client.sendMessage(this.channel, res);
			await this.send_battle();
			return;
		}

		if (this.trainers[0].selected.hp <= 0) {
			await this.client.sendMessage(
				this.channel,
				`${cp(this.trainers[0].selected.species.slug)} has fainted! Select a different pokemon`
			);
			this.send_moves(['1', '1', '1', '1']);
		} else {
			let res = '';
			for (const trainer1 of this.trainers) {
				if (!trainer1.selected.stages) {
					trainer1.selected.stages = new StatStages();
				}

				if (!trainer1.selected.ailments) {
					trainer1.selected.ailments = [];
				}

				// @ts-ignore
				if (trainer1.selected.ailments?.includes('Burn')) {
					trainer1.selected.hp -= (1 / 16) * trainer1.selected.max_hp;
				}

				// @ts-ignore
				if (trainer1.selected.ailments?.includes('Poison')) {
					trainer1.selected.hp -= (1 / 8) * trainer1.selected.max_hp;
				}
			}

			const result = move.calculate_turn(trainer.selected, opponent.selected);
			res += `@${cp(trainer.selected.species.slug)} used ${cp(move.name)}!\n`;
			res += `It dealt ${result.damage} damage!\n ${result.messages}`;
			if (result.success) {
				opponent.selected.hp -= result.damage;
				trainer.selected.hp += result.healing;
				trainer.selected.hp = Math.min(
					trainer.selected.hp,
					trainer.selected.max_hp
				);
				if (result.healing > 0) {
					res += `\n${cp(trainer.selected.species.slug)} restored ${result.healing} HP!`;
				} else if (result.healing < 0) {
					res += `\n${cp(trainer.selected.species.slug)} took ${-result.healing} damage!`;
				}

				if (result.ailment) {
					res += `\n${cp(opponent.selected.species.slug)} is now ${result.ailment}!`;
					// @ts-ignore
					opponent.selected.ailments.push(result.ailment);
				}

				for (const change of result.stat_changes) {
					let target;
					if (move.target_id === 7) {
						target = trainer.selected;
						if (change.change < 0) {
							res += `Lowered user ${constants.STAT_NAMES[change.stat]} by ${-change.change}`;
						} else {
							res += `Raised user ${constants.STAT_NAMES[change.stat]} by ${-change.change}`;
						}
					} else {
						target = opponent.selected;
						if (change.change < 0) {
							res += `Lowered opponent ${constants.STAT_NAMES[change.stat]} by ${-change.change}`;
						} else {
							res += `Raised opponent ${constants.STAT_NAMES[change.stat]} by ${-change.change}`;
						}
					}
				}
			} else {
				res += 'It missed!';
			}

			if (opponent.selected.hp <= 0) {
				await this.client.sendMessage(this.channel, res);
				res += `\n${cp(opponent.selected.species.slug)} fainted!`;
				await this.game_over(true);
				return;
			}

			await this.client.sendMessage(this.channel, res);
			await this.send_battle();
		}
	}

	async game_over(winner: boolean | TrainerBase) {
		if (winner) {
			const poke = this.trainers[1].pokemon[0];
			const ivs = [
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
			];
			const newlevel = random_iv();
			const givepokemon = new pokemonschema({
				id: poke.id,
				owner_id: this.trainers[0].user.userId,
				idx: this.trainers[0].user.getidx(),
				species_id: poke.species_id,
				level: newlevel,
				xp: 0,
				nature: poke.nature,
				shiny: false,
				iv_hp: ivs[0],
				iv_atk: ivs[1],
				iv_defn: ivs[2],
				iv_satk: ivs[3],
				iv_sdef: ivs[4],
				iv_spd: ivs[5],
				iv_total: ivs.reduce((a, b) => a + b),
				moves: poke.moves,
			});
			await givepokemon.save();
			this.client.battling = false;
			this.trainers[0].user.addpokemon(poke.id, poke.species.slug);
			await this.client.sendMessage(
				this.channel,
				`You caught a new ${cp(poke.species.slug)}!`
			);
		} else {
			const poke = this.trainers[1].pokemon[0];
			this.client.battling = false;
			await this.client.sendMessage(
				this.channel,
				`${cp(poke.species.slug)} ran away!`
			);
		}
	}
}

export const name = 'hunt';
export const args = true;
export const aliases = ['catch'];
export const description = 'Hunt for new pokemon';
export const category = 'Pokemon';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	let leg = '';
	if (args.includes('legendary')) {
		leg = 'legendary';
	} else if (args.includes('mythical')) {
		leg = 'mythical';
	} else if (args.includes('ultra')) {
		leg = 'ultra_beast';
	}

	if (client.battling) {
		return;
	}

	client.battling = true;
	const member = await msg.getContact();
	const chat = await msg.getChat();
	let spawned = client.data.randomSpawn();
	if (leg) {
		spawned = client.data.randomSpawn(leg);
	}

	const media = MessageMedia.fromFilePath(
		`./src/commands/pokemon/images2/${spawned.id}.png`
	);
	let done = false;
	client.on('message_create', async function trial(msg) {
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			client.battling = false;
			await client.sendMessage(
				chat.id._serialized,
				`${cp(client.data.findSpeciesByNumber(spawned.id).slug)} ran away!`
			);
			client.removeListener('message_create', trial);
		}, 10000);
		if (msg.body.toLowerCase() === 'catch' && !done) {
			const u = await msg.getContact();
			if (u.number != member.number) {
				return;
			}

			done = true;
			client.removeListener('message_create', trial);
			const ivs = [
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
				random_iv(),
			];
			const newlevel = random_iv();
			let { moves } = spawned;
			shuffleArray(moves);
			const randomuid = uuidv4();
			moves = moves.slice(0, 4);
			for (let i = 0; i < moves.length; i++) {
				moves[i] = moves[i].move_id;
			}

			let user = new baseuser({
				userId: member.number,
				users: client.cachedUsers,
			});
			const battlepokemon = await user.getselectedpokemon();
			const gotpokemon = [];
			let userlevels = 0;
			if (!battlepokemon || battlepokemon.length == 0) {
				client.battling = false;
				return msg.reply(
					'You need atleast 1 selected pokemon to start a battle'
				);
			}

			for (let i = 0; i < battlepokemon.length; i++) {
				const pokemon = await pokemonschema.findOne({
					owner_id: member.number,
					id: battlepokemon[i],
				});
				if (pokemon.level > userlevels) {
					userlevels = pokemon.level;
				}

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
				pokemon2.stages = new StatStages();
				pokemon2.ailments = [];
				gotpokemon.push(pokemon2);
			}

			let opponentpokemon = new PokemonBase({
				id: randomuid,
				timestamp: Date.now(),
				owner_id: 'xx',
				idx: 0,
				species_id: spawned.id,
				level: userlevels,
				xp: 0,
				nature:
					constants.NATURES[
						Math.floor(Math.random() * constants.NATURES.length)
					],
				shiny: false,
				iv_hp: 28,
				iv_atk: 28,
				iv_defn: 28,
				iv_satk: 28,
				iv_sdef: 28,
				iv_spd: 28,
				iv_total: ivs.reduce((a, b) => a + b, 0),
				nickname: null,
				favorite: false,
				held_item: null,
				moves,
				has_color: false,
				color: null,
			});
			opponentpokemon.stages = new StatStages();
			opponentpokemon.ailments = [];
			const trainer = new Trainer(user, client, gotpokemon);
			const opponent = new Trainer(null, client, [opponentpokemon]);
			opponentpokemon = null;
			user = null;
			const battle = new Battle(trainer, opponent, client, chat.id._serialized);
			client.battling = true;
			await battle.send_battle();
		}
	});
	await client.sendMessage(chat.id._serialized, media, {
		caption: `A wild ${cp(client.data.findSpeciesByNumber(spawned.id).slug)} appeared!\n Type *catch* to try and catch it!`,
	});
}

function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function random_iv() {
	return Math.floor(Math.random() * 32);
}
