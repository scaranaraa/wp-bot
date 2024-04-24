import pkg, { Contact } from 'whatsapp-web.js';
import { type Aki } from 'aki-api';
import type baseuser from '../models/baseuser.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export type charadesBase = {
	chatid: string;
	client: pkg.Client;
	currword: string;
	players: pkg.Contact[];
	hints: number;
	lives: number;
	usedwords?: string[];
	next_turn(): Promise<void>;
	guess_word(): Promise<void>;
};

export type Iwchain = {
	chatid: string;
	client: pkg.Client;
	currletter: string;
	players: Contact[];
	lives: number;
	usedwords?: string[];
	score: number;
	StartGame(): Promise<void>;
};

export type truthordateapi = {
	id: string;
	question: string;
};

export type triviaBase = {
	chatid: string;
	client: pkg.Client;
	timed: boolean;
	difficulty: string;
	category: string;
	choices: boolean;
	questioncount: number;
	questions: triviaQuestion[];
	sessiontoken: string;

	getSession(): Promise<void>;
	loadQuestions(): Promise<void>;
	sendQuestion(): Promise<void>;
};
export type triviaQuestion = {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};

export type ttts = {
	chatid: string;
	client: pkg.Client;
	players: pkg.Contact[];
	currletter: string;
	subletters: string[][];
	letters: string[];
	playablesq: number;
	res: string;
	guesses: number;
	prev: number;
	start(): Promise<void>;
	checkwin(ignore: boolean): Promise<string>;
	genimage(fullimage: boolean, square?: any, sqcolor?: any): Promise<string>;
};

export type aki = {
	chatid: string;
	client: pkg.Client;
	aki: Aki;
	questions: number;
};

export type connect4 = {
	chatid: string;
	client: pkg.Client;
	players: pkg.Contact[];
	place: string[];
	board: string[][];
	start(): Promise<void>;
	sendBoard(): Promise<void>;
	checkgameover(): Promise<boolean>;
	checkboardfull(): Promise<boolean>;
};

export type connections = {
	chatid: string;
	client: pkg.Client;
	wordlist: Array<{
		level: number;
		group: string;
		members: string[];
	}>;
	showwords: string[];
	res: string;
	ans: string[][];
	guesses: number;
	done: number;
	init(): void;
	guess(words: string[]): Promise<number>;
	drawimg(): Promise<void>;
};

export type duodle = {
	chatid: string;
	client: pkg.Client;
	word: string;
	word1done: boolean;
	word2done: boolean;
	word2: string;
	colors: string[][];
	letters: string[][];
	colors2: string[][];
	letters2: string[][];
	res: string;
	res2: string;
	guesses: number;
	guess(word: string): Promise<void>;
	genimage(): Promise<string>;
};

export type hangman = {
	chatid: string;
	client: pkg.Client;
	inGame: boolean;
	word: string;
	guesssed: string[];
	wrongs: number;
	type: string;
	definition: string;
	newGame(): Promise<void>;
	makeGuess(letter: string, user: baseuser): Promise<boolean>;
	gameOver(win: boolean, user: baseuser): void;
	getDescription(): string;
};

export type tttBase = {
	chatid: string;
	client: pkg.Client;
	players: pkg.Contact[];
	currletter: string;
	letters: string[];
	res: string;
	guesses: number;
	start(): Promise<void>;
	checkwin(ignore: boolean): Promise<true | 'draw'>;
	genimage(): Promise<string>;
};

export type wordleBase = {
	chatid: string;
	client: pkg.Client;
	word: string;
	colors: string[][];
	letters: string[][];
	res: string;
	guesses: number;
	guess(word: string): Promise<void>;
	genimage(): Promise<string>;
};

export type _2048 = {
	userid: string;
	chatid: string;
	client: pkg.Client;
	board: number[][];
	score: number;
	start(): Promise<void>;
	genimage(): Promise<string>;
};

export type Icrossword = {
	chatid: string;
	client: pkg.Client;
	gridnums: number[];
	grid: string[];
	answers: { across: string[]; down: string[] };
	hints: number;
	clues: { across: string[]; down: string[] };
	usergrid: string[];
	init(): Promise<void>;
};
