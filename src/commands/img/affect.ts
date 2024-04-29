import { canvacord } from 'canvacord';

import pkg from 'whatsapp-web.js';

const { MessageMedia } = pkg;
const defaultpfp =
	'https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';

export const name = 'affect';
export const args = true;
export const aliases: string[] = [];
export const description = 'Get an Affect image on someone';
export const category = 'Image';
/**
 * @memberof! Image
 * @name affect
 * @description
 * Generate modified image of a members pfp
 * 
 * **Usage:**
 * - `!affect {user}` - Generates affected image of users pfp
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	const u1 = await msg.getContact();

	const mentions = await msg.getMentions();
	let mentioneduser = mentions.pop();

	if (mentioneduser?.number === `${process.env.PHONE}`) {
		mentioneduser = mentions.pop();
	}

	if (!mentioneduser) {
		mentioneduser = u1;
	}

	const url2 = await mentioneduser.getProfilePicUrl();
	const spanked = await canvacord.affect(url2 || defaultpfp);
	// @ts-ignore
	const media = new MessageMedia('image/png', spanked.toString('base64'));
	await client.sendMessage(chat.id._serialized, media);
}
