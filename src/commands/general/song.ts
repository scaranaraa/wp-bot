// @ts-ignore
import yts from 'yt-search';
// @ts-ignore
import DownloadYTFile from 'yt-dl-playlist';
import pkg2, { type Client, type Message } from 'whatsapp-web.js';
import pkg from '@ffmpeg-installer/ffmpeg';

const { MessageMedia } = pkg2;
const { path } = pkg;

const downloader = new DownloadYTFile({
	outputPath: './src/commands/utils',
	ffmpegPath: path,
	/**
	 * For some reason, parallel downloads mades the bot crash
	 */
	maxParallelDownload: 1,
});

export const name = 'youtube';
export const args = true;
export const aliases = ['audio', 'yt'];
export const description = 'Download audio from youtube';
export const category = 'General';
export async function run(client: Client, msg: Message, args: string[]) {
	if (client.downloading) {
		return msg.reply('a video is currently downloading');
	}

	client.downloading = true;
	const input = args.join(' ');
	if (!input || input.length < 2) {
		client.downloading = false;
		return msg.reply('invalid query');
	}

	const searchOptions = {
		query: input,
		pageStart: 1,
		pageEnd: 3,
	};
	const { videos } = await yts(searchOptions);
	if (videos.length === 0) {
		client.downloading = false;
		return msg.reply('video not found');
	}

	const { videoId, title, duration } = videos[0];
	await msg.reply(`Song: ${title}\nDuration: ${duration}\nDownloading...`);
	if (duration.seconds > 900) {
		client.downloading = false;
		return msg.reply('video is too long');
	}

	await downloader.download(videoId, 'downloadedaudio.mp3');
	const media = MessageMedia.fromFilePath(
		'./src/commands/utils/downloadedaudio.mp3'
	);
	await msg.reply(media);
	client.downloading = false;
}
