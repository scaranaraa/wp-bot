/*
    "Generation I (Kanto)": ("Bulbasaur", "Charmander", "Squirtle"),
    "Generation II (Johto)": ("Chikorita", "Cyndaquil", "Totodile"),
    "Generation III (Hoenn)": ("Treecko", "Torchic", "Mudkip"), */
import { v4 as uuidv4 } from 'uuid';
import pkg from 'whatsapp-web.js';
import { NATURES } from '../../pokedex/constants2.js';
import { pokemonschema, calcStat } from '../../models/mongoa.js';
import baseuser from '../../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;
const starters = [
	'BULBASAUR',
	'CHARMANDER',
	'SQUIRTLE',
	'CHIKORITA',
	'CYNDAQUIL',
	'TOTODILE',
	'TREECKO',
	'TORCHIC',
	'MUDKIP',
];
export const name = 'pick';
export const args = true;
export const aliases = ['choose'];
export const description = 'Pick your starter pokemon';
export const category = 'Pokemon';
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
	const has = await user.getstarter();
	if (has) {
		return;
	}

	const chat = await msg.getChat();
	if (args.length == 0) {
		await msg.reply(
			'Select a starter pokemon! \n\nGeneration I (Kanto):  (Bulbasaur, Charmander, Squirtle)\nGeneration II (Johto): (Chikorita, Cyndaquil, Totodile)\nGeneration III (Hoenn): (Treecko, Torchic, Mudkip) \n\n Run pick <POKEMON> to permanently choose a starter pokemon'
		);
		return;
	}

	function random_iv() {
		return Math.floor(Math.random() * 32);
	}

	const pokemon = args.join('').toUpperCase();
	if (!starters.includes(pokemon)) {
		return;
	}

	const ivs = [
		random_iv(),
		random_iv(),
		random_iv(),
		random_iv(),
		random_iv(),
		random_iv(),
	];
	let { moves } = client.data.speciesByName(pokemon);
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
		species_id: client.data.speciesByName(pokemon).id,
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
	user.setstarter();
	user.addpokemon(randomuid, client.data.speciesByName(pokemon).slug);
	msg.reply(`You have chosen ${pokemon}!\n
Level - *${newlevel}*
HP - *${ivs[0]}*
Attack - *${ivs[1]}*
Defense - *${ivs[2]}*
Speed - *${ivs[5]}*
Moves :- 
-> *${capitalizeFirstLetter(client.data.moveByNumber(moves[0]).slug)}*
-> *${capitalizeFirstLetter(client.data.moveByNumber(moves[1]).slug)}*
-> *${capitalizeFirstLetter(client.data.moveByNumber(moves[2]).slug)}*
-> *${capitalizeFirstLetter(client.data.moveByNumber(moves[3]).slug)}*`);
}

/* class PokemonBase {
   constructor(data) {
      this.id = data.id || 'null'
      this.timestamp = data.timestamp || new Date();
      this.owner_id = data.owner_id;
      this.idx = data.idx;
      this.species_id = data.species_id;
      this.level = data.level;
      this.xp = data.xp;
      this.nature = data.nature;
      this.shiny = data.shiny;
      this.iv_hp = data.iv_hp;
      this.iv_atk = data.iv_atk;
      this.iv_defn = data.iv_defn;
      this.iv_satk = data.iv_satk;
      this.iv_sdef = data.iv_sdef;
      this.iv_spd = data.iv_spd;

      this.iv_total = data.iv_total;

      // Customization
      this.nickname = data.nickname || null;
      this.favorite = data.favorite || false;
      this.held_item = data.held_item || null;
      this.moves = data.moves || [];
      this.has_color = data.has_color || false;
      this.color = data.color || null;

      this._hp = null;
      this.ailments = null;
      this.stages = null;
      this.findOrCreate()
    } */ function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
