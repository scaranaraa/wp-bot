import { client } from '@gradio/client';
import { createRequire } from 'node:module';
import pkg from 'whatsapp-web.js';

const require = createRequire(import.meta.url);
global.EventSource = require('eventsource');

const app = await client(
	'https://playgroundai-playground-v2-5.hf.space/--replicas/ugwjt/',
	{}
);
const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'img';
export const args = true;
export const aliases = ['draw', 'create'];
export const description = 'Create an image using stable diffusion';
export const category = 'HuggingFace';
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (!args.length) {
		return;
	}

	const result: any = await app.predict('/run', [
		`${args.join(' ')}`, // string  in 'Prompt' Textbox component
		'deformed iris, deformed pupils, deformed mouse, deformed nose, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs', // string  in 'Negative prompt' Textbox component
		true, // boolean  in 'Use negative prompt' Checkbox component
		0, // number (numeric value between 0 and 2147483647) in 'Seed' Slider component
		1024, // number (numeric value bet ween 256 and 1536) in 'Width' Slider component
		1024, // number (numeric value between 256 and 1536) in 'Height' Slider component
		5, // number (numeric value between 0.1 and 20) in 'Guidance Scale' Slider component
		true, // boolean  in 'Randomize seed' Checkbox component
	]);
	if (!result) {
		return msg.reply('error');
	}

	const media = await MessageMedia.fromUrl(
		`https://playgroundai-playground-v2-5.hf.space/--replicas/ugwjt/file=${result.data[0][0].image.path}`
	);
	return msg.reply(media);
}
// https://playgroundai-playground-v2-5.hf.space/--replicas/apmyw/file=/tmp/gradio/e7e0986095a5bfb89b7c9506b26e36b115d1355b/272fa573-bf4c-40ca-90ce-69a98b204f92.png
