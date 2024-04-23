import { type Client, type Message } from 'whatsapp-web.js';
import BaseCommand from '../BaseCommand.js';
import Game from '../../Structures/Game.js';

export default class JoinCommand extends BaseCommand {
	constructor(client: Client) {
		super(client, 'join');
	}

	async execute(msg: Message) {
		const chat = await msg.getChat();
		const member = await msg.getContact();
		let game = this.games[chat.id.user];
		if (!game) {
			game = this.games[chat.id.user] = new Game(this.client, chat);
			await game.init();
		}

		if (game.started) {
			return 'Sorry, this game has already started!';
		}

		const res = game.addPlayer(member);
		if (res === null) {
			return "You've already registered for this game!";
		}
		if (game.queue.length === 1) {
			return (
				`A game has been registered with you as the leader! Once all players have joined, type \`uno start\` to begin the game!` +
				`\n\nThe rules for this game are:\n${game.serializeRules()}\nYou can configure these or get a description with the \`rules\` command (uno rules <key> [value])`
			);
		}
		return 'You have joined the game! Please wait for it to start.';
	}
}
