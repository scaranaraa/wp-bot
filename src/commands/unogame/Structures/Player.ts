import pkg from 'whatsapp-web.js';
import { CardBase, type PlayerBase, UnoGame } from '../../../types/unotypes.js';
import type Game from './Game.js';
import type Card from './Card.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export default class Player implements PlayerBase {
	constructor(member: pkg.Contact, game: Game) {
		this.member = member;
		this.member.username = member.name ?? `@${member.id.user}`;
		this.member.discriminator = '';
		this.game = game;
		this.id = member.id.user;
		this.hand = [];
		this.called = false;
		this.finished = false;
		this.cardsPlayed = 0;
	}

	member: pkg.Contact;

	// @ts-ignore
	game: Game;

	id: string;

	hand: Card[];

	called: boolean;

	finished: boolean;

	cardsPlayed: number;

	cardsChanged() {
		this.sortHand();
	}

	sortHand() {
		// @ts-ignore
		this.hand.sort((a, b) => {
			return a.value > b.value;
		});
	}

	parseColor(color: string) {
		switch ((color || '').toLowerCase()) {
			case 'red':
			case 'r':
				color = 'R';
				break;
			case 'yellow':
			case 'y':
				color = 'Y';
				break;
			case 'green':
			case 'g':
				color = 'G';
				break;
			case 'blue':
			case 'b':
				color = 'B';
				break;
			default:
				color = '';
				break;
		}

		return color;
	}

	outputFormat() {
		return {
			id: this.id,
			cardsPlayed: this.cardsPlayed,
			name: this.member.username,
			discriminator: this.member.discriminator,
		};
	}

	async getCard(words: string[]) {
		let color: string;
		let id: string;
		if (words.length === 1) {
			const f = words[0][0].toLowerCase();
			const _c = this.parseColor(f);
			if (_c) {
				color = _c;
				id = words[0].substring(1);
			} else {
				id = words[0];
			}
		} else {
			color = words[0];
			id = words[1];
		}

		if (!id) {
			await this.game.send(
				'Something went wrong. Did you provide a proper card?'
			);
			return null;
		}

		const wild = ['WILD', 'WILD+4', 'WILDSWAPHANDS'];
		const w2 = ['WILDSWAPHANDS'];
		const alias: Record<string, string> = {
			W: 'WILD',
			'W+4': 'WILD+4',
			REV: 'REVERSE',
			R: 'REVERSE',
			NOU: 'REVERSE',
			S: 'SKIP',
			FUCKU: 'SKIP',
			WSH: 'WILDSWAPHANDS',
			WSWAP: 'WILDSWAPHANDS',
			WSWAPHAND: 'WILDSWAPHANDS',
			LOL: 'WILDSWAPHANDS',
		};
		const alias2 = {
			WSH: 'WILDSWAPHANDS',
			WSWAP: 'WILDSWAPHANDS',
			WSWAPHAND: 'WILDSWAPHANDS',
			LOL: 'WILDSWAPHANDS',
		};
		const user: any = null;
		const user1: any = null;

		let _color = this.parseColor(color);
		if (!_color) {
			if (
				!color &&
				(wild.includes(id.toUpperCase()) || alias[id.toUpperCase()])
			) {
				const first = true;
				if (!_color) {
					this.game.send(
						'You have to specify a valid color! Colors are **red**, **yellow**, **green**, and **blue**.' +
							'\n`uno play <color> <value>`'
					);
					return null;
				}
			} else {
				const temp = color;
				color = id;
				id = temp;
				_color = this.parseColor(color);
				if (!_color) {
					this.game.send(
						'You have to specify a valid color! Colors are **red**, **yellow**, **green**, and **blue**.' +
							'\n`uno play <color> <value>`'
					);
					return null;
				}
			}
		}

		color = _color;
		if (alias[id.toUpperCase()]) {
			id = alias[id.toUpperCase()];
		}

		if (['WILD', 'WILD+4', 'WILDSWAPHANDS'].includes(id.toUpperCase())) {
			const card = this.hand.find(c => c.id === id.toUpperCase());
			if (!card) {
				return undefined;
			}

			card.color = color;
			if (user == 'lmao') {
				card.id = 'WILD';
			}

			return card;
		}
		return this.hand.find(c => c.id === id.toUpperCase() && c.color === color);
	}

	async send(client: pkg.Client, content: string) {
		try {
			await client.sendMessage(this.member.id._serialized, content);
		} catch (err) {
			console.log(err);
			console.log(content);
			console.log(this.member.id._serialized);
			await this.game.send(
				`Hey <@${this.id}>, I can't DM you! ` +
					'Please make sure your DMs are enabled, and run `uno hand` to see your cards.'
			);
		}
	}

	getHand(turn = false) {
		this.sortHand();
		return `Here is your hand:\n\n${this.hand
			.map(h => `**${h}**`)
			.join(' | ')}\n\nYou currently have ${this.hand.length} card(s).`;
	}

	getHand2(turn = false) {
		this.sortHand();
		return this.hand;
	}

	async sendHand(client: pkg.Client) {
		await this.send(client, this.getHand());
	}
}
