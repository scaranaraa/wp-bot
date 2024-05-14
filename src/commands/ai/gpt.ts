

import pkg from 'whatsapp-web.js';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
//@ts-ignore
import swearify  from 'swearify'
const endpoint = process.env.AZURE_OPENAI_ENDPOINT
const azureApiKey = process.env.AZURE_OPENAI_API_KEY
const prompt= [{
	role: "system",
	content: "You are a helpfulAI assistant that helps people find information."
}]

const GPTclient = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentId = "gpt-4";

const { MessageMedia } = pkg;

export const name = 'gpt';
export const args = true;
export const aliases: string[] = ['chatgpt', 'openai'];
export const description = 'Chat with GPT 4 turbo and GPT 4 Vision';
export const category = 'AI';
/**
 * @memberof! module:AI
 * @name gpt
 * @description 
 * Enables chatting with GPT 4 Turbo and GPT 4 vision within WhatsApp.
 *
 * **Usage:** 
 * - `!gpt {message}` - Sends the message to ChatGPT and replies with its response. 
 * 
 * **Notes:** 
 * - This command requires an API key for OpenAI.
 */
export async function run(client: pkg.Client, msg: pkg.Message, args: string[]) {
	
	const mem = await msg.getContact();
	if(process.env.OWNER_NUMBER !== mem.number) return msg.reply('kys')
	const body = args.join(' ');
	prompt.push({ role: "user", content: body });
	try{
		const result = await GPTclient.getChatCompletions(deploymentId, prompt);
		for (const choice of result.choices) {
			prompt.push({ role: "assistant", content: choice.message.content });
			await msg.reply(choice.message.content);
			break;
		}
	}
	catch(err){
		return msg.reply("The sample encountered an error:", clean(err))
	}

}

function clean(text: unknown): string {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return String(text);
}

