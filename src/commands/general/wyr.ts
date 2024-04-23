import pkg from 'whatsapp-web.js';
import { type truthordateapi } from '../../types/games.js';

import { JsonDB, Config } from 'node-json-db';

const db = new JsonDB(
	new Config('./src/commands/utils/wyr.json', true, true, '/')
);

let questions: truthordateapi[] = await db.getData('./wyr') 

async function getQuestion(): Promise<truthordateapi> {

	const question = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
	if(questions.length == 0){
		questions = await db.getData('./wyr')
	}
	return question

}
export const name = 'Would You Rather';
export const args = true;
export const aliases = ['rather', 'wyr'];
export const description = 'Get a Would You Rather question';
export const category = 'General';

const { Client, LocalAuth, MessageMedia } = pkg;
export async function run(client: pkg.Client,msg: pkg.Message,args: string[]) {

	let res: truthordateapi = await getQuestion();
	return msg.reply(res.question);
	
}
