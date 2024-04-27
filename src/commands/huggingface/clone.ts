import { spawn } from 'child_process';
import pkg from 'whatsapp-web.js';
import { randomUUID } from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { convertOggToWav, convertwavtomp3 } from '../utils/audio-helper.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'clone';
export const args = true;
export const aliases = ['say', 'talk'];
export const description = 'Clone someones voice/make the bot say anything';
export const category = 'HuggingFace';
/**
 * Clones a voice from a provided audio message or generates speech from text.
 * 
 * **Usage:**
 * - `!clone {text}` - Generates speech using the default voice.
 * - `!clone {text}` (as a reply to an audio message) - Attempts to clone the voice in the audio message and speak the provided text. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (!args.length) {
		return;
	}

	const chat = await msg.getChat();
	if (!msg.hasQuotedMsg) {
		const pythonProcess = spawn('python', ['./src/commands/utils/say.py'], {
			stdio: ['pipe', 'pipe', 'pipe'],
		});
		pythonProcess.stdin.write(`${args.join(' ')}\n`);
		pythonProcess.stderr.on('data', data => {
			console.error(`Python stderr: ${data}`);
		});
		pythonProcess.stdout.on('data', async data => {
			data = String(data);
			data = data.replace(
				'Loaded as API: https://coqui-xtts.hf.space/--replicas/u03n6/',
				''
			);
			data.replace('\n', '');
			data = data.trim();
			await convertwavtomp3(data, './src/commands/utils/converted.mp3');
			const media2 = MessageMedia.fromFilePath(
				'./src/commands/utils/converted.mp3'
			);
			await client.sendMessage(chat.id._serialized, media2);
		});
	} else {
		const msg2 = await msg.getQuotedMessage();
		if (!msg2.hasMedia) {
			return;
		}

		const media = await msg2.downloadMedia();
		if (media.mimetype?.includes('audio')) {
			const { data } = media;
			const tempdir = os.tmpdir();
			const filename = randomUUID();
			const oggPath = path.join(tempdir, `${filename}.ogg`);
			fs.writeFileSync(oggPath, Buffer.from(data, 'base64'));
			await convertOggToWav(oggPath, './src/commands/utils/abcd.wav');
		}

		const pythonProcess = spawn('python', ['./src/commands/utils/clone.py'], {
			stdio: ['pipe', 'pipe', 'pipe'],
		});
		pythonProcess.stdin.write(`${args.join(' ')}\n`);
		pythonProcess.stderr.on('data', data => {
			console.error(`Python stderr: ${data}`);
		});
		pythonProcess.stdout.on('data', async data => {
			data = String(data);
			data = data.replace(
				'Loaded as API: https://coqui-xtts.hf.space/--replicas/u03n6/',
				''
			);
			data.replace('\n', '');
			data = data.trim();
			await convertwavtomp3(data, './src/commands/utils/converted.mp3');
			const media2 = MessageMedia.fromFilePath(
				'./src/commands/utils/converted.mp3'
			);
			await client.sendMessage(chat.id._serialized, media2);
		});
	}
}
