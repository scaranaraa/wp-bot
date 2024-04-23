import pkg from 'whatsapp-web.js';
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
}

class Battle implements BattleBase {
	constructor(
		user1: Trainer,
		user2: Trainer,
		client: pkg.Client,
		channel: string,
		betamount: number
	) {
		this.turn = [user2, user1];
		this.trainers = [user1, user2];
		this.channel = channel;
		this.passed_turns = 0;
		this.client = client;
		this.betamount = betamount;
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
		res += `@${this.turn[0].user.userId}'s Team`;
		for (let i = 0; i < this.turn[0].pokemon.length; i++) {
			const p = this.turn[0].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		res += '\n\n\n';
		res += `@${this.turn[1].user.userId}'s Team`;
		for (let i = 0; i < this.turn[1].pokemon.length; i++) {
			const p = this.turn[1].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		let avail = this.turn[0].selected.moves;
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
				opponentPokemonSrc: `sprites\\front\\${this.turn[1].selected.species.id}.png`,
				userPokemonSrc: `sprites\\back\\${this.turn[0].selected.species.id}.png`,
				opponentName: `${cp(this.turn[1].selected.species.slug)}`,
				userName: `${cp(this.turn[0].selected.species.slug)}`,
				opponentHP: `${this.turn[1].selected.hp}`,
				opponentMAXHP: `${this.turn[1].selected.max_hp}`,
				userHP: `${this.turn[0].selected.hp}`,
				userMAXHP: `${this.turn[0].selected.max_hp}`,
				attacks: [
					{ name: `${movenames[0]}`, remaining: 1 },
					{ name: `${movenames[1]}`, remaining: 2 },
					{ name: `${movenames[2]}`, remaining: 3 },
					{ name: `${movenames[3]}`, remaining: 4 },
				],
			};
			res.render('index', data);
		});
		const browser = await puppeteer.launch();
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
		await this.send_moves(avail);
	}

	async send_moves(avail: string[]) {
		let res = '';
		res += `@${this.turn[0].user.userId}'s Team`;
		for (let i = 0; i < this.turn[0].pokemon.length; i++) {
			const p = this.turn[0].pokemon[i];
			res += `\n${i + 1}. ${cp(p.species.slug)}  ${p.hp}/${p.max_hp}`;
		}

		res += '\n\n\n';
		res += `@${this.turn[1].user.userId}'s Team`;
		for (let i = 0; i < this.turn[1].pokemon.length; i++) {
			const p = this.turn[1].pokemon[i];
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
			if (member.number != bat.turn[0].user.userId) {
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
				if (bat.turn[0].selected.hp <= 0) {
					return bat.client.sendMessage(
						bat.channel,
						`${cp(bat.turn[0].selected.species.slug)} has fainted! Select a different pokemon`
					);
				}

				if (nres < 1 || nres > avail.length) {
					return msg.reply('Please enter a valid move number');
				}

				res = avail[nres - 1];
				bat.client.removeListener('message_create', trial);
				await bat.run_move(
					bat.client.data.moveByNumber(nres),
					bat.turn[0],
					bat.turn[1]
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
				if (nres < 1 || nres > bat.turn[0].pokemon.length) {
					return msg.reply('Please enter a valid pokemon id');
				}

				bat.turn[0].selected = bat.turn[0].pokemon[nres - 1];
				bat.client.removeListener('message_create', trial);
				await bat.send_battle();
				done = true;
			}
		});
	}

	async run_move(
		move: Move,
		trainer: TrainerBase,
		opponent: TrainerBase,
		op = false
	) {
		if (trainer.selected.hp <= 0) {
			await this.client.sendMessage(
				this.channel,
				`${cp(trainer.selected.species.slug)} has fainted! Select a different pokemon`
			);
			this.send_moves(['a', 'a', 'a', 'a']);
		}

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
						res += `\nLowered user ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
					} else {
						res += `\nRaised user ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
					}
				} else {
					target = opponent.selected;
					if (change.change < 0) {
						res += `\nLowered opponent ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
					} else {
						res += `\nRaised opponent ${constants.STAT_NAMES[change.stat]} by ${change.change}`;
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
				await this.game_over(trainer, opponent);
				return;
			}
		}

		await this.client.sendMessage(this.channel, res);
		await this.send_battle();
	}

	async game_over(winner: TrainerBase, loser: TrainerBase) {
		this.client.battling = false;
		let res = `@${winner.user.userId} won!`;
		if (this.betamount > 0) {
			res += `\nYou won ${this.betamount} coins!`;
		}

		winner.user.addCoins(this.betamount);
		loser.user.removeCoins(this.betamount);
		await this.client.sendMessage(this.channel, res);
	}
}

export const name = 'fight';
export const args = true;
export const aliases: string[] = [];
export const description = 'Fight someone using your pokemon';
export const category = 'Pokemon';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (client.battling) {
		return;
	}

	client.battling = true;
	const member = await msg.getContact();
	const chat = await msg.getChat();
	const mentions = await msg.getMentions();
	if (mentions.length == 0) {
		client.battling = false;
		return msg.reply('Please mention a user to fight');
	}

	let mentioneduser = mentions.pop();
	if (mentioneduser.number == member.number) {
		if (mentioneduser.number == `${process.env.PHONE}`) {
			if (mentions.length != 0) {
				mentioneduser = mentions.pop();
			}
		}

		client.battling = false;
		return msg.reply('You cannot fight yourself!');
	}

	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	});
	const opponent = new baseuser({
		userId: mentioneduser.number,
		users: client.cachedUsers,
	});
	let betamount = 0;
	if (!isNaN(parseInt(args[args.length - 1]))) {
		betamount = parseInt(args.pop());
		const userbal = user.getBalance();
		const opponentbal = opponent.getBalance();
		if (betamount > userbal || betamount > opponentbal) {
			client.battling = false;
			return msg.reply(
				'You cannot bet more than you or your opponents balance!'
			);
		}
	}

	let done = false;
	client.on('message_create', async function trial(msg) {
		setTimeout(async () => {
			if (done) {
				return;
			}

			done = true;
			client.battling = false;
			await msg.reply('Command timed out');
			client.removeListener('message_create', trial);
		}, 10000);
		if (msg.body.toLowerCase() === 'y' && !done) {
			const u = await msg.getContact();
			if (u.number != mentioneduser.number) {
				return;
			}

			done = true;
			client.removeListener('message_create', trial);
			const userbattlepokemon = await user.getselectedpokemon();
			const opponentbattlepokemon = await opponent.getselectedpokemon();
			const usergotpokemon = [];
			const opponentgotpokemon = [];
			if (
				!userbattlepokemon ||
				userbattlepokemon.length == 0 ||
				!opponentbattlepokemon ||
				opponentbattlepokemon.length == 0
			) {
				client.battling = false;
				return msg.reply(
					'You need atleast 1 selected pokemon to start a battle'
				);
			}

			for (let i = 0; i < userbattlepokemon.length; i++) {
				const pokemon = await pokemonschema.findOne({
					owner_id: member.number,
					id: userbattlepokemon[i],
				});
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
				usergotpokemon.push(pokemon2);
			}

			for (let i = 0; i < opponentbattlepokemon.length; i++) {
				const pokemon = await pokemonschema.findOne({
					owner_id: mentioneduser.number,
					id: opponentbattlepokemon[i],
				});
				const pokemon3 = new PokemonBase({
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
				pokemon3.stages = new StatStages();
				pokemon3.ailments = [];
				opponentgotpokemon.push(pokemon3);
			}

			const trainer = new Trainer(user, client, usergotpokemon);
			const opponenttrainer = new Trainer(opponent, client, opponentgotpokemon);
			const chance = Math.random();
			let battle;
			if (chance < 0.5) {
				battle = new Battle(
					trainer,
					opponenttrainer,
					client,
					chat.id._serialized,
					betamount
				);
			} else {
				battle = new Battle(
					opponenttrainer,
					trainer,
					client,
					chat.id._serialized,
					betamount
				);
			}

			client.battling = true;
			await battle.send_battle();
		}
	});
	await client.sendMessage(
		chat.id._serialized,
		`@${mentioneduser.number}\nDo you want to fight @${member.number} for ${betamount} coins? [Y/N]`
	);
}

function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function random_iv() {
	return Math.floor(Math.random() * 32);
}
