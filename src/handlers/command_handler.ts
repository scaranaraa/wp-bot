import { readdirSync } from 'fs';
import { type Client } from 'whatsapp-web.js';
/**
 * Loads command files for the WhatsApp bot and registers them with the client.
 *
 *  iterates through command files in the 'src/commands' directory, and loads into the bot
 *  also checks environment variables before loading commands.
 */ 
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
						const add = checkENV(pull)
						if(!add) continue;
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

function checkENV(command: any) : boolean {
	if(process.env.PHONE == ""){
		console.log("ENV PHONE is empty, cannot load commans")
		return false;
	}

	if(process.env.OWNER_NUMBER == "" && command.category == 'Dev'){
		console.log(`ENV OWNER_NUMBER is empty, cannot load ${command.name}`)
		return false;
	}

	if(process.env.MONGODB_URI == ""){
		console.log(`MongoDB url not provided, cannot load command`)
		return false;
	}

	if(process.env.OPENAI_KEY == ""){
		if(command.name == 'gpt' || command.name == 'wolframgpt'){
			console.log(`OPENAI key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.ANTHROPIC_API_KEY == ""){
		if(command.name == 'claude' || command.name == 'wolframgpt'){
			console.log(`Anthropic api key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.RAPIDAPI_KEY == ""){
		if(command.name == 'wolfram'){
			console.log(`RapidApi key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.GOOGLE_API_KEY == ""){
		if(command.name == 'gemini'){
			console.log(`Google api key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.TAVILY_API_KEY == ""){
		if(command.name == 'wolframgpt'){
			console.log(`tavily api key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.LOL_API == ""){
		if(command.category == 'API'){
			console.log(`Lolhuman api key not provided, cannot load ${command.name}`)
			return false;
		}
	}

	if(process.env.USER_TOKEN == ""){
		if(command.name == 'sydney'){
			console.log(`Bing user token not provided, cannot load ${command.name}`)
			return false;
		}
	}
	
	return true
}
