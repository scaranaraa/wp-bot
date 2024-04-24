import pkg from 'whatsapp-web.js';
import { JsonDB, Config } from 'node-json-db';
import { type truthordateapi } from '../../types/games.js';

const db = new JsonDB(
	new Config('./src/commands/utils/nhie.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./nhie');

async function getQuestion(): Promise<truthordateapi> {
	const question = questions.splice(
		Math.floor(Math.random() * questions.length),
		1
	)[0];
	if (questions.length == 0) {
		questions = await db.getData('./nhie');
	}
	return question;
}
export const name = 'Never Have I Ever';
export const args = true;
export const aliases = ['nh', 'nhie'];
export const description = 'Get a Never Have I Ever question';
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
