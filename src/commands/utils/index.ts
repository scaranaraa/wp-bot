import { randomUUID } from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import pkg from 'whatsapp-web.js';
import { convertOggToWav } from './audio-helper.js';
import { handleAudioMessageWithWhisperApi } from './whisper-api.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export async function handleAudioMessage(
	media: pkg.MessageMedia,
	message: pkg.Message,
	streamingReply: pkg.Message
) {
	const { data } = media;
	const tempdir = os.tmpdir();
	const filename = randomUUID();
	const oggPath = path.join(tempdir, `${filename}.ogg`);
	const wavPath = path.join(tempdir, `${filename}.wav`);

	fs.writeFileSync(oggPath, Buffer.from(data, 'base64'));
	await convertOggToWav(oggPath, wavPath);

	const newMessageBody = `[system](#additional_instructions)\n
    The user has sent an audio message, here is the transcription:`;

	let transcribedAudio;

	try {
		transcribedAudio = await handleAudioMessageWithWhisperApi(wavPath);
	} catch (error) {
		console.error(error);
		throw new Error('Error transcribing audio');
	}

	streamingReply.edit(`Transcription:\n ${transcribedAudio}\n\n`);

	return `${newMessageBody} ${transcribedAudio}`;
}
