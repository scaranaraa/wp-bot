/**
 * @name EventHandler
 * @memberof Client
 * Loads event handlers for the WhatsApp bot.
 *
 * iterates through event files in 'src/events' and loads them with the client.
 */ 

import { readdirSync } from 'fs';
import { type Client } from 'whatsapp-web.js';

export default (client: Client) => {
	try {
		readdirSync('./dist/src/events').forEach(async file => {
			const events = readdirSync('./dist/src/events/').filter(file =>
				file.endsWith('.js')
			);
			for (const file of events) {
				const pull = await import(`../events/${file}`);
				if (pull.name) {
					client.events.set(pull.name, pull);
				}
			}
		});
	} catch (e) {
		console.log(e);
	}
};
