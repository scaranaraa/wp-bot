import { type Chat, type Client, type Contact } from 'whatsapp-web.js';
import type Card from '../commands/unogame/Structures/Card.js';
import type Player from '../commands/unogame/Structures/Player.js';
import type Game from '../commands/unogame/Structures/Game.js';

export type Rule = {
	desc: string;
	value: any;
	name: string;
	type: string;
	max?: number;
	min?: number;
};

export type Ruleset = Record<string, any>;

export type CardBase = {
	id: string;
	wild: boolean;
	color?: string;
	colorName: string;
	colorCode: number;
	URL: string;
	value: number;
	toString(): string;
};

export type UnoGame = {
	serializeRule(key: string): string;
	client: Client;
	channel: Chat;
	players: Record<string, Player>;
	calledout: boolean;
	queue: Player[];
	deck: Card[];
	discard: Card[];
	finished: Player[];
	serializeRules(): string;
	dropped: Player[];
	started: boolean;
	confirm: boolean;
	lastChange: number;
	drawn: number;
	timeStarted: number;
	rules: Ruleset;
	transcript: string[];
	init(): Promise<void>;
	setRule(words: string): boolean | string;
	player: Player;
	flipped: Card;
	next(): Promise<void>;
	send(content: string): Promise<void>;
	addPlayer(member: Contact): Player;
	notifyPlayer(player: Player, cards?: Card[]): Promise<void>;
	scoreboard(): string;
	start(): Promise<void>;
	dealAll(number: number, players?: Player[]): Promise<void>;
	deal(player: Player, number: number): Promise<Card[]>;
	generateDeck(): void;
	shuffleDeck(): void;
};

export type PlayerBase = {
	member: Contact;
	game: Game;
	id: string;
	hand: Card[];
	called: boolean;
	finished: boolean;
	cardsPlayed: number;
	cardsChanged(): void;
	sortHand(): void;
	parseColor(color: string): string;
	outputFormat(): {
		id: string;
		cardsPlayed: number;
		name: string;
		discriminator: string;
	};
	getCard(words: string[]): Promise<Card | undefined>;
	send(client: Client, content: string): Promise<void>;
	getHand(turn: boolean): string;
	getHand2(turn: boolean): Card[];
	sendHand(client: Client): Promise<void>;
};

export type CommandBase = {
	client: Client;
	name: string;
	games: Record<string, Game>;
	aliases: string[];
};

export type GameManagerBase = {
	client: Client;
	games: Record<string, Game>;
	timeoutInterval: NodeJS.Timer;
	deleteGame(id: string): Promise<void>;
	timeout(): Promise<void>;
	removePlayerFromGame(game: Game, user: Contact): Promise<string>;
};
