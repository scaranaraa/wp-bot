import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { pull } from 'langchain/hub';
import pkg from 'whatsapp-web.js';
import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { WolframAlphaTool } from '@langchain/community/tools/wolframalpha';
import { ChatOpenAI } from '@langchain/openai';
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';

const tool2 = new WikipediaQueryRun({
	topKResults: 3,
	maxDocContentLength: 4000,
});

const { Client, LocalAuth, MessageMedia } = pkg;
const prompt = await pull('pollytheparrota2/new');
const tool = new WolframAlphaTool({
	appid: 'J4J84J-UPVWXW4UGL',
});
const tools = [
	tool,
	new TavilySearchResults({
		maxResults: 1,
		apiKey: process.env.TAVILY_API_KEY,
	}),
	tool2,
];

const llm = new ChatOpenAI({
	modelName: 'gpt-3.5-turbo',
	temperature: 0,
	openAIApiKey: process.env.OPENAI_KEY,
});

const agent = await createOpenAIFunctionsAgent({	// @ts-ignore

	llm,	// @ts-ignore

	tools,
	// @ts-ignore
	prompt,
});
const history: Array<HumanMessage | AIMessage> = [];
const agentExecutor = new AgentExecutor({
	agent,	// @ts-ignore

	tools,
});
export const name = 'wolframgpt';
export const args = true;
export const aliases: string[] = ['wgpt'];
export const description = 'Chat with WolframAlpha using GPT 3.5';
export const category = 'AI';
/**
 * Enables interaction with WolframAlpha and other tools using GPT-3.5 within WhatsApp.
 *
 * **Usage:**
 * - `!wolframgpt {query}` - Sends the query to the LangChain agent, which may use WolframAlpha or other tools to generate a response. 
 * 
 * **Notes:** 
 * - This command requires API keys for OpenAI, Tavily, and WolframAlpha. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	return msg.reply('no more free credits D:');

	if (args.length == 0) {
		return;
	}

	const result1 = await agentExecutor.invoke({
		input: args.join(' '),
		chat_history: history,
	});
	history.push(new HumanMessage(result1.input));
	history.push(new AIMessage(result1.output));
	const regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi;
	let str = result1.output;
	const links = [...str.matchAll(regex)].map(m => ({ text: m[1], link: m[2] }));
	for (let i = 0; i < links.length; i++) {
		if (
			!links[i].link.includes('input?') &&
			links[i].link.includes('wolfram')
		) {
			str = str.replace(`[${links[i].text}](${links[i].link})`, '');
			const media = await MessageMedia.fromUrl(links[i].link, {
				unsafeMime: true,
			});
			await msg.reply(media);
		} else {
			str = str.replace(
				`[${links[i].text}](${links[i].link})`,
				`${links[i].text} ${links[i].link}`
			);
		}
	}

	await msg.reply(str);
}
