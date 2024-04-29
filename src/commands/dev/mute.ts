import pkg, { GroupChat } from 'whatsapp-web.js';
import util from 'util';

const { Client, Location, Poll, List, Buttons, LocalAuth, MessageMedia } = pkg;
export const name = 'mute';
export const args = true;
export const aliases = ['shut', 'shutup'];
export const description = 'Make someone be unable to send messages';
export const category = 'Dev';
/**
 * @memberof! module:Dev
 * @name mute
 * @description
 * Mutes or unmutes a mentioned user in a group chat. 
 * 
 * **Usage:**
 * - `!mute @user` - Mutes the mentioned user, preventing them from sending messages.
 * - `!mute @user` (again) - Unmutes the previously muted user.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const mem = await msg.getContact();
	if (msg.fromMe || mem.number == `${process.env.OWNER_NUMBER}`) {
		const member = await msg.getContact();
		const chat = await msg.getChat();
		const mentions = await msg.getMentions();
		if (mentions.length == 0) {
			return;
		}

		let mentioneduser = mentions.pop();
		if (mentioneduser.number == `${process.env.PHONE}`) {
			mentioneduser = mentions.pop();
		}

		if (!mentioneduser) {
			return;
		}

		if (mentioneduser?.number == member.number) {
			return;
		}

		if (client.muted.includes(mentioneduser.number)) {
			client.muted.splice(client.muted.indexOf(mentioneduser.number), 1);
			return msg.reply('Mute removed');
		}

		client.muted.push(mentioneduser.number);
		if (chat.isGroup) {
			try {
				// @ts-ignore
				await chat.demoteParticipants([mentioneduser.id._serialized]);
			} catch (e) {}
		}

		return msg.reply('Muted');
	}
}
