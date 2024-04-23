import fs from 'fs';
import { openai } from './openai.js';

export async function handleAudioMessageWithWhisperApi(wavPath: string) {
	try {
		const language = '';
		const transcription = await openai.audio.transcriptions.create({
			model: 'whisper-1',
			file: fs.createReadStream(wavPath),
			language,
		});
		return transcription.text;
	} finally {
		try {
			fs.unlinkSync(wavPath); // Delete the WAV file
		} catch (error) {
			console.error('Error deleting WAV file:', error);
		}
	}
}
