import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class CalloutCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'callout');
	}
	/**
	 * @memberof! UNO
 	 * @name callout
 	 * @description
	 * Allows players to call out other players who fail to say "UNO!" when they have one card left.
	 * 
	 * **Usage:**
	 * - `uno callout` - Calls out any player who has one card remaining but hasn't said "UNO!".
	 */
	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (
			game &&
			game.started &&
			game.players[member.number] &&
			!game.players[member.number].finished
		) {
			if (game.rules.CALLOUTS === false) {
				return 'Callouts have been disabled for this game.';
			}

			const baddies = [];
			for (const player of game.queue) {
				if (
					/* player !== game.player && */ player.hand.length === 1 &&
					!player.called
				) {
					baddies.push(player);
					player.called = true;
				}
			}

			if (game.calledout) {
				return 'A callout was already performed in this turn, please wait for the next turn to callout again';
			}

			game.dealAll(Math.max(1, game.rules.CALLOUT_PENALTY), baddies);
			console.log('Called Out Players:', baddies);
			if (baddies.length > 0) {
				return `Uh oh! ${baddies
					.map(p => `**@${p.member.number}**`)
					.join(
						', '
					)}, you didn't say UNO! Pick up ${Math.max(1, game.rules.CALLOUT_PENALTY)}!`;
			}
			game.calledout = true;
			if (game.rules.FALSE_CALLOUT_PENALTY <= 0) {
				return 'There is nobody to call out.';
			}
			await game.deal(
				game.players[member.number],
				game.rules.FALSE_CALLOUT_PENALTY
			);
			return `There is nobody to call out. Pick up ${game.rules.FALSE_CALLOUT_PENALTY}!`;
		}
		return "You aren't even in the game!";
	}
}
