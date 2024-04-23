import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export type chessbase = {
	id: string;
	chatid: string;
	mode: string;
	points: number;
	rating: number;
	client: pkg.Client;
	themes: string;
	hintsused: number;
	moves: string[];
	wrongs: number;
	time: number;
	fen: string;
	newfen: string;
	gamelink: string;
	newmedia: pkg.MessageMedia;
	newthemes: string;
	newmoves: string[];
	newrating: number;
	newpoints: number;
	newgamelink: string;
	preloaded: boolean;
	preloadpuzzle(): Promise<void>;
	preloadmove(): Promise<void>;
	getpuzzle(): Promise<void>;
	getURL(fen: string): Promise<pkg.MessageMedia>;
	waitforanswer(): Promise<void>;
};
