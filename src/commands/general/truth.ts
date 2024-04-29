import pkg from 'whatsapp-web.js';
import { JsonDB, Config } from 'node-json-db';
import { type truthordateapi } from '../../types/games.js';

const db = new JsonDB(
	new Config('./src/commands/utils/truth.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./truth');

async function getQuestion(): Promise<truthordateapi> {
	const question = questions.splice(
		Math.floor(Math.random() * questions.length),
		1
	)[0];
	if (questions.length == 0) {
		questions = await db.getData('./truth');
	}
	return question;
}

export const name = 'truth';
export const args = true;
export const aliases = ['t'];
export const description = 'Get a truth';
export const category = 'General';

const { Client, LocalAuth, MessageMedia } = pkg;
/**
 * @memberof! module:General
 * @name truth
 * @description
 * Provides "Truth" questions from a JSON database. 
 *
 * This command retrieves questions from 'truth.json' and sends a random one to the chat. 
 *
 * **Usage:**
 * - `!truth` or `!t` - Sends a "Truth" question to the chat. 
 */ 
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const res: truthordateapi = await getQuestion();
	return msg.reply(res.question);
}
