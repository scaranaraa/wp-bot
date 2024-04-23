import moment from 'moment';
import pkg from 'moment';
import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

const { duration } = pkg;

export default class TableCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'table');
	}

	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		const game = this.games[chat.id.user];
		if (!game) {
			return 'There is no game created for this channel yet.';
		}
		if (!game.started) {
			return `Here are the players in this game:\n${game.queue.map((p: any) => `**@${p.member.username}**`).join('\n')}`;
		}
		const diff = duration(Number(moment()) - game.timeStarted);
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
		let out = `A **${game.flipped}** has been played.\nIt is currently ${game.player.member.username} 's turn!\n\n`;
		out +=
			`Here are the players in this game:\n${game.queue
				.map((p: any) => `**${p.member.username}** | ${p.hand.length} card(s)`)
				.join('\n')}` +
			`\n\nThis game has lasted **${d}**. **${game.drawn}** cards have been drawn!`;
		return out;
	}
}
