import { type Client, type Contact } from 'whatsapp-web.js';

export type BlackTea = {
	chatid: string;
	client: Client;
	segment: string;
	time: number;
	players: Map<string, number>;
	queue: Contact[];
	usedwords: string[];
	startgame(): Promise<void>;
	sendword(): Promise<void>;
};

export type GreenTea = {
	currwords?: number[];
	chatid: string;
	client: Client;
	segment: string;
	players: Map<string, number>;
	queue: Map<string, string>;
	scorers?: string[];
	usedwords: string[];
	scores?: Map<string, number>;
	startgame(): Promise<void>;
	sendword(): Promise<void>;
	unanswered: number;
};
