import pkg from 'whatsapp-web.js';
import { JsonDB, Config } from 'node-json-db';
import { type truthordateapi } from '../../types/games.js';

const db = new JsonDB(
	new Config('./src/commands/utils/wyp.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./wyp');

async function getQuestion(): Promise<truthordateapi> {
	const question = questions.splice(
		Math.floor(Math.random() * questions.length),
		1
	)[0];
	if (questions.length == 0) {
		questions = await db.getData('./wyp');
	}
	return question;
}

export const name = 'Will You Press';
export const args = true;
export const aliases = ['press', 'button', 'wyp'];
export const description = 'Get a question of will you press the button';
export const category = 'General';
const { Client, LocalAuth, MessageMedia } = pkg;
/**
 * @memberof! module:General
 * @name wyp
 * @description
 * Provides "Will You Press the Button" questions from a JSON database. 
 *
 * This command retrieves questions from 'wyp.json' and sends a random one to the chat. 
 *
 * **Usage:**
 * - `!willyoupress` or `!wyp` - Sends a "Will You Press the Button" question to the chat.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const res = await getQuestion();
	msg.reply(res.question);
}
