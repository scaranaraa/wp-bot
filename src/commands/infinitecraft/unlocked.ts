import { JsonDB, Config } from 'node-json-db';

import pkg from 'whatsapp-web.js';

const db = new JsonDB(
	new Config('./src/commands/utils/unlocked.json', true, true, '/')
);
export const name = 'unlocked';
export const args = true;
export const aliases = ['unl'];
export const description = 'Check all unlocked recipies';
export const category = 'InfiniteCraft';
const { Client, LocalAuth, MessageMedia } = pkg;
/**
 * @memberof! module:InfiniteCraft
 * @name unlocked
 * @description
 * Displays a list of unlocked recipes in the Infinite Craft game.
 * 
 * **Usage:**
 * - `!unlocked` or `!unl` - Shows the list of unlocked recipes, grouped by the first letter.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	await db.reload();
	let res = '';
	const crafts = await db.getData('/crafts');
	let a = 0;
	crafts.sort((a: any, b: any) => a.result.localeCompare(b.result));
	const alphabets = [
		'*',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];
	res += `${alphabets[0]}\n\n`;
	crafts.forEach((craft: any) => {
		if (!isLetter(craft.result[0])) {
			// a
		} else if (craft.result[0].toUpperCase() != alphabets[0]) {
			alphabets.shift();
			res += `\n\n${alphabets[0]}\n\n`;
		}

		if (a % 3 == 0) {
			res += `${craft.result}${craft.emoji} | `;
		} else {
			res += `${craft.result}${craft.emoji}\n`;
		}

		a++;
	});
	while (res.length > 0) {
		await msg.reply(res.slice(0, 4096));
		res = res.slice(4096);
	}
}

function isLetter(str: string) {
	return str.length === 1 && /[a-z]/i.exec(str);
}
