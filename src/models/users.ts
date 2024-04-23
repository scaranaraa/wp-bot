import { Schema, model } from 'mongoose';
import { type BaseUserType } from '../types/baseuser.js';

const user = new Schema<BaseUserType>({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		default: null,
	},
	balance: {
		type: Number,
		default: 0,
	},
	uno: {
		type: Number,
		default: 0,
	},
	hangman: {
		type: Number,
		default: 0,
	},
	blacktea: {
		type: Number,
		default: 0,
	},
	greentea: {
		type: Number,
		default: 0,
	},
	redtea: {
		type: Number,
		default: 0,
	},
	pinktea: {
		type: Number,
		default: 0,
	},
	crossword : {
		type: Number,
		default : 0,
	},
	yellowtea: {
		type: Number,
		default: 0,
	},
	trivia: {
		type: Number,
		default: 0,
	},
	inventory: {
		type: [],
		default: [],
	},
	typerace: {
		type: Number,
		default: 0,
	},
	wpm: {
		type: Number,
		default: 0,
	},
	puzzleELO: {
		type: Number,
		default: 0,
	},
	ELO: {
		type: Number,
		default: 0,
	},
	wordle: {
		type: Number,
		default: 0,
	},
	msgcount: {
		daily: {
			type: Number,
			default: 0,
		},
		weekly: {
			type: Number,
			default: 0,
		},
		monthly: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			default: 0,
		},
		toadd: {
			type: Boolean,
			default: true,
		},
	},
	status: {
		blacklist: {
			type: Boolean,
			default: false,
		},
		ban: {
			type: Boolean,
			default: false,
		},
		logs: {
			type: [],
			default: [],
		},
	},
	next_idx: {
		type: Number,
		default: 1,
	},
	commands: {
		type: Map,
		default: {},
	},
	shinies_caught: {
		type: Number,
		default: 0,
	},
	wchain: {
		type: Number,
		default: 0,
	},
	redeems: {
		type: Number,
		default: 0,
	},
	shiny_streak: {
		type: Number,
		default: 0,
	},
	selected: {
		type: [],
		default: [],
	},
	xpboost: {
		type: Number,
		default: null,
	},
	pokedex: {
		starter: {
			type: Boolean,
			default: false,
		},
	},
	pokemon: {
		type: Map,
		default: {},
	},
});

export default model('users', user);
