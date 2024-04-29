import pkg2 from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
import pkg from 'whatsapp-web.js';

const { path } = pkg2;
Ffmpeg.setFfmpegPath(path);

const { MessageMedia } = pkg;

export const name = 'kick';
export const args = true;
export const aliases: string[] = [];
export const description = 'Kick someone';
export const category = 'Image';
/**
 * @memberof! Image
 * @name kick
 * @description
 * Get a random anime gif for kicking someone
 * 
 * **Usage:**
 * - `!kick {user}` - Gets a random kicking GIF
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

	let media = await MessageMedia.fromUrl(
		`https://api.lolhuman.xyz/api/random/sfw/kick?apikey=${process.env.LOL_API}`,
		{ unsafeMime: true }
	);
	// @ts-ignore
	await media.toFilePath('./src/commands/utils/giftemp.gif');
	await convertOggToWav('./src/commands/utils/giftemp.gif');
	media = MessageMedia.fromFilePath('./src/commands/utils/test.mp4');
	await client.sendMessage(chat.id._serialized, media, {
		sendVideoAsGif: true,
		caption: `@${u1.number} kicked @${mentioneduser.number}`,
		mentions: [u1.id._serialized, mentioneduser.id._serialized],
	});
}

export async function convertOggToWav(path: string) {
	return new Promise((resolve, reject) => {
		Ffmpeg()
			.input(path)
			.outputOptions([
				'-movflags faststart',
				'-pix_fmt yuv420p',
				'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
			])
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
