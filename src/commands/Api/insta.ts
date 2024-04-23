import axios from 'axios';
import pkg2, { type Client, type Message } from 'whatsapp-web.js';

const { MessageMedia } = pkg2;

export const name = 'instagram';
export const args = true;
export const aliases = ['insta', 'ig'];
export const description =
	'Download any form of content available on instagram on a public account';
export const category = 'API';
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply('Provide instagram url');
	}

	const chat = await msg.getChat();
	if (!args[0].includes('https') || !args[0].includes('in')) {
		return msg.reply('Invalid url');
	}

	let res: any = await fetch(
		`https://api.lolhuman.xyz/api/instagram?apikey=${process.env.LOL_API}&url=${args[0]}`
	);
	res = await res.json();
	if (res.status != 200) {
		return msg.reply('Not found :(');
	}

	if (res.result == 0) {
		return msg.reply('Not found :(');
	}

	if (res.result) {
		for (let i = 0; i < res.result.length; i++) {
			const vid = await MessageMedia.fromUrl(res.result[i], {
				unsafeMime: true,
			});
			if (vid.filesize && vid.filesize > 49060288) {
				await msg.reply(
					'video too big to send/invalid file size, view as link'
				);
				const tiny = await axios.get(
					`https://tinyurl.com/api-create.php?url=${res.result[i]}`
				);
				const tinyUrl = tiny.data;
				await msg.reply(tinyUrl);
				continue;
			}

			try {
				await msg.reply(vid);
			} catch (e) {
				try {
					vid.mimetype = 'video';
					await msg.reply(vid);
				} catch (e) {
					const tiny = await axios.get(
						`https://tinyurl.com/api-create.php?url=${res.result[i]}`
					);
					const tinyUrl = tiny.data;
					await msg.reply(tinyUrl);
				}
			}
		}
	}
}
