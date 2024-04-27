import pkg from 'whatsapp-web.js';
import { JsonDB, Config } from 'node-json-db';
import { type truthordateapi } from '../../types/games.js';

const db = new JsonDB(
	new Config('./src/commands/utils/dare.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./dare');

async function getQuestion(): Promise<truthordateapi> {
	const question = questions.splice(
		Math.floor(Math.random() * questions.length),
		1
	)[0];
	if (questions.length == 0) {
		questions = await db.getData('./dare');
	}
	return question;
}
export const name = 'dare';
export const args = true;
export const aliases = ['d'];
export const description = 'Get a dare';
export const category = 'General';

const { Client, LocalAuth, MessageMedia } = pkg;
/**
 * Provides "Dare" prompts from a JSON database. 
 * 
 * This command retrieves dares from 'dare.json' and sends a random one to the chat. 
 *
 * **Usage:**
 * - `!dare` or `!d` - Sends a "Dare" prompt to the chat. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const res: truthordateapi = await getQuestion();
	return msg.reply(res.question);
}
