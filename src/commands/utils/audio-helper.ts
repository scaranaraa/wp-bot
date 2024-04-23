import fs from 'fs';
import pkg from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';

const { path } = pkg;
Ffmpeg.setFfmpegPath(path);
export async function convertOggToWav(oggPath: string, wavPath: string) {
	return new Promise((resolve, reject) => {
		Ffmpeg(oggPath)
			.toFormat('wav')
			.audioFrequency(16000) // Set the sample rate to 16 kHz
			.outputOptions('-acodec pcm_s16le')
			.output(wavPath)
			.on('end', () => {
				// This code will execute when the conversion is successful
				try {
					// Deletes the ogg file as it is no longer needed
					fs.unlinkSync(oggPath);
					resolve(undefined);
				} catch (error) {
					reject(error);
				}
			})
			.on('error', reject)
			.run();
	});
}

export async function convertwavtomp3(oggPath: string, wavPath: string) {
	return new Promise((resolve, reject) => {
		Ffmpeg(oggPath)
			.toFormat('mp3')
			.audioFrequency(16000) // Set the sample rate to 16 kHz
			.output(wavPath)
			.on('end', () => {
				// This code will execute when the conversion is successful
				try {
					// Deletes the ogg file as it is no longer needed
					fs.unlinkSync(oggPath);
					resolve(undefined);
				} catch (error) {
					reject(error);
				}
			})
			.on('error', reject)
			.run();
	});
}
