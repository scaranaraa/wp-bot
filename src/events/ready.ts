/**
 * @name ready
 * @memberof Client
 * Executes tasks when the WhatsApp bot is ready. 
 *
 *  once the bot is connected and ready, it will begin 
 * - Caching the bot's user profile.
 * - scheduling pending reminders.
 * - sheduling daily, weekly, and monthly tasks for resetting message counts
*/

import { JsonDB, Config } from 'node-json-db';
import { scheduleJob } from 'node-schedule';
import client from '../../index.js';
import baseuser from '../models/baseuser.js';



const db = new JsonDB(
	new Config('./src/commands/utils/rm.json', true, true, '/')
);

const msgcountdb = new JsonDB(
	new Config('./src/commands/utils/msgreset.json', true, true, '/')
);

console.log('Client is ready!');

// change to bots phone number
// TODO - use redis
const foundUser = client.cachedUsers.get(`${process.env.PHONE}`);
if (!foundUser) {
	client.cachedUsers.set(
		`${process.env.PHONE}`,
		await new baseuser({ userId: `${process.env.PHONE}` }).findOrCreate()
	);
}

// ONLY use if very few people use the bot
const frequsers = await msgcountdb.getData('/users');
for (const number of frequsers) {
	const foundUser = new baseuser({ userId: number, users: client.cachedUsers });
	if (!foundUser.checkCached()) await foundUser.cache();
}

const r = await db.getData('/rms');
for (const dat of r) {
	const idx = await db.getIndex('/rms', dat.time, 'time');
	if (dat.time < Date.now()) {
		try {
			await dat.resmsg.reply(dat.message, dat.ch);
		} catch (e) {
			await client.sendMessage(dat.ch, dat.message);
		}

		await db.delete(`/rms[${idx}]`);
	} else {
		const d = new Date(dat.time);
		scheduleJob(d, async () => {
			try {
				await dat.resmsg.reply(dat.message, dat.ch);
			} catch (e) {
				await client.sendMessage(dat.ch, dat.message);
			}

			await db.delete(`/rms[${idx}]`);
		});
	}
}

// not good for a large number of users
const dailyTask = scheduleJob('0 0 * * *', async function () {
	await msgcountdb.reload();
	const users = await msgcountdb.getData('/users');
	for (const number of users) {
		const foundUser = new baseuser({
			userId: number,
			users: client.cachedUsers,
		});
		if (!foundUser.checkCached()) await foundUser.cache();
		await foundUser.resetmsg('daily');
	}
});

const weeklyTask = scheduleJob('0 0 * * 1', async function () {
	await msgcountdb.reload();
	const users = await msgcountdb.getData('/users');
	for (const number of users) {
		const foundUser = new baseuser({
			userId: number,
			users: client.cachedUsers,
		});
		if (!foundUser.checkCached()) await foundUser.cache();
		await foundUser.resetmsg('weekly');
	}
});

const monthlyTask = scheduleJob('0 0 1 * *', async function () {
	await msgcountdb.reload();
	const users = await msgcountdb.getData('/users');
	for (const number of users) {
		const foundUser = new baseuser({
			userId: number,
			users: client.cachedUsers,
		});
		if (!foundUser.checkCached()) await foundUser.cache();
		await foundUser.resetmsg('monthly');
	}
});
