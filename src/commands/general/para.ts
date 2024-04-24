import pkg from 'whatsapp-web.js';
import { JsonDB, Config } from 'node-json-db';
import { type truthordateapi } from '../../types/games.js';

const db = new JsonDB(
	new Config('./src/commands/utils/paranoia.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./paranoia');

async function getQuestion(): Promise<truthordateapi> {
	const question = questions.splice(
		Math.floor(Math.random() * questions.length),
		1
	)[0];
	if (questions.length == 0) {
		questions = await db.getData('./paranoia');
	}
	return question;
}
export const name = 'Paranoia';
export const args = true;
export const aliases = ['pa', 'para'];
export const description = 'Get a paranoia question';
export const category = 'General';

const { Client, LocalAuth, MessageMedia } = pkg;
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const res: truthordateapi = await getQuestion();
	return msg.reply(res.question);
}
