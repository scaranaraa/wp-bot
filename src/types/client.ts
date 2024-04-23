import { type MessageMedia } from 'whatsapp-web.js';

export type SnipeItem = {
	body?: string;
	newbody?: string;
	prevbody?: string;
	author: string;
	date: number;
	type: string;
	media?: MessageMedia;
};
