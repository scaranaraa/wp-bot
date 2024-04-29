import { exec } from 'child_process';
import util from 'util';

import pkg from 'whatsapp-web.js';

const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'exec';
export const args = true;
export const category = 'Dev';
export const aliases = ['execute', 'ex'];
export const description = 'Execute commands in powershell';
/**
 * @memberof! Dev
 * @name execute
 * @description
 * Executes a command in the system's shell and returns the output.
 * 
 * **Usage:**
 * - `!exec dir` - Executes the `dir` command and displays the directory listing.
 * - `!exec --file script.ps1` - Executes the PowerShell script in the file `script.ps1`. (Not implemented)
 * - `!exec --async ping google.com` - Executes the command asynchronously. (Not implemented)
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const mem = await msg.getContact();
	if (msg.fromMe || mem.number == `${process.env.OWNER_NUMBER}`) {
		if (args.length == 0) {
			return;
		}

		if (args.includes('--file')) {
			args.splice(args.indexOf('--file'), 1);
			if (args.includes('--async')) {
				// todo
				return;
			}
		}

		try {
			if (args.includes('--async')) {
				// todo
				return;
			}

			exec(args.join(' '), async (error, stdout, stderr) => {
				// if(error){
				//   if(typeof(error) != 'string') error = util.inspect(error, {depth: null})
				//  msg.reply(clean(error))
				//  }
				if (stdout) {
					return msg.reply(clean(stdout));
				}

				if (stderr) {
					if (typeof stderr !== 'string') {
						stderr = util.inspect(stderr, { depth: null });
					}

					return msg.reply(clean(stderr));
				}
			});
		} catch (e) {
			console.log(e);
			return msg.reply(clean(e));
		}
	} else {
		return msg.reply('ur cute but you cant use this command :( :(');
	}
}

function clean(text: unknown): string {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return String(text)
		.replace(/`/g, `\`${String.fromCharCode(8203)}`)
		.replace(/@/g, `@${String.fromCharCode(8203)}`);
}
