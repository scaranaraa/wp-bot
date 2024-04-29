import { canvacord } from 'canvacord';

import pkg from 'whatsapp-web.js';

const { MessageMedia } = pkg;
const defaultpfp =
	'https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';

export const name = 'kiss';
export const args = true;
export const aliases: string[] = [];
export const description = 'Kiss someone';
export const category = 'Image';
/**
 * @memberof! Image
 * @name kiss
 * @description
 * Generate modified image of a members pfp
 * 
 * **Usage:**
 * - `!kiss {user}` - Generates kissing image of users pfp
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	const u1 = await msg.getContact();
	const url1 = await u1.getProfilePicUrl();

	const mentions = await msg.getMentions();
	let mentioneduser = mentions.pop();
	if (mentioneduser?.number === `${process.env.PHONE}`) {
		mentioneduser = mentions.pop();
	}

	if (!mentioneduser) {
		mentioneduser = u1;
	}

	const url2 = await mentioneduser.getProfilePicUrl();
	const spanked = await canvacord.kiss(url2 || defaultpfp, url1 || defaultpfp);
	// @ts-ignore
	const media = new MessageMedia('image/png', spanked.toString('base64'));
	await client.sendMessage(chat.id._serialized, media);
}
