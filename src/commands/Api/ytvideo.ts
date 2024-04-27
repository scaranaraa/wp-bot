import axios from 'axios';
import pkg2, { type Client, type Message } from 'whatsapp-web.js';

const { MessageMedia } = pkg2;

export const name = 'ytvideo';
export const args = true;
export const aliases = ['video', 'vid', 'ytv'];
export const description = 'Download any youtube video upto 30 minutes';
export const category = 'API';
/**
 * Downloads YouTube videos and sends them or provides a link within WhatsApp. 
 * 
 * **Usage:**
 * - `!ytvideo {YouTube URL}` - Downloads the video from the provided URL and attempts to send it or provides a link. 
 *
 * **Notes:** 
 * - This command requires an API key for 'lolhuman.xyz'.
 * - Videos longer than 30 minutes may not be downloaded due to API limitations.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply('Provide youtube url');
	}

	const chat = await msg.getChat();
	if (!args[0].includes('https') || !args[0].includes('you')) {
		return msg.reply('Invalid url');
	}

	let res: any = await fetch(
		`https://api.lolhuman.xyz/api/ytvideo2?apikey=${process.env.LOL_API}&url=${args[0]}`
	);
	res = await res.json();
	if (res.status != 200) {
		return msg.reply('Error :(');
	}

	const thumbnail = await MessageMedia.fromUrl(res.result.thumbnail, {
		unsafeMime: true,
	});
	await msg.reply(thumbnail, undefined, { caption: res.result.title });
	const vid = await MessageMedia.fromUrl(res.result.link, { unsafeMime: true });
	vid.mimetype = 'video';
	if (!vid.filesize || vid.filesize > 49060288) {
		await msg.reply('video too big to send, view as link');
		const tiny = await axios.get(
			`https://tinyurl.com/api-create.php?url=${res.result.link}`
		);
		const tinyUrl = tiny.data;
		await msg.reply(tinyUrl);
		return;
	}

	try {
		await msg.reply(vid);
	} catch (e) {
		const tiny = await axios.get(
			`https://tinyurl.com/api-create.php?url=${res.result.link}`
		);
		const tinyUrl = tiny.data;
		await msg.reply(tinyUrl);
	}
}
