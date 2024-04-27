import { type Client } from 'whatsapp-web.js';
import { type CommandBase } from '../../../types/unotypes.js';
import Game from '../Structures/Game.js';
/**
 * Provides a base class for UNO game commands.
 */
export default class BaseCommand implements CommandBase {
	constructor(client: Client, name: string, options: { aliases?: any } = {}) {
		this.client = client;
		this.name = name;

		this.aliases = options.aliases || [];
	}

	get games() {
		return this.client.games;
	}

	client: Client;

	name: string;

	aliases: string[];
}
