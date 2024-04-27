import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class StartCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'start');
	}
	/**
	 * Starts a UNO game in a WhatsApp chat. 
	 *
	 * This command initiates the game if there are enough players and deals cards to each player. 
	 *
	 * **Usage:**
	 * - `uno start` - Starts the UNO game if the player who initiated the game uses the command.
	 */
	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (!game) {
			return "A game isn't running right now.";
		}

		if (game.queue.length > 1) {
			if (game.started) {
				return 'The game has already started!';
			}

			if (game.player.member.number !== member.number) {
				return "Sorry, but you can't start a game you didn't create!";
			}

			await game.start();
			// flip top card before dealing. this is wrong, i know, but accounts for using all
			// the cards in the dealing phase

			return `The game has begun with ${game.queue.length} players! The currently flipped card is: **${game.flipped}**.
      
It is now @${game.player.member.number}'s turn!`;
		}
		return "There aren't enough people to play!";
	}
}
