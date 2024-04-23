import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';

export default class PingCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'uno', {
			aliases: ['!', 'uno!'],
		});
	}

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
