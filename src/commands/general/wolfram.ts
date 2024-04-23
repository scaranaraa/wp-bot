import axios from 'axios';
import pkg2 from 'jimp';
import pkg, { type Message } from 'whatsapp-web.js';

const { read } = pkg2;
const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'wolfram';
export const args = true;
export const aliases = ['wf', 'wm'];
export const description = 'Query WolframAlpha';
export const category = 'General';
export async function run(client: pkg.Client, msg: Message, args: any) {
	args = args.join(' ');
	await wolfram(args, msg);
}

async function wolfram(code: string | number | boolean, msg: pkg.Message) {
	try {
		const url = `https://cors-proxy4.p.rapidapi.com/?url=${encodeURIComponent(`https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(code)}&format=image,imagemap,mathml,plaintext,sound&output=JSON&appid=J4J84J-UPVWXW4UGL`)}`;
		const options = {
			headers: {
				'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
				'X-RapidAPI-Host': 'cors-proxy4.p.rapidapi.com',
			},
		};
		let response: any = await axios.get(url, options);
		response = response.data.queryresult.pods;
		if (!response) {
			await msg.reply(
				'no results found lmao use your brain or phrase the question better'
			);
			return;
		}

		for (let i = 0; i < response.length; i++) {
			for (let j = 0; j < response[i].subpods.length; j++) {
				if (response[i].subpods[j].img) {
					const media = await MessageMedia.fromUrl(
						response[i].subpods[j].img.src,
						{ unsafeMime: true }
					);
					await msg.reply(media, undefined, {
						caption: response[i].subpods[j].text,
					});
				} else if (response[i].subpods[j].text) {
					await msg.reply(response[i].subpods[j].text);
				}
			}
		}

		await msg.reply(response[0].subpods[0].plaintext);
		return response;
	} catch (err) {
		console.log(clean(err));
	}
}

function clean(text: unknown) {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return text;
}
