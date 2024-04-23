import { readdirSync } from 'fs';
import { type Client } from 'whatsapp-web.js';

export default (client: Client) => {
	try {
		let command = 0;
		readdirSync('./dist/src/commands').forEach(async cmd => {
			if (cmd !== 'utils') {
				const commands = readdirSync(`./dist/src/commands/${cmd}/`).filter(
					file => file.endsWith('.js')
				);
				for (const cmds of commands) {
					const pull = await import(`../commands/${cmd}/${cmds}`);
					if (pull.name) {
						client.commands.set(pull.name, pull);
						command++;
					} else {
						console.log(`${cmds} Command is not Ready`);
						continue;
					}

					if (pull.aliases && Array.isArray(pull.aliases)) {
						pull.aliases.forEach((alias: string) =>
							client.aliases.set(alias, pull.name)
						);
					}
				}
			}
		});
		console.log(`${command} lOADED`);
	} catch (e: unknown) {
		console.log(e);
	}
};
