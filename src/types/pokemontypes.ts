import { type Client } from 'whatsapp-web.js';
import {
	type DataManagerBase,
	type Evolution,
	type EvolutionList,
	type EvolutionTrigger,
	type Item,
	type Move,
	type MoveEffect,
	type MoveMeta,
	type MoveMethod,
	type MoveResult,
	type PokemonMove,
	type Species,
	type StatChange,
	type Stats,
	type StatStages,
} from '../pokedex/models.js';
import { type PokemonBase } from '../models/mongoa.js';
import type baseuser from '../models/baseuser.js';

export type StatsBase = {
	hp: number;
	atk: number;
	defn: number;
	satk: number;
	sdef: number;
	spd: number;
};

export type StatChangeBase = {
	stat_id: number;
	change: number;
	stat: string;
};

export type StatStagesBase = {
	hp: number;
	atk: number;
	defn: number;
	satk: number;
	sdef: number;
	spd: number;
	evasion: number;
	accuracy: number;
	crit: number;

	update(stages: StatStages): void;
};

export type SpeciesBase = {
	id: number;
	names: string[][];
	slug: string;
	base_stats: Stats;
	height: number;
	weight: number;
	dex_number: number;
	catchable: boolean;
	types: string[];
	abundance: number;
	gender_rate: number;
	has_gender_differences: boolean;
	description: string | undefined;
	mega_id: number | undefined;
	mega_x_id: number | undefined;
	mega_y_id: number | undefined;
	evolution_from: EvolutionList | undefined;
	evolution_to: EvolutionList | undefined;
	mythical: boolean;
	legendary: boolean;
	ultra_beast: boolean;
	event: boolean;
	is_form: boolean;
	form_item: number | undefined;
	region: string;
	art_credit: string | undefined;
	instance: DataManagerBase;
	moves: PokemonMove[] | [];
	name: string | undefined;

	toString(): string | undefined;

	moveset: Move[];
	mega: undefined | Species;
	mega_x: undefined | Species;
	mega_y: undefined | Species;

	correct_guesses: Array<string | string[]>;
	trade_evolutions: Evolution[];
	evolution_text: string | undefined;
};

export type EvolutionTriggerBase = Record<string, unknown>;

export type LevelTriggerBase = {
	level: number;
	item_id: number;
	move_id: number;
	move_type_id: number;
	time: number;
	relative_stats: number;
	instance: DataManagerBase;

	item: Item | undefined;
	move: Move | undefined;
	move_type: string | undefined;
	text: string;
} & EvolutionTriggerBase;

export type ItemTriggerBase = {
	item_id: number;
	instance: DataManagerBase;

	item: Item;
	text: string;
} & EvolutionTriggerBase;

export type TradeTriggerBase = {
	item_id: number | undefined;
	instance: DataManagerBase;

	item: Item | undefined;
	text: string;
} & EvolutionTriggerBase;

export type OtherTriggerBase = {
	instance: DataManagerBase;
	text: string;
} & EvolutionTriggerBase;

export type MoveEffectBase = {
	id: number;
	description: string;
	instance: DataManagerBase; // to change
	format(): string;
};

export type MoveMetaBase = {
	meta_category_id: number;
	meta_ailment_id: string;
	drain: number;
	healing: number;
	crit_rate: number;
	ailment_chance: number;
	flinch_chance: number;
	stat_chance: number;
	min_hits: number | undefined;
	max_hits: number | undefined;
	min_turns: number | undefined;
	max_turns: number | undefined;
	stat_changes: StatChange[] | [];
	meta_category: string;
	meta_ailment: string;
};

export type MoveResultBase = {
	success: boolean;
	damage: number;
	healing: number;
	ailment: string | undefined;
	messages: string[];
	stat_changes: StatChange[];
};

export type MoveBase = {
	id: number;
	slug: string;
	name: string;
	power: number;
	pp: number;
	accuracy: number;
	priority: number;
	target_id: number;
	type_id: number;
	damage_class_id: number;
	effect_id: number;
	effect_chance: number;
	meta: MoveMeta;
	effect: MoveEffect;
	instance: DataManagerBase;
	type: string | undefined;
	target_text: string | undefined;
	damage_class: string | undefined;
	description: string | undefined;

	calculate_turn(pokemon: PokemonBase, opponent: PokemonBase): MoveResult;
};

