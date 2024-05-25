import { type Client, Contact, type Message } from 'whatsapp-web.js';

export const name = 'blacklist';
export const args = true;
export const aliases = ['censor','bl'];
export const description = 'Check all the commands';
export const category = 'General';
/**
 * @memberof! module:General
 * @name blacklist
 * @description
 * Censor ceratin words to prevent them being used in chat
 *
 * **Usage:**
 * - `!blacklist {word}` - Blacklist a word or remove a word already blacklisted
 */
export async function run(client: Client, msg: Message, args: string[]) {

    const word = args.join(' ');
    if (!word) return msg.reply('Please provide a word to blacklist');

    if (client.blacklist.includes(word.toLowerCase().trim())) {
        client.blacklist = client.blacklist.filter(w => w !== word.toLowerCase().trim());
        return msg.reply("Blacklist removed");
    }
    else{ 
        client.blacklist.push(word.toLowerCase().trim())
        return msg.reply("Blacklist added")
    }

}
