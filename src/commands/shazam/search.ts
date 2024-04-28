import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'search';
export const args = true;
export const aliases = ['song'];
export const description = 'Search for a song';
export const category = 'Shazam';
/**
 * Searches for a song using the Shazam API then downloads it from YouTube. 
 *
 * **Usage:**
 * - `!search {song name or Shazam ID}` - Searches for the specified song and returns information including title, artist, and album.
 * - `!search {song name of Shazam ID} --n` Only searches the song and returns information, skips downloadings.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (!args.length) {
		return;
	}
	let download = true
	const { shazam } = client;
	if(args.includes('--n')){
		download = false
	}
	const song = args.join(' ');
	if(!download) song.replace('--n','')
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
	try{
		await msg.reply(media, undefined, { caption: response.share.text });
	}
	catch {
		await msg.reply(response.share.text)
	}
	if(download) await client.commands.get('youtube').run(client,msg, [response.share.text])
}
