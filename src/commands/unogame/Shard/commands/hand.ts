import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class HandCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'hand');
	}
	/** 
	 * Sends the player's current hand in a private message.
	 *
	 * **Usage:**
	 * - `uno hand` - Sends the player's hand cards in a direct message. 
	 */
	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (game) {
			if (!game.started) {
				return "Sorry, but the game hasn't been started yet!";
			}

			const player = game.players[member.number];
			if (!player) {
				return 'Sorry, but you are not a part of this game!';
			}

			await player.sendHand(this.client);
			return "You got it! I've DMed you your hand.";
		}
		return "Sorry, but a game hasn't been created yet! Do `uno join` to create one.";
	}
}
