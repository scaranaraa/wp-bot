import { MessageMedia, type Client, type Message } from 'whatsapp-web.js';

export type SydneyBase = {
	chatid: string;
	client: Client | string;
	convid: string;
	parentmsg: string;
	loaded: boolean;
	load(): Promise<boolean>;
	removeFootnotes(text: string): string;
	getSources(completion: string[]): string;
	getCompletionWithBing(
		message: Message,
		context: string,
		streamingReply: Message
	): Promise<string>;
	generateCompletionWithBing(
		message: Message,
		context: string,
		onProgress: (token: string) => void,
		streamingReply: Message
	): Promise<string>;
};

/* class sydney {


      async getCompletionWithBing(
        message,
        context,
        streamingReply
      ) {
        let streamingReplyBody = streamingReply.body;
        let tokenQueue = [];
        let tokenQueueweb = [];
        let isProcessingQueue = false;
        let isEditingReply;
        let isReminder = false;

        async function onTokenStream(token) {
          const isWebSearch =
            token.startsWith("Searching") && tokenQueue.length === 0;
          if (isWebSearch) {
            token = ` ${token} ...\n\n`;
            tokenQueueweb.push(token);
          }

          else {tokenQueue.push(token)}
          if (!isProcessingQueue) {
            isProcessingQueue = true;
            await processTokenQueue();
          }
        }

        async function processTokenQueue() {
          if(tokenQueueweb.length !== 0){
            const token = tokenQueue.join('')
            const newReplyContent = streamingReplyBody + token;
            isEditingReply = streamingReply.edit(newReplyContent);
            streamingReplyBody = newReplyContent;
            tokenQueueweb.shift();
          }
          if (tokenQueue.length !== 0 && tokenQueue.length > 15) {
            let usedlength = tokenQueue.length;
            const token = tokenQueue.join('')
            const newReplyContent = streamingReplyBody + token;
            isEditingReply = streamingReply.edit(newReplyContent);
            streamingReplyBody = newReplyContent;

            tokenQueue = tokenQueue.slice(usedlength-1);

            await processTokenQueue();
          }
          else {
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
        message,
        context,
        onProgress,
        streamingReply
      ) {
        if (message.hasMedia) {
          const media = await message.downloadMedia();
          const mimetype = media.mimetype;
          const isAudio = mimetype?.includes("audio");

          if (isAudio) {
          message.body = await handleAudioMessage(media, message,streamingReply);
          }

        }
        let completion;
        const chat = await message.getChat();
        let imageBase64;
            completion = await sydneyAIClient.sendMessage(message.body, {
              jailbreakConversationId: this.convid,
              parentMessageId: this.parentmsg,
              imageBase64 : imageBase64,
              context : context,
              onProgress,
            });

            this.parentmsg = completion.messageId;
            this.convid = completion.jailbreakConversationId;
        return completion;
      }
    } */
