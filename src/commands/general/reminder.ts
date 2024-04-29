import parse from 'parse-duration';
import { JsonDB, Config } from 'node-json-db';
import { scheduleJob } from 'node-schedule';
import prettyMilliseconds from 'pretty-ms';
import { type Client, type Message } from 'whatsapp-web.js';

const db = new JsonDB(
	new Config('./src/commands/utils/rm.json', true, true, '/')
);

export const name = 'reminder';
export const args = true;
export const aliases = ['remind', 'rm'];
export const description = 'Set a reminder';
export const category = 'General';
/**
 * @memberof! module:General
 * @name reminder
 * @description
 * Sets reminders for users within a WhatsApp chat. 
 * 
 * **Usage:**
 * - `!reminder {time duration} {message}` - Sets a reminder (e.g., `!reminder 1h30m Call John`).
 * - `!reminder list` - Displays a list of the user's active reminders.
 * 
 * **Notes:**
 * - Time durations can be specified using various formats (e.g., 1h, 30m, 2d).
 */
export async function run(client: Client, msg: Message, args: string[]) {
	if (args.length == 0) {
		return;
	}

	const date = Date.now();
	args[0] = args[0].toLowerCase();
	const member = await msg.getContact();
	if (args[0] == 'list') {
		const list = await db.getData('/rms');
		let reply = 'Your reminders:\n';
		for (const dat of list) {
			const message = dat.message.split('"');
			reply += `${message[1]} - $${prettyMilliseconds(parseInt(message[2].replace('ago', '').trim()))}`;
		}

		return msg.reply(reply);
	}

	if (args[0] == 'del' || args[0] == 'remove' || args[0] == 'delete') {
		// todo
		return;
	}

	// @ts-ignore
	let rmtime = parse(args[0], 'millisecond');
	if (!rmtime) {
		return msg.reply('invalid time format');
	}

	if (rmtime > 2147483647000) {
		rmtime = 2147483647000;
	}

	const strtime = prettyMilliseconds(rmtime);
	args.shift();
	if (args.length == 0) {
		args.push('something');
	}

	await msg.reply(`I'll remind you about ${args.join(' ')} in ${strtime}`);
	const res = {
		num: member.number,
		time: date + rmtime,
		message: `You asked to be reminded of "${args.join(' ')}" ${strtime} ago`,
		resmsg: msg,
		ch: member.id._serialized,
	};
	db.push('/rms[]', res);
	const d = new Date(date + rmtime);
	scheduleJob(d, async () => {
		try {
			await res.resmsg.reply(res.message, res.ch);
		} catch (e) {
			console.log(e);
			await client.sendMessage(res.ch, res.message);
		}

		const idx = await db.getIndex('/rms', res.time, 'time');
		await db.delete(`/rms[${idx}]`);
	});
}
