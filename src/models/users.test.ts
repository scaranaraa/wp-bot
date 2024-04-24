import { Schema, model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { type BaseUserType } from '../types/baseuser.js';

class user implements BaseUserType {
	crossword: number;

	wchain: number;

	msgcount: {
		daily: number;
		weekly: number;
		monthly: number;
		total: number;
		toadd: boolean;
	};

	commands: Map<string, number>;

	wordle: number;

	@prop({ default: null, unique: true })
	userId: string;

	@prop({ default: null, unique: false })
	username: string;

	@prop({ default: 0 })
	balance: number;

	@prop({ default: 0 })
	uno: number;

	hangman: number;

	blacktea: number;

	greentea: number;

	redtea: number;

	pinktea: number;

	yellowtea: number;

	trivia: number;

	inventory: any[];

	typerace: number;

	wpm: number;

	puzzleELO: number;

	ELO: number;

	status: { blacklist: boolean; ban: boolean; logs: any[] };

	next_idx: number;

	shinies_caught: number;

	redeems: number;

	shiny_streak: number;

	selected: any[];

	xpboost: number;

	pokedex: { starter: boolean };

	pokemon: Map<any, any>;
}
