import { type Client, Contact, type Message } from 'whatsapp-web.js';

export const name = 'help';
export const args = true;
export const aliases = ['commands'];
export const description = 'Check all the commands';
export const category = 'General';
/**
 * Provides a help message with a list of available commands and their descriptions.
 *
 * **Usage:**
 * - `!help` - Shows a list of command categories and the number of pages. 
 * - `!help {page number}` - Shows the commands within the specified category page. 
 * - `!help {command name}` - Shows details about the specified command, including aliases, category, and description.
 */
export async function run(client: Client, msg: Message, args: string[]) {
	const categories = [
		'AI',
		'API',
		'Bing',
		'Chess',
		'Dev',
		'Games',
		'General',
		'HuggingFace',
		'Image',
		'InfiniteCraft',
		'Pokemon',
		'Shazam',
	];
	let page = 0;
	let cmd = '';
	if (args.length) {
		if (isNaN(parseInt(args.join(' ')))) {
			cmd = args.join(' ');
		} else {
			page = parseInt(args.join(' '));
			if (page > categories.length) return msg.reply('Invalid page');
		}
	}
	if (cmd) {
		cmd = cmd.toLowerCase();
		let foundCommand = client.commands.get(cmd);
		if (!foundCommand) {
			const foundalias = client.aliases.get(cmd);
			if (!foundalias) return msg.reply('Command not found');
			foundCommand = client.commands.get(foundalias);
		}
		if (!foundCommand) return msg.reply('Command not found');
		let res = `\`${cp(foundCommand.name)}\`\n\n`;
		if (foundCommand.aliases?.length)
			res += `Aliases - ${foundCommand.aliases.join(' | ')}\n`;
		if (foundCommand.category)
			res += `Category - \`${foundCommand.category}\`\n\n`;
		if (foundCommand.description) res += foundCommand.description;

		await msg.reply(res);
		return;
	}
	if (page) {
		const category = categories[page - 1];
		let res = `Category - ${category}\n\n`;
		let count = 1;
		client.commands.forEach(command => {
			if (command.category && command.category == category) {
				res += `${count}. \`${cp(command.name)}\`\n`;
				count++;
			}
		});
		res += `\nPage ${page}/${categories.length}`;
		await msg.reply(res);
		return;
	}
	let res = `Syntax -\n@ help <command/page>\nTotal pages - \`${categories.length}\`\n\n`;
	for (const idx in categories) {
		res += `${parseInt(idx) + 1}. \`${categories[idx]}\`\n`;
	}
	await msg.reply(res);
}
function cp(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
