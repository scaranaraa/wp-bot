import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class DrawCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'draw', {
			aliases: ['pickup', 'd'],
		});
	}
	/**
	 * @memberof! UNO
 	 * @name draw
 	 * @description
	 * Allows the current player to draw a card from the deck in a UNO game. 
	 *
	 * **Usage:**
	 * - `uno d` or `uno pickup` - Draws a card from the deck. 
	 */
	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (game) {
			if (!game.started) {
				return "Sorry, but the game hasn't been started yet!";
			}

			if (game.player.member.number !== member.number) {
				return `It's not your turn yet! It's currently @${game.player.member.number}'s turn.`;
			}

			if (game.rules.MUST_PLAY === true) {
				for (const card of game.player.hand) {
					if (
						!game.flipped.color ||
						card.wild ||
						card.id === game.flipped.id ||
						card.color === game.flipped.color
					) {
						return "Sorry, you have to play a card if you're able!";
					}
				}
			}

			const [card] = await game.deal(game.player, 1);
			if (
				game.rules.DRAW_AUTOPLAY === true &&
				(!game.flipped.color ||
					card.wild ||
					card.id === game.flipped.id ||
					card.color === game.flipped.color)
			) {
				return await this.client
					.getCommand('play')
					.execute(msg, card.toString().split(' '), '', true);
			}

			const { player } = game;
			await game.next();

			return `${player.member.username} picked up a card!.

A **${game.flipped}** was played last.

It is now ${game.player.member.username}'s turn!`;
		}
		return "Sorry, but a game hasn't been created yet! Do `uno join` to create one.";
	}
}
