import Jimp from 'jimp';

import pkg, { type Message } from 'whatsapp-web.js';

const background = await Jimp.read('./src/commands/utils/Image/zback.png');
async function makeimage(word: string) {
	let x = 5;
	let y = 5;
	let cropx = 0;
	for (let i = 0; i < word.length; i++) {
		let letter = word[i];
		switch (letter) {
			case '?':
				letter = 'que';
				break;
			case ' ':
				letter = 'zspace';
				break;
			case ',':
				letter = 'comma';
				break;
			case '.':
				letter = 'fs';
				break;
		}
		let blitimg;
		try {
			if (letter === letter.toLowerCase()) {
				blitimg = await Jimp.read(`./src/commands/utils/Image/${letter}.png`);
			} else {
				blitimg = await Jimp.read(`./src/commands/utils/Image/c${letter}.png`);
			}
		} catch {
			blitimg = await Jimp.read(`./src/commands/utils/Image/zspace.png`);
		}
		await background.blit(blitimg, x, y);
		x += blitimg.getWidth();
		if (x >= background.getWidth() - blitimg.getWidth() - 100) {
			cropx = x;
			x = 5;
			y += 300;
		}
	}
	try {
		await background.crop(0, 0, (cropx || x) + 20, y + 250);
	} catch {}
	return (await background.getBase64Async('image/png')).slice(22);
}

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'write';
export const args = true;
export const aliases = ['handwrite'];
export const description = 'Write letters';
export const category = 'General';
/**
 * @memberof! General
 * @name write
 * @description
 * Generates an image of handwritten text using individual letter images.
 *
 * **Usage:**
 * - `!write {text}` or `!handwrite {text}` - Creates an image of the provided text in a handwritten style. 
 *
 * **Notes:**
 * - Supports letters, numbers, spaces, commas, and periods.
 */
export async function run(client: pkg.Client, msg: Message, args: any) {
	const word = args.join(' ');
	const res = await makeimage(word);
	if (res == 'invalid') {
		return msg.reply('Invalid characters');
	}

	const media = new MessageMedia('image/png', res);
	await msg.reply(media);
}
