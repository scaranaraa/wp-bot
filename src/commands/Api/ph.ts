import axios from 'axios';
import pkg2, { type Client, type Message } from 'whatsapp-web.js';
import fs from 'fs';
import pkg from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';

const { path } = pkg;
Ffmpeg.setFfmpegPath(path);
export async function convertOggToWav(path: string) {
	return new Promise((resolve, reject) => {
		Ffmpeg(path)
			.toFormat('mp4')
			.output('./src/commands/utils/test.mp4')
			.on('end', () => {
				try {
					resolve(undefined);
				} catch (error) {
					reject(error);
				}
			})
			.on('error', reject)
			.run();
	});
}

const { MessageMedia } = pkg2;

export const name = 'Pornhub';
export const args = true;
export const aliases = ['ph'];
export const description = 'shhhh';
export const category = 'API';
/**
 * @memberof! API
 * @name pornhub
 * @description
 * Downloads content from a public Pornhub video and sends them or provides links within WhatsApp.
 * 
 * **Usage:**
 * - `!ph {Pornhub post URL}` - Downloads media content from the provided Pornhub video and attempts to send it or provides links. 
 * 
 * **Notes:**
 * - This command requires an API key for 'lolhuman.xyz'.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply('Provide url');
	}
	if (!args[0].includes('https')) {
		return msg.reply('Invalid url');
	}
	let res: any = await fetch(
		`https://api.lolhuman.xyz/api/pornhub?apikey=${process.env.LOL_API}&url=${args[0]}`
	);
	res = await res.json();
	if (res.status != 200) {
		return msg.reply('Not found :(');
	}

	try {
		const thumbnail = await MessageMedia.fromUrl(res.result.thumb);
		await msg.reply(thumbnail, undefined, {
			caption: `${res.result.title}\nDownloading..`,
		});
	} catch (e) {}
	for (let i = 0; i < res.result.media.length; i++) {
		if (
			res.result.media[i].quality == 480 &&
			res.result.media[i].format != '480p'
		) {
			await convertOggToWav(res.result.media[i].url);
			const media = MessageMedia.fromFilePath('./src/commands/utils/test.mp4');
			await msg.reply(media);
			break;
		}
	}
}
