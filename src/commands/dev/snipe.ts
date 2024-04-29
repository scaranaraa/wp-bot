import pkg from 'whatsapp-web.js';

const { Client, Location, Poll, List, Buttons, LocalAuth, MessageMedia } = pkg;

export const name = 'snipe';
export const args = true;
export const aliases = ['sn', 'snp'];
export const category = 'Dev';
export const description = 'Check previously deleted/edited messages or media';
/**
 * @memberof! module:Dev
 * @name snipe
 * @description
 * Retrieves and displays previously deleted or edited messages.
 * 
 * **Usage:**
 * - `!snipe` - Shows the most recently sniped message.
 * - `!snipe 2` - Shows the third most recently sniped message (index starts at 0).
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const mem = await msg.getContact();
	if (msg.fromMe || mem.number == `${process.env.OWNER_NUMBER}`) {
		let idx = 0;
		try {
			if (!isNaN(parseInt(args[0]))) {
				idx = parseInt(args[0]);
			}

			const max = client.snipe.length;
			if (idx > max) {
				idx = max - 1;
			}

			const snipe = client.snipe[idx];
			const name = snipe.author?.replace('@c.us', '') || '';
			if (snipe.type == 'delete') {
				let content = snipe.body;
				if (content.length > 4096) {
					content = `${content.substring(0, 4000)}...`;
				}

				if (snipe.media) {
					const { media } = snipe;
					await msg.reply(media, undefined, {
						caption: `Message deleted by ${name}\n*${(Date.now() - snipe.date) / 1000}* seconds ago\n\n${content}`,
					});
				} else {
					await msg.reply(
						`Message deleted by ${name}\n*${(Date.now() - snipe.date) / 1000}* seconds ago\n\n${content}`
					);
				}
			} else if (snipe.type == 'edit') {
				console.log('here');
				const oldcontent = snipe.prevbody;
				let content = snipe.newbody;
				if (content.length > 4096) {
					content = `${content.substring(0, 4000)}...`;
				}

				if (snipe.media) {
					const { media } = snipe;
					await msg.reply(media, undefined, {
						caption: `Message edited by ${name}\n*${(Date.now() - snipe.date) / 1000}* seconds ago\n\n${oldcontent}\n\n${content}`,
					});
				} else {
					await msg.reply(
						`Message edited by ${name}\n*${(Date.now() - snipe.date) / 1000}* seconds ago\n\n${oldcontent}`
					);
				}
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		msg.reply('ur cute but you cant snipe messages :( :( :( :( :( :( :( :(');
	}
}
