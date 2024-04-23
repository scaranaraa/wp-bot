import { type Client, Contact, type Message } from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

export const name = 'stats';
export const args = true;
export const aliases = ['me'];
export const description = 'Check your wins and commands ran';
export const category = 'General';
export async function run(client: Client, msg: Message, args: string[]) {
	if (args.length && args[0] == 'global') {
		let res = `Global command usage\n\n`;
		const usage = new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).users.get(`${process.env.PHONE}`).commands;
		usage.forEach((value, key) => {
			res += `${cp(key)} - \`${value}\`\n`;
		});
		await msg.reply(res);
		return;
	}

	let member;
	const curruser = await msg.getContact();
	const mentions = await msg.getMentions();
	if (mentions.length) {
		member =
			mentions[0].number == `${process.env.PHONE}`
				? mentions[1] || curruser
				: mentions[0];
		const foundUser = client.cachedUsers.get(member.number);
		if (!foundUser) {
			client.cachedUsers.set(
				member.number,
				await new baseuser({ userId: member.number }).findOrCreate()
			);
		}
	} else {
		member = await msg.getContact();
	}
	const user = new baseuser({
		userId: member.number,
		users: client.cachedUsers,
	}).users.get(member.number);
	let res = `Stats for ${member.name || member.number}\n\n`;

	res += `Wordle wins - \`${user.wordle}\`\n`;
	res += `Hangman wins - \`${user.hangman}\`\n`;
	res += `Blacktea wins - \`${user.blacktea}\`\n`;
	res += `Greentea wins - \`${user.greentea}\`\n`;
	res += `Yellowtea wins - \`${user.yellowtea}\`\n`;
	res += `Redtea wins - \`${user.redtea}\`\n`;
	res += `Crossword wins - \`${user.crossword}\`\n`;
	res += `Pinktea wins - \`${user.pinktea}\`\n`;
	res += `Trivia questions answered - \`${user.trivia}\`\n`;
	res += `Typereace wins - \`${user.typerace}\`\n`;
	res += `Chess Puzzle ELO - \`${user.puzzleELO}\`\n`;

	res += `\nCommand usage\n\n`;
	const { commands } = user;
	commands.forEach((value, key) => {
		res += `${cp(key)} - \`${value}\`\n`;
	});
	await msg.reply(res);
}
function cp(string: string): string {
	if (!string) return 'Lorem ipsum';
	return string.charAt(0).toUpperCase() + string.slice(1);
}
