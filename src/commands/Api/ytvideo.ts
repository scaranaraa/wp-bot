import ytdl from 'ytdl-core'
import pkg2, { type Client, type Message } from 'whatsapp-web.js';
import {createWriteStream} from 'fs'
const { MessageMedia } = pkg2;

export const name = 'ytvideo';
export const args = true;
export const aliases = ['video', 'vid', 'ytv'];
export const description = 'Download any youtube video upto 30 minutes';
export const category = 'API';
/**
 * @memberof! API
 * @name ytvideo
 * @description
 * Downloads YouTube videos and sends them or provides a link within WhatsApp. 
 * 
 * **Usage:**
 * - `!ytvideo {YouTube URL}` - Downloads the video from the provided URL and attempts to send it or provides a link. 
 *
 * **Notes:** 
 * - Videos longer than 30 minutes may not be downloaded due to API limitations.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (!args.length) {
		return msg.reply('Provide youtube url');
	}

	const url = args.join()
	if(!ytdl.validateURL(url)) return msg.reply("Invalid url dumbass")
	
	ytdl(args.join(), {quality: 'lowest'})
	.pipe(createWriteStream('./src/commands/utils/video.mp4')).once("finish", async () => {

		try {
			const media = MessageMedia.fromFilePath('./src/commands/utils/video.mp4')
			await msg.reply(media)
		}
		catch (err) {
			await msg.reply(`An error occured : ${clean(err)}`)
		}

	})
}

function clean(text: unknown): string {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return String(text);
}