export type MoveMethodBase = {
	level?: number;
};

export type LevelMethodBase = {
	level: number;
	instance: any;
	text: string;
} & MoveMethodBase;

export type PokemonMoveBase = {
	move_id: number;
	method: MoveMethod;
	instance: DataManagerBase;
	move: Move;
	text: string;
};

export type ItemBase = {
	id: number;
	name: string;
	description: string;
	cost: number;
	page: number;
	action: string;
	inline: boolean;
	emote: string | undefined;
	shard: boolean;
	instance: DataManagerBase;

	toString(): string;
};

export type EvolutionBase = {
	target_id: number;
	trigger: EvolutionTrigger;
	type: boolean;
	instance: DataManagerBase;

	dir: string;
	target: Species;
	text: string;

	evolve_from(
		target: number,
		trigger: EvolutionTrigger,
		instance: DataManagerBase
	): Promise<Evolution>;

	evolve_to(
		target: number,
		trigger: EvolutionTrigger,
		instance: DataManagerBase
	): Promise<Evolution>;
};

export type EvolutionListBase = {
	items: Evolution[];
	text: string;
};

export type PokemonBaseDef = {
	[key: string]: any;

	id: any;
	owner_id: string | number;
	idx: number;
	timestamp?: number;
	species_id: number;
	level: number;
	xp: number;
	nature: string;
	shiny: boolean;
	iv_hp: number;
	iv_atk: number;
	iv_defn: number;
	iv_satk: number;
	iv_sdef: number;
	iv_spd: number;

	iv_total: number;

	nickname: string | undefined;
	favorite: string | false;
	held_item: number | string | undefined;
	moves: any;
	has_color: boolean | false;
	color: number | undefined;

	_hp: number | undefined;
	ailments: string[] | number[] | [];
	stages: any;

	format(spec: string): string;

	toString(): string;

	species: any;
	max_xp: number;
	max_hp: number;

	get hp(): number;

	atk: number;
	defn: number;

	set hp(value: number);

	satk: number;
	sdef: number;
	spd: number;
	ivPercentage: number;

	getNextEvolution(): Species | undefined;

	canEvolve(): boolean;
};

export type DataManagerBaseType = {
	pokemon: Species[];
	items: Item[];
	effects: MoveEffect[];
	moves: Move[];
	allPokemon: () => Species[];
	list_alolan: number[];
	list_galarian: number[];
	list_hisuian: number[];
	list_paradox: number[];
	list_mythical: number[];
	list_legendary: number[];
	list_ub: number[];
	list_event: number[];
	list_mega: Array<number | undefined>;
	species_id_by_type_index: Record<string, number[]>;
	speciesIdByRegionIndex: Map<string, number[]>;
	listRegion: (region: string) => number[];
	speciesIdByMoveIndex: Map<string, number[]>;
	listMove: (move: string) => number[];
	allItems: () => Item[];
	allSpeciesByNumber: (number: number) => Species[];
	allSpeciesByName: (name: string) => Species[];
	findSpeciesByNumber: (number: number) => Species;
	speciesByName: (name: string) => Species;
	speciesByNameIndex: Map<string, Species[]>;

	itemByNumber(number: number): Item;

	itemByNameIndex: Map<string, Item>;

	itemByName(name: string): Item;

	moveByNumber(number: number): Move;

	moveByNameIndex: Map<string, Move>;

	moveByName(name: string): Move;

	randomSpawn(rarity: string): Species;

	weightedRandomChoice(weights: number[]): number;

	spawnWeights: number[];
};

export type TrainerBase = {
	user: baseuser;
	pokemon: PokemonBase[];
	selected: PokemonBase;
	selected_idx: number;
	done: boolean;
	client: Client;
};

export type BattleBase = {
	turn: TrainerBase[];
	trainers: TrainerBase[];
	channel: string;
	passed_turns: number;
	client: Client;
	betamount: number;
	sendBattle(): Promise<void>;
	send_moves(avail: string[]): Promise<void>;
	run_move(
		move: Move,
		trainer: TrainerBase,
		opponent: TrainerBase,
		op: boolean
	): Promise<void>;
	game_over(winner: TrainerBase, loser: TrainerBase): Promise<void>;
};
