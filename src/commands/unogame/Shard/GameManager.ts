import { type Client, type Contact } from 'whatsapp-web.js';
import { type GameManagerBase } from '../../../types/unotypes.js';
import type Game from '../Structures/Game.js';
/**
 * @memberof module:UNO
 * @name GameManager
 * @description
 * Manages UNO games within the WhatsApp bot. 
 * 
 * handles game creation, deletion, player management, timeouts, and 
 * interaction with game-specific command classes.
 * 
 * **Notes:**
 * - This class assumes the existence of `Game` objects and various command classes 
 *   for specific actions within the UNO game. 
 */
export default class GameManager implements GameManagerBase {
	constructor(client: Client) {
		this.client = client;

		this.games = {};

		this.timeoutInterval = setInterval(this.timeout.bind(this), 1000 * 30);
	}

	client: Client;

	games: Record<string, Game>;

	saveGameInterval: NodeJS.Timer;

	timeoutInterval: any;

	async timeout() {
		for (const id of Object.keys(this.games)) {
			try {
				const game = this.games[id];
				if (!game) {
					console.info('Deleting non-existent game with id', id);
					await this.deleteGame(id);
					continue;
				}

				if (!game.started && Date.now() - game.lastChange >= 3 * 60 * 1000) {
					await game.send('The game has been cancelled due to inactivity.');
					await this.deleteGame(id);
				} else if (
					game.started &&
					Date.now() - game.lastChange >= 5 * 60 * 1000
				) {
					const user = game.queue[0].member;
					const msg = { author: user, channel: { id } };
					let out = await this.client.getCommand('quit').execute(msg, []);
					if (typeof out === 'string') {
						out = out.split('\n');
						// @ts-ignore
						out[0] = `**${user.username}#${user.discriminator}** has been kicked from the game due to inactivity.`;
						out = out.join('\n');
					} else {
						let desc = out.embed.description;
						desc = desc.split('\n');
						// @ts-ignore
						desc[0] = `**${user.username}#${user.discriminator}** has been kicked from the game due to inactivity.`;
						desc = desc.join('\n');
						out.embed.description = desc;
					}

					if (game.queue.length === 0) {
						if (typeof out === 'string') {
							out +=
								'\nThe game has been cancelled due to no remaining players.';
						} else {
							out.embed.description +=
								'\nThe game has been cancelled due to no remaining players.';
						}

						await this.deleteGame(id);
					}

					await game.send(out);
				}
			} catch (err) {
				console.error(err);
				await this.deleteGame(id);
			}
		}
	}

	async deleteGame(id: string) {
		delete this.client.games[id];
		delete this.games[id];
	}

	async removePlayerFromGame(game: Game, user: Contact) {
		let out = '';

		game.dropped.push(game.players[user.number]);
		if (game.started && game.queue.length <= 2) {
			game.queue = game.queue.filter(p => p.member.number !== user.number);
			game.finished.push(game.queue[0]);
			out += game.scoreboard();
			await this.deleteGame(game.channel.id.user);
			return out;
		}

		if (game.started && game.player.member.number === user.number) {
			game.next();
			out = `${out}A **${game.flipped}** was played last. \n\nIt is now ${game.player.member.username}'s turn!`;
		}

		delete game.players[user.number];
		game.queue = game.queue.filter(p => p.member.number !== user.number);
		if (!game.started && game.queue.length === 0) {
			out = 'The game has been cancelled.';
			await this.deleteGame(game.channel.id.user);
		}

		return out;
	}
}
