import { KeyvFile } from 'keyv-file';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
// @ts-ignore
import { BingAIClient } from '@waylaidwanderer/chatgpt-api';
import { stripIndents } from 'common-tags';
import pkg from 'whatsapp-web.js';
import { type SydneyBase } from '../../types/SydneyBase.js';
import { handleAudioMessage } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
	// host: 'https://in.bing.com',
	userToken: process.env.USER_TOKEN,
	debug: false,
};
const cacheOptions = {
	store: new KeyvFile({
		filename: './dist/src/commands/bing/sydneycache.json',
	}),
};

let sydneyAIClient = new BingAIClient({
	...options,
	cache: cacheOptions,
});

class sydney implements SydneyBase {
	constructor(client: pkg.Client | string, id: string) {
		this.chatid = id;
		this.client = client;
		this.convid = '';
		this.parentmsg = '';
		this.loaded = false;
	}

	chatid: string;

	client: pkg.Client | string;

	convid: string;

	parentmsg: string;

	loaded: boolean;

	async load() {
		if (this.loaded) {
			return;
		}

		const response = await sydneyAIClient.sendMessage('Hey sydney!', {
			jailbreakConversationId: true,
		});
		this.convid = response.jailbreakConversationId;
		this.parentmsg = response.messageId;
		this.loaded = true;
		console.log('bing loaded');
		return true;
	}

	removeFootnotes(text: string) {
		const cleanedText = text.replace(/\[\^\d+\^\]/g, '');
		return cleanedText;
	}

	getSources(completion: any) {
		const sources = completion.details.sourceAttributions;
		const sourcesList = sources.map(
			(source: any, i: number) => `${i + 1}. ${source.seeMoreUrl}`
		);

		return (
			(sourcesList.length && `*Sources:*\n${sourcesList.join('\n')}`) || ''
		);
	}

	async getCompletionWithBing(
		message: pkg.Message,
		context: string,
		streamingReply: pkg.Message
	) {
		let streamingReplyBody = streamingReply.body;
		let tokenQueue: string[] = [];
		const tokenQueueweb: string[] = [];
		let isProcessingQueue = false;
		let isEditingReply;
		const isReminder = false;

		async function onTokenStream(token: string) {
			const isWebSearch =
				token.startsWith('Searching') && tokenQueue.length === 0;
			if (isWebSearch) {
				token = ` ${token} ...\n\n`;
				tokenQueueweb.push(token);
			} else {
				tokenQueue.push(token);
			}

			if (!isProcessingQueue) {
				isProcessingQueue = true;
				await processTokenQueue();
			}
		}

		async function processTokenQueue() {
			if (tokenQueueweb.length !== 0) {
				const token = tokenQueue.join('');
				const newReplyContent = streamingReplyBody + token;
				isEditingReply = streamingReply.edit(newReplyContent);
				streamingReplyBody = newReplyContent;
				tokenQueueweb.shift();
			}

			if (tokenQueue.length !== 0 && tokenQueue.length > 15) {
				const usedlength = tokenQueue.length;
				const token = tokenQueue.join('');
				const newReplyContent = streamingReplyBody + token;
				isEditingReply = streamingReply.edit(newReplyContent);
				streamingReplyBody = newReplyContent;

				tokenQueue = tokenQueue.slice(usedlength - 1);

				await processTokenQueue();
			} else {
				isProcessingQueue = false;
			}
		}

		const completion = await this.generateCompletionWithBing(
			message,
			context,
			onTokenStream,
			streamingReply
		);
		completion.response = this.removeFootnotes(completion.response);
		return Promise.all([completion, isEditingReply]).then(
			([completion]) => completion
		);
	}

	async generateCompletionWithBing(
		message: pkg.Message,
		context: string,
		onProgress: any,
		streamingReply: pkg.Message
	) {
		if (message.hasMedia) {
			const media = await message.downloadMedia();
			const { mimetype } = media;
			const isAudio = mimetype?.includes('audio');

			if (isAudio) {
				message.body = await handleAudioMessage(media, message, streamingReply);
			}
		}

		let completion;

		completion = await sydneyAIClient.sendMessage(message.body, {
			jailbreakConversationId: this.convid,
			parentMessageId: this.parentmsg,
			context,
			onProgress,
		});

		this.parentmsg = completion.messageId;
		this.convid = completion.jailbreakConversationId;
		return completion;
	}
}

