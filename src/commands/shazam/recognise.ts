import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'shazam';
export const args = true;
export const aliases = ['identify', 'id', 'sh', 'recognise'];
export const description = 'Identify any song in a video/audio';
export const category = 'Shazam';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (!msg.hasQuotedMsg && !msg.hasMedia) {
		return msg.reply('No media found');
	}

	let media;

	if (msg.hasMedia) {
		media = await msg.downloadMedia();
	} else {
		const quoted = await msg.getQuotedMessage();
		if (!quoted.hasMedia) {
			return msg.reply('No media found');
		}

		media = await quoted.downloadMedia();
	}

	if (!media.mimetype.includes('audio') && !media.mimetype.includes('video')) {
		return msg.reply('Invalid media');
	}

	const { shazam } = client;
	if (media.mimetype.includes('audio')) {
		// @ts-ignore
		await media.toFilePath('./src/commands/utils/node_shazam_temp.mp3');
	} else {
		// @ts-ignore
		await media.toFilePath('./src/commands/utils/node_shazam_temp.mp4');
	}

	let recognise: any;
	if (media.mimetype.includes('audio')) {
		recognise = await shazam.recognise(
			'./src/commands/utils/node_shazam_temp.mp3'
		);
	} else {
		recognise = await shazam.recognise(
			'./src/commands/utils/node_shazam_temp.mp4'
		);
	}

	let _a;
	let _b;

	if (!recognise) {
		return msg.reply('Not found');
	}

		const image = await MessageMedia.fromUrl(recognise.track.images.background);
	

	const trackData = recognise.track;
	const mainSection = trackData.sections.find((e: any) => e.type === 'SONG');
	const { title } = trackData;
	const artist = trackData.subtitle;
	const album =
		(_a = mainSection.metadata.find((e: any) => e.title === 'Album')) ===
			null || _a === void 0
			? void 0
			: _a.text;
	const year =
		(_b = mainSection.metadata.find((e: any) => e.title === 'Released')) ===
			null || _b === void 0
			? void 0
			: _b.text;
	try{
		await msg.reply(image, undefined, {
		caption: `${title}\n\n*Artist* - ${artist}\n\n*Album* - ${album}`,
	});
	}
	catch{
		await msg.reply(`${title}\n\n*Artist* - ${artist}\n\n*Album* - ${album}`);
	}
	await msg.reply(`Shazam song ID - ${recognise.matches[0].id}`);

	const related = await shazam.related_songs(
		'en-US',
		'GB',
		`${recognise.matches[0].id}`,
		'0',
		'3'
	);
	let relatedsongs = 'Related songs -\n\n';
	// @ts-ignore
	related.tracks.forEach(song => (relatedsongs += `${song.title}\n`));
	await msg.reply(relatedsongs);
}
