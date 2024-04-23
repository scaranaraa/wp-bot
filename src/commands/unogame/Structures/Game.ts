import moment from 'moment';
import pkg from 'moment';
import Player from './Player.js';
import 'whatsapp-web.js';
import Card from './Card.js';
import {
	CardBase,
	PlayerBase,
	type Ruleset,
	type UnoGame,
} from '../../../types/unotypes.js';
import { type Client, type Chat, type Contact } from 'whatsapp-web.js';

const { duration } = pkg;

export default class Game implements UnoGame {
	constructor(client: Client, channel: Chat) {
		this.client = client;
		this.channel = channel;
		this.players = {};
		this.queue = [];
		this.deck = [];
		this.calledout = false;
		this.discard = [];
		this.finished = [];
		this.dropped = [];
		this.started = false;
		this.confirm = false;
		this.lastChange = Date.now();
		this.drawn = 0;
		this.timeStarted = null;
		this.rules = client.getruleset();
		this.transcript = [];
	}

	calledout: boolean;

	client: Client;

	channel: Chat;

	players: Record<string, Player>;

	queue: Player[];

	deck: Card[];

	discard: Card[];

	finished: Player[];

	dropped: Player[];

	started: boolean;

	confirm: boolean;

	lastChange: number;

	drawn: number;

	timeStarted: number;

	rules: Ruleset;

	transcript: string[];

	async init() {}

	serializeRule(key: string) {
		key = key.toUpperCase();
		const rule = this.client.getrules()[key];
		if (!rule) {
			return 'There is no rule with that key.';
		}

		return `**${rule.name}**\nKey: ${key}\nType: ${rule.type}\nValue: ${this.rules[key]}\n\n${rule.desc}`;
	}

	serializeRules() {
		const len = Object.keys(this.rules).reduce((acc, cur) => {
			return cur.length > acc ? cur.length : acc;
		}, 0);
		const f = (_: any, key: string, value: any) => {
			return `${key.padEnd(len, ' ')} = ${value}\n`;
		};

		let out = '```ini\n';
		for (const key of this.client.getruleKeys()) {
			if (this.client.getrules()[key].wip) {
				continue;
			}

			out += f`${key}${this.rules[key]}`;
		}

		out += '```';
		return out;
	}

	setRule(words: any) {
		if (words.length % 2 === 1) {
			return 'Provided a key without a value';
		}

		const rules = JSON.parse(JSON.stringify(this.rules));
		for (let i = 0; i < words.length; i += 2) {
			let key = words[i];
			let value: any = words[i + 1];
			key = key.toUpperCase();
			const rule = this.client.getrules()[key];
			if (!rule) {
				return 'invalid key';
			}

			switch (rule.type) {
				case 'boolean':
					try {
						value = JSON.parse(value);
					} catch (err) {
						/* NO-OP */
					} finally {
						if (typeof value !== 'boolean') {
							return `${key}: Expected a boolean value, but received a ${typeof value}`;
						}
					}

					break;
				case 'integer':
					try {
						value = Number(value);
					} catch (err) {
						/* NO-OP */
					} finally {
						if (typeof value !== 'number') {
							return `${key}: Expected a number value, but received a ${typeof value}`;
						}

						if (typeof rule.min === 'number' && value < rule.min) {
							return `${key}: Expected a value greater than or equal to ${rule.min}, but received ${value}`;
						}

						if (typeof rule.max === 'number' && value > rule.max) {
							return `${key}: Expected a value less than or equal to ${rule.max}, but received ${value}`;
						}
					}

					break;
			}

			rules[key] = value;
		}

		this.rules = rules;
		return true;
	}

	get player() {
		return this.queue[0];
	}

	get flipped() {
		return this.discard[this.discard.length - 1];
	}

	async next() {
		this.queue.push(this.queue.shift());
		this.queue = this.queue.filter(p => !p.finished);
		if (this.rules.DM_USERHAND) {
			this.player.sendHand(this.client);
		}

		this.lastChange = Date.now();
	}

	async send(content: string) {
		await this.client.sendMessage(this.channel.id._serialized, content);
	}

	addPlayer(member: Contact) {
		this.lastChange = Date.now();
		if (!this.players[member.number]) {
			const player = (this.players[member.number] = new Player(member, this));
			this.queue.push(player);
			return player;
		}
		return null;
	}

	async notifyPlayer(player: Player, cards = player.hand) {
		if (this.rules.DM_USERHAND) {
			try {
				await this.client.sendMessage(
					player.member.id._serialized,
					`You were dealt the following card(s):\n${cards
						.map(c => `**${c}**`)
						.join(' | ')}`
				);
			} catch (err) {
				console.log(err);
				await this.send(
					`Hey <@${player.id}>, I can't DM you! Please make sure your DMs are enabled, ` +
						'and run `uno hand` to see your cards.'
				);
			}
		}
	}

