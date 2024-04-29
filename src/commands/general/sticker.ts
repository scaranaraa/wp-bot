import { type Client, type Message } from 'whatsapp-web.js';

export const name = 'sticker';
export const args = true;
export const aliases = ['st', 's'];
export const description = 'Convert any media into a sticker';
export const category = 'General';
/**
 * @memberof! General
 * @name sticker
 * @description
 * Converts a media message (image, video, GIF) into a sticker. 
 *
 * **Usage:**
 * - Reply to a media message with `!sticker` or `!st` to convert it into a sticker.
 */ 
export async function run(client: Client, msg: Message, args: string[]) {
	if (!msg.hasMedia) {
		return;
	}

	const media = await msg.downloadMedia();
	await msg.reply(media, undefined, { sendMediaAsSticker: true });
}
