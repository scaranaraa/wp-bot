import { type Client, Contact, type Message } from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

export const name = 'Messages';
export const args = true;
export const aliases = ['msg', 'msgs', 'message'];
export const description = 'Check number of messages by a user';
export const category = 'General';
export async function run(client: Client, msg: Message, args: string[]) {
	if (args.length && args[0] == 'global') {
		let res = `Global message count\n\n`;
		const usage = new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).users.get(`${process.env.PHONE}`).msgcount;

		res += `Total messages - \`${usage.total}\`\n\n`;
		res += `Daily messages - \`${usage.daily}\`\n`;
		res += `Weekly messages - \`${usage.weekly}\`\n`;
		res += `Monthly messages - \`${usage.monthly}\``;

		await msg.reply(res);
		return;
	}
	let member;
	let curruser = await msg.getContact();
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
	}).users.get(member.number).msgcount;

	let res = `Message count for ${member.name || member.number}\n\n`;

	res += `Total messages - \`${user.total}\`\n\n`;
	res += `Daily messages - \`${user.daily}\`\n`;
	res += `Weekly messages - \`${user.weekly}\`\n`;
	res += `Monthly messages - \`${user.monthly}\``;

	await msg.reply(res);
}
