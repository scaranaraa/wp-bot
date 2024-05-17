import pkg, {  Contact, type Message } from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';
const { Client, LocalAuth, MessageMedia } = pkg;

import {generate} from 'wordcloud-generator'
export const name = 'Words';
export const args = true;
export const aliases = ['word','words'];
export const description = 'Check number of words by a user';
export const category = 'General';
/**
 * @memberof! module:General
 * @name words
 * @description
 * Displays word count statistics for a user or globally within the WhatsApp chat.
 *
 * **Usage:**
 * - `!words` or `!word` - Shows the word count for the user who sent the command. 
 * - `!words @user` - Shows the word count for the mentioned user. 
 * - `!words global` - Shows the global word count for the entire chat. 
 * - `!words graph or !words g` - Shows the words in a wordcloud graph.
 */
export async function run(client: pkg.Client, msg: Message, args: string[]) {
	if (args.length && args[0] == 'global') {
		let res = `Most used words globally\n\n`;
		const usage = new baseuser({
			userId: `${process.env.PHONE}`,
			users: client.cachedUsers,
		}).users.get(`${process.env.PHONE}`).words;

		if(args[1] == 'graph' || args[1] == 'g'){
			let userarr = Array.from(usage);
			userarr.sort((a, b) => b[1] - a[1]);
			userarr = userarr.slice(0, 300);
			let newarr: Map<string, number> = new Map()
			for(const res of userarr){
				newarr.set(res[0], res[1])
			}
			await generate(newarr,true,'src/commands/utils/graph.png')
			const media = MessageMedia.fromFilePath('src/commands/utils/graph.png')
			return await msg.reply(media)
		}

		let userarr = Array.from(usage);
		userarr.sort((a, b) => b[1] - a[1]);
		userarr = userarr.slice(0, 11);

		for (const [word, count] of userarr) {
			if(word == '') continue
			res += `*${word}* - \`${count}\`\n`;
		}

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
	}).users.get(member.number).words;

	if(args[0] == 'graph' || args[0] == 'g'){
		let userarr = Array.from(user);
			userarr.sort((a, b) => b[1] - a[1]);
			userarr = userarr.slice(0, 300);
			let newarr: Map<string, number> = new Map()
			for(const res of userarr){
				newarr.set(res[0], res[1])
			}
		await generate(newarr,true,'src/commands/utils/graph.png')
		const media = MessageMedia.fromFilePath('src/commands/utils/graph.png')
		return await msg.reply(media)
	}

	let userarr = Array.from(user);
	userarr.sort((a, b) => b[1] - a[1]);
	userarr = userarr.slice(0, 11);
	let res = `Most used words for ${member.name || member.number}\n\n`;

	for (const [word, count] of userarr) {
		if(word == '') continue
		res += `*${word}* - \`${count}\`\n`;
	}

	await msg.reply(res);
}	
