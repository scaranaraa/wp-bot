import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'search';
export const args = true;
export const aliases = ['song'];
export const description = 'Search for a song';
export const category = 'Shazam';
/**
 * Searches for a song using the Shazam API. 
 *
 * **Usage:**
 * - `!search {song name or Shazam ID}` - Searches for the specified song and returns information including title, artist, and album.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (!args.length) {
		return;
	}

	const { shazam } = client;
	const song = args.join(' ');
	let response: any;
	if (!isNaN(parseInt(song))) {
		response = await shazam.track_info('en-US', 'GB', `${song}`);
	} else {
		response = await shazam.search_music('en-US', 'GB', song, '1', '0');
		if (!response) {
			return msg.reply('No song found');
		}

		response = response.tracks.hits[0];
	}

	if (!response) {
		return msg.reply('No song found');
	}

	const media = await MessageMedia.fromUrl(
		response.images.default || response.images.background
	);
	await msg.reply(media, undefined, { caption: response.share.text });
}