const sydneychat = new sydney('', '');
sydneychat.load();

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'sydney';
export const args = true;
export const aliases = ['bing', 'syd'];
export const description = 'Chat with sydney/microsoft copilot';
export const category = 'Bing';
/**
 * Talk with the Bing AI (Sydney) within WhatsApp.
 *
 * **Usage (within the bot):**
 * - Instantiate a `sydney` object with the client and chat ID.
 * - Call `load` to initialize the Bing AI connection.
 * - Use `getCompletionWithBing` to send a message to Bing AI and receive a response.
 *
 * **User Commands:**
 * - `!sydney {message}` - Sends the message to Bing AI and replies with its response.
 * - `!sydney RESET` - Reloads the Bing AI model.
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (args[0] == 'RESET') {
		// reload the model
		sydneyAIClient = new BingAIClient({
			...options,
			cache: cacheOptions,
		});
		const a = await msg.reply('Restarting...');
		await sydneychat.load();
		a.edit('reloaded');
	}

	const user = await msg.getContact();
	const chat = await msg.getChat();
	let chatContext = '';
	let publicUserName;
	if (chat.isGroup) {
		const groupChat = chat;
		const contact = user;
		publicUserName = contact.pushname;
		const groupContacts = await Promise.all(
			// @ts-ignore
			groupChat.participants.map(async participant =>
				client.getContactById(participant.id._serialized)
			)
		);
		const groupContactNames = groupContacts
			.map((contact: pkg.Contact) => contact.pushname)
			.join(', ');
		// @ts-ignore
		chatContext = stripIndents`-\n- There are ${groupChat.participants.length} users talking to you
    - The users are: ${groupContactNames}
    - '${publicUserName}' is who sent this message
  `;
	} else {
		publicUserName = (await msg.getContact()).pushname;
		chatContext = stripIndents`- You are in a private chat
    - The user's name is '${publicUserName}'
    `;
	}

	chatContext += `When searching the web, NEVER include markdown links in your response. They will be added automatically later.
  * for example, if the user asks 'What is the capital of Brazil?'
  * you **MUST NOT** answer 'The capital of Brazil is Brasília (Source)[https://link.to/source]'
  * instead, you **MUST** answer 'The capital of Brazil is Brasília'
  * As this chat doesnt support latex, use unicode characters for math equations`;
	const streamingReply = await msg.reply('...');
	msg.body = args.join(' ');
	client.sydneyqueue.push([msg, chatContext, streamingReply]);
	if (client.sydneyqueue.length > 1) {
		msg.react('⏳');
	}

	while (client.sydneyqueue[0][0].body != msg.body) {
		await new Promise(resolve => setTimeout(resolve, 1000));
	}

	const completion = await sydneychat.getCompletionWithBing(
		msg,
		chatContext,
		streamingReply
	);
	let { response } = completion;
	response = `${response}\n\n${sydneychat.getSources(completion)}`;
	if (!response) {
		throw new Error('No response from LLM');
	}

	await streamingReply.edit(response);
	client.sydneyqueue.shift();
}

/* let response = await bingAIClient.sendMessage('Write a short poem about cats', {
    toneStyle: 'balanced',
    onProgress: (token) => {
        process.stdout.write(token);
    },
});
console.log(JSON.stringify(response, null, 2));

response = await bingAIClient.sendMessage('Now write it in French', {
    conversationSignature: response.conversationSignature,
    conversationId: response.conversationId,
    clientId: response.clientId,
    invocationId: response.invocationId,
    onProgress: (token) => {
        process.stdout.write(token);
    },
});
console.log(JSON.stringify(response, null, 2));

bingAIClient = new BingAIClient(options);

response = await bingAIClient.sendMessage('Could you provide short and precise takeaways, do not search the web and only use the content from the document. The factual information should be literally from the document. Please memorize the part in the document which mention the factual information, but do not mark them explicitly. The takeaway should be credible, highly readable and informative. Please make the answer short, preferably within 500 characters. Generate the response in English language.', {
    context: fs.readFileSync(path.resolve(__dirname, './context-demo-text.txt'), 'utf8'),
    onProgress: (token) => {
        process.stdout.write(token);
    },
});
console.log(JSON.stringify(response, null, 2));

const cacheOptions = {
 store: new KeyvFile({ filename: 'cache.json' }),
};

const sydneyAIClient = new BingAIClient({
    ...options,
    cache: cacheOptions,
});

let jailbreakResponse = await sydneyAIClient.sendMessage('Hi, who are you?', {
    jailbreakConversationId: true,
    onProgress: (token) => {
        process.stdout.write(token);
    },
});
console.log(JSON.stringify(jailbreakResponse, null, 2));

jailbreakResponse = await sydneyAIClient.sendMessage('Why is your name Sydney?', {
    jailbreakConversationId: jailbreakResponse.jailbreakConversationId,
    parentMessageId: jailbreakResponse.messageId,
    onProgress: (token) => {
        process.stdout.write(token);
    },
});
console.log(JSON.stringify(jailbreakResponse, null, 2)); */
