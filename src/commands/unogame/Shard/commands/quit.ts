import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class QuitCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'quit');
	}

	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (game && game.players.hasOwnProperty(member.number)) {
			let out = 'You are no longer participating in the game.\n\n';

			out += await this.client.gameManager.removePlayerFromGame(game, member);

			return out;
		}
		return "You haven't joined!";
	}
}
