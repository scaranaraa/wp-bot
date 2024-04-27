import { JsonDB, Config } from 'node-json-db';
import pkg from 'whatsapp-web.js';

const db = new JsonDB(
	new Config('./src/commands/utils/unlocked.json', true, true, '/')
);

const foundarr: string[] = [];
const alreadycrafted = await db.getData('/crafts');
alreadycrafted.forEach((craft: any) => {
	foundarr.push(craft.result.trim().toLowerCase());
});
const { Client, LocalAuth, MessageMedia } = pkg;
export const name = 'craft';
export const args = true;
export const aliases = ['make', 'join'];
export const description = 'Craft any two times together';
export const category = 'InfiniteCraft';
/**
 * Combines two items in the Infinite Craft game and returns the resulting item, if any. 
 * 
 * **Usage:**
 * - `!craft {item1} + {item2}` or `!craft {item1} , {item2}` - Attempts to craft the two items together.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	const member = await msg.getContact();
	if (args.length == 0) {
		return;
	}

	if (!args.includes('+') && !args.includes(',')) {
		return;
	}

	if (args.includes(',')) {
		const kwargs = args.join(' ');
		args = kwargs.split(' , ');
	} else {
		const kwargs = args.join(' ');
		args = kwargs.split(' + ');
	}

	if (
		!foundarr.includes(args[0].toLowerCase().trim()) ||
		!foundarr.includes(args[1].toLowerCase().trim())
	) {
		return msg.reply('You havent unlocked this');
	}

	fetch(
		`https://neal.fun/api/infinite-craft/pair?first=${encodeURIComponent(args[0].trim())}&second=${encodeURIComponent(args[1].trim())}`,
		{
			headers: {
				accept: '*/*',
				'accept-language': 'en-US,en;q=0.9',
				'cache-control': 'no-cache',
				pragma: 'no-cache',
				'sec-ch-ua':
					'"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				Referer: 'https://neal.fun/infinite-craft/',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			},
		}
	).then(async (res: any) => {
		res = await res.json();
		if (res.result != 'Nothing') {
			if (foundarr.includes(res.result.trim().toLowerCase())) {
				return msg.reply(`${res.result} ${res.emoji}`);
			}
			res.founduser = member.number;
			await db.push('/crafts[]', res);
			foundarr.push(res.result.trim().toLowerCase());
			return msg.reply(`New discovery!\n${res.result} ${res.emoji}`);
		}
		return msg.reply('Not craftable');
	});
}

function cp(string: string): string {
	const str = string.split(' ');
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return str.join(' ');
}
