import pkg, { type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';
import type Card from '../../Structures/Card.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export default class PlayCommand extends BaseCommand {
	constructor(client: pkg.Client) {
		super(client, 'play', {
			aliases: ['p', 'pl', 'ply', 'pla'],
		});
	}
	/**
	 * @memberof! module:UNO
 	 * @name play
 	 * @description
	 * Plays a card in the UNO game within a WhatsApp chat. 
	 *
	 * This command allows players to play a card from their hand if it matches the color, number, or symbol of the previously played card. 
	 *
	 * **Usage:**
	 * - `uno play {color} {value}` - Plays the specified card (e.g., `!uno play red 5`). 
	 *
	 * **Notes:**
	 * - can also use aliases like `p`, `pl`, `ply`, or `pla` instead of `play`. 
	 */
	async execute(msg: Message, words: string[], text: any, drawn = false) {
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

			const card = await game.player.getCard(words);
			if (card === null) {
				return;
			}

			if (!card) {
				return "It doesn't seem like you have that card! Try again.";
			}

			game.player.cardsPlayed++;

			if (
				!game.flipped.color ||
				card.wild ||
				card.id === game.flipped.id ||
				card.color === game.flipped.color
			) {
				game.discard.push(card);
				game.player.hand.splice(game.player.hand.indexOf(card), 1);
				game.player.cardsChanged();
				if (game.calledout) {
					game.calledout = false;
				}

				let pref = '';
				if (game.player.hand.length === 0) {
					game.finished.push(game.player);
					game.player.finished = true;

					pref = `@${game.player.member.number} has no more cards! They finished in **Rank #${game.finished.length}**! \n\n`;
					if (game.queue.length === 2) {
						game.finished.push(game.queue[1]);
						pref = game.scoreboard();
						game.queue = [];
						delete this.games[chat.id.user];
						await this.client.gameManager.deleteGame(game.channel.id.user);
						return pref;
					}
				}

				let extra = '';
				switch (card.id) {
					case 'REVERSE':
						if (game.queue.length > 2) {
							const player = game.queue.shift();
							game.queue.reverse();
							game.queue.unshift(player);
							extra = 'Turns are now in reverse order! ';
							break;
						} else if (game.rules.REVERSE_SKIP === true) {
							const skipped = game.queue.shift();
							game.queue.push(skipped);
							extra = `Sorry, @${game.player.member.number}! Skip a turn! `;
							break;
						}

					case 'SKIP':
						const skipped = game.queue.shift();
						game.queue.push(skipped);

						extra = `Sorry, @${game.player.member.number}! Skip a turn! `;
						break;
					case '+2':
						let amount = 0;
						for (let i = game.discard.length - 1; i >= 0; i--) {
							if (game.discard[i].id === '+2') {
								amount += 2;
							} else {
								break;
							}
						}

						game.deal(game.queue[1], amount);
						extra = `@${game.queue[1].member.number} picks up ${amount} cards! Tough break. `;
						if (game.rules.DRAW_SKIP === true) {
							extra += ' Also, skip a turn!';
							game.queue.push(game.queue.shift());
						}

						break;
					case 'WILD':
						extra = `In case you missed it, the current color is now **${card.colorName}**! `;
						break;
					case 'WILD+4': {
						await game.deal(game.queue[1], 4);
						extra = `@${game.queue[1].member.number} picks up 4! The current color is now **${card.colorName}**! `;
						if (game.rules.DRAW_SKIP === true) {
							extra += ' Also, skip a turn!';
							const skipped = game.queue.shift();
							game.queue.push(skipped);
						}

						break;
					}
					/* case 'WILDSWAPHANDS' : {

          let user= await msg.getMentions();
          if(!user) return 'Please mention a user to swap hands with'
          if(user[0].number === member.number) return 'You cannot swap hands with yourself'
          game.swapHand(member.number, user[0].number)
          break;
        } */
				}

				await game.next();
				/* try{
          console.log('h')
          await this.client.sendMessage(chat.id._serialize, media , { caption: `${pref}${drawn
          ? `@${member.number} has drawn and auto-played a **${game.flipped}**.`
          : `A **${game.flipped}** has been played.`} ${extra}\n\nIt is now @${game.player.member.number}'s turn!`})}
          catch (e) {
            console.log('a')
            console.log(e)
            await this.client.sendMessage(chat.id._serialize, `${pref}${drawn
              ? `@${member.number} has drawn and auto-played a **${game.flipped}**.`
              : `A **${game.flipped}** has been played.`} ${extra}\n\nIt is now @${game.player.member.number}'s turn!`)
          } */
				// try{
				// await this.client.sendMessage(chat.id._serialize, media)
				// }
				// catch (e) { console.log(e)  }kl
				if (game.rules.IMAGE == true) {
					try {
						const media = MessageMedia.fromFilePath(
							`./src/commands/unogame/cards/${game.flipped.color || ''}${game.flipped.id}.png`
						);
						await this.client.sendMessage(chat.id._serialized, media, {
							caption: `${pref}${extra}\nIt is now ${game.player.member.username}'s turn!`,
						});
					} catch (e) {
						console.log(e);
						return `${pref}${
							drawn
								? `${member.name ?? member.number} has drawn and auto-played a **${game.flipped}**.`
								: `A **${game.flipped}** has been played.`
						} ${extra}\n\nIt is now ${game.player.member.username}'s turn!`;
					}
				} else {
					return `${pref}${
						drawn
							? `${member.name ?? member.number} has drawn and auto-played a **${game.flipped}**.`
							: `A **${game.flipped}** has been played.`
					} ${extra}\n\nIt is now ${game.player.member.username}'s turn!`;
				}
			} else {
				return "Sorry, you can't play that card here!";
			}
		} else {
			return "Sorry, but a game hasn't been created yet! Do `uno join` to create one.";
		}
	}
}

function getUrl(card: Card) {
	if (card.color == 'R') {
		return '<:redcard:965866476944916541>';
	}

	if (card.color == 'B') {
		return '<:bluecard:965864534915022848>';
	}

	if (card.color == 'G') {
		return '<:greencard:965866405109051412>';
	}

	if (card.color == 'Y') {
		return '<:yellowcard:965863457675182101>';
	}

	if (!card.color) {
		return '<:wildcard:965866442874568745>';
	}
}