	scoreboard() {
		let out =
			'The game is now over. Thanks for playing! Here is the scoreboard:\n';
		for (let i = 0; i < this.finished.length; i++) {
			const user = this.finished[i].member;
			out += `${i + 1}. **${user.username}${user.discriminator}**\n`;
		}

		const diff = duration(Number(moment()) - this.timeStarted);
		let d: any = [];
		if (diff.days() > 0) {
			d.push(`${diff.days()} day${diff.days() === 1 ? '' : 's'}`);
		}

		if (diff.hours() > 0) {
			d.push(`${diff.hours()} hour${diff.hours() === 1 ? '' : 's'}`);
		}

		d.push(`${diff.minutes()} minute${diff.minutes() === 1 ? '' : 's'}`);
		if (d.length > 1) {
			d[d.length - 1] = `and ${d[d.length - 1]}`;
		}

		d = d.join(', ');
		out += `\nThis game lasted **${d}**, and **${this.drawn}** cards were drawn!`;

		if (this.rules.OUTPUT_SCORE) {
			const { finished } = this;
			const { dropped } = this;
			const { channel } = this;
			setTimeout(async () => {
				const file = {
					finished: finished.map(p => p.outputFormat()),
					quit: dropped.map(p => p.outputFormat()),
				};
			}, 1000);
		}

		return out;
	}

	async start() {
		this.generateDeck();

		this.discard.push(this.deck.pop());
		await this.dealAll(Number(this.rules.INITIAL_CARDS));
		this.started = true;
		this.timeStarted = Date.now();
	}

	async dealAll(number: number, players = this.queue) {
		const cards: Record<string, any> = {};
		for (let i = 0; i < number; i++) {
			let br = false;
			for (const player of players) {
				if (this.deck.length === 0) {
					if (this.discard.length <= 1) {
						br = true;
						break;
					}

					this.shuffleDeck();
				}

				const c = this.deck.pop();
				if (!c) {
					br = true;
					break;
				}

				if (!cards[player.id]) {
					cards[player.id] = [];
				}

				cards[player.id].push(c.toString());
				player.hand.push(c);
				this.drawn++;
			}

			if (br) {
				break;
			}
		}

		for (const player of players) {
			player.cardsChanged();
			player.called = false;
			if (cards[player.id].length > 0) {
				await this.notifyPlayer(player, cards[player.id]);
			}
		}
	}

	async deal(player: Player, number: number) {
		const cards: any[] = [];
		for (let i = 0; i < number; i++) {
			if (this.deck.length === 0) {
				if (this.discard.length <= 1) {
					break;
				}

				this.shuffleDeck();
			}

			const c = this.deck.pop();
			cards.push(c);
			player.hand.push(c);
			this.drawn++;
		}

		player.cardsChanged();
		player.called = false;
		if (cards.length > 0) {
			await this.notifyPlayer(
				player,
				cards.map(c => c.toString())
			);
		}

		return cards;
	}

	generateDeck() {
		for (let d = 0; d < Number(this.rules.DECKS); d++) {
			for (const color of ['R', 'Y', 'G', 'B']) {
				this.deck.push(new Card('0', color));
				for (let i = 1; i < 10; i++) {
					for (let ii = 0; ii < 2; ii++) {
						this.deck.push(new Card(i.toString(), color));
					}
				}

				for (let i = 0; i < 2; i++) {
					this.deck.push(new Card('SKIP', color));
				}

				for (let i = 0; i < 2; i++) {
					this.deck.push(new Card('REVERSE', color));
				}

				for (let i = 0; i < 2; i++) {
					this.deck.push(new Card('+2', color));
				}
			}

			for (let i = 0; i < 4; i++) {
				this.deck.push(new Card('WILD'));
				this.deck.push(new Card('WILD+4'));
				// this.deck.push(new Card('WILDSWAPHANDS'));
			}
		}

		this.shuffleDeck();
	}

	shuffleDeck() {
		const top = this.discard.pop();
		let j;
		let x;
		let i;
		const a = [].concat(this.deck, this.discard);
		this.discard = [];
		if (a.length > 0) {
			for (i = a.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = a[i];
				a[i] = a[j];
				a[j] = x;
			}
		}

		this.deck = a;
		for (const card of this.deck.filter(c => c.wild)) {
			card.color = undefined;
		}

		if (top) {
			this.discard.push(top);
		}

		this.send('*!* The deck has been shuffled.');
	}

	duplicateHand(player1: string | number) {
		const hand1 = this.players[player1].hand;
		this.players[player1].hand = [...hand1, ...hand1];

		return 'uwu';
	}
}
