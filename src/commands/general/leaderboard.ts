import { type Client, Contact, type Message } from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

export const name = 'leaderboard';
export const args = true;
export const aliases = ['lb'];
export const description = 'Check the leaderboard for most commands ran';
export const category = 'General';
/**
 * @memberof! General
 * @name leaderboard
 * @description
 * Displays leaderboards for message counts, command usage, and game wins within the WhatsApp chat.
 *
 * **Usage:**
 * - `!leaderboard msg` - Shows the leaderboard for message counts (total, daily, weekly, monthly). 
 * - `!leaderboard wins {game name}` - Shows the leaderboard for wins in the specified game (e.g., `!leaderboard wins wordle`).
 * - `!leaderboard {command name}` - Shows the leaderboard for usage of the specified command (e.g., `!leaderboard ping`).
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply(`Syntax -\nlb <msg/cmd/wins> [name]`);
	}
	if (
		args[0].toLowerCase() === 'msg' ||
		args[0].toLowerCase() === 'msgs' ||
		args[0].toLowerCase() === 'message'
	) {
		let res = `Total messages -\n`;
		const usage = await new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).getLb('msg');
		usage.sort((a, b) => b.total - a.total);
		for (let i = 0; i < 3; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i].total}\`\n`;
		}
		res += `\nDaily messages-\n`;
		usage.sort((a, b) => b.daily - a.daily);
		for (let i = 0; i < 3; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i].daily}\`\n`;
		}
		res += `\nWeekly messages-\n`;
		usage.sort((a, b) => b.weekly - a.weekly);
		for (let i = 0; i < 3; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i].weekly}\`\n`;
		}
		res += `\nMonthly messages-\n`;
		usage.sort((a, b) => b.monthly - a.monthly);
		for (let i = 0; i < 3; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i].monthly}\`\n`;
		}
		await msg.reply(res);
	} else if (
		args[0].toLowerCase() == 'wins' ||
		args[0].toLowerCase() == 'win'
	) {
		if (!args[1]) return msg.reply('Provide name of the game');
		const game = args[1].toLowerCase();
		const usage = await new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).getLb('wins');
		const games = [
			'wordle',
			'greentea',
			'blacktea',
			'trivia',
			'typerace',
			'redtea',
			'yellowtea',
			'pinktea',
			'chesspuzzle',
			'hangman',
			'crossword',
		];
		let foundCommand = client.commands.get(game);
		if (!foundCommand) {
			const foundalias = client.aliases.get(game);
			if (!foundalias) return msg.reply('Command not found');
			foundCommand = client.commands.get(foundalias);
		}
		if (!foundCommand || !games.includes(foundCommand.name.toLowerCase()))
			return msg.reply('Game not found');
		let res = `Most ${foundCommand.name} wins-\n\n`;
		usage.sort(
			(a, b) =>
				b[foundCommand.name.toLowerCase()] - a[foundCommand.name.toLowerCase()]
		);
		const count = usage.length < 5 ? usage.length : 5;
		for (let i = 0; i < count; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i][foundCommand.name.toLowerCase()]}\`\n`;
		}
		return msg.reply(res);
	} else {
		const cmd = args[0].toLowerCase();
		let foundCommand = client.commands.get(cmd);
		if (!foundCommand) {
			const foundalias = client.aliases.get(cmd);
			if (!foundalias) return msg.reply('Command not found');
			foundCommand = client.commands.get(foundalias);
		}
		if (!foundCommand) return msg.reply('Command not found');
		const usage = await new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).getLb('cmd', foundCommand.name);
		usage.sort((a, b) => b.cmd - a.cmd);
		let res = `Most ${foundCommand.name} uses-\n\n`;

		const count = usage.length < 5 ? usage.length : 5;
		for (let i = 0; i < count; i++) {
			const user = await client.getContactById(`${usage[i].name}@c.us`);
			res += `${i + 1}. ${user.name || user.number} - \`${usage[i].cmd}\`\n`;
		}
		return msg.reply(res);
	}
}
