export type BaseUserType = {
	userId: string;
	username: string;
	balance: number;
	uno: number;
	hangman: number;
	wordle: number;
	blacktea: number;
	greentea: number;
	redtea: number;
	pinktea: number;
	yellowtea: number;
	crossword: number;
	wchain: number;
	commands: Map<string, number>;
	words: Map<string,number>;
	trivia: number;
	inventory: any[];
	typerace: number;
	msgcount: {
		daily: number;
		weekly: number;
		monthly: number;
		total: number;
		toadd: boolean;
	};
	wpm: number;
	puzzleELO: number;
	ELO: number;
	status: {
		blacklist: boolean;
		ban: boolean;
		logs: any[];
	};
	next_idx: number;
	shinies_caught: number;
	redeems: number;
	shiny_streak: number;
	selected: any[];
	xpboost: number;
	pokedex: {
		starter: boolean;
	};
	pokemon: Map<any, any>;
};
export type BaseUserClient = {
	userId: string;
	currentUser: BaseUserType;
	users: Map<string, BaseUserType>;
};
