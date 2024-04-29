import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class PingCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'uno', {
			aliases: ['!', 'uno!'],
		});
	}
	/**
	 * @memberof! module:UNO
 	 * @name uno!
 	 * @description
	 * Handles UNO callouts within a WhatsApp chat.
	 *
	 * This command checks if a player has only one card left and allows them to call "UNO!". 
	 *
	 * **Usage:**
	 * - `uno uno` or `uno!` - Calls "UNO!" if the player has only one card remaining.
	 */
	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (
			game &&
			game.started &&
			game.players[member.number] &&
			game.players[member.number].hand.length === 1
		) {
			const p = game.players[member.number];
			if (!p.called) {
				p.called = true;
				return `**UNO!!** ${p.member.username} only has one card left!`;
			}
			return "You've already said UNO!";
		}
	}
}
