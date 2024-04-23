import { type Client, type Message } from 'whatsapp-web.js';

export const name = 'sticker';
export const args = true;
export const aliases = ['st', 's'];
export const description = 'Convert any media into a sticker';
export const category = 'General';
export async function run(client: Client, msg: Message, args: string[]) {
	if (!msg.hasMedia) {
		return;
	}

	const media = await msg.downloadMedia();
	await msg.reply(media, undefined, { sendMediaAsSticker: true });
}
