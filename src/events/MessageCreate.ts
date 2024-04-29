/**
 * @name MessageCreate
 * @memberof Client
 * Handles incoming messages and executes commands or UNO game actions.
 *
 * listens for the 'message' event and processes incoming messages, 
 * checking for muted users, updating message counts, and runs found commands
 */ 

import { type Message } from 'whatsapp-web.js';
import client from '../../index.js';
import baseuser from '../models/baseuser.js';

client.on('message', async msg => {
	const date = Date.now();
	const user = await msg.getContact();
	if (client.muted.includes(user.number)) {
		await msg.delete(true);
		return;
	}
	const curr = new baseuser({ userId: user.number, users: client.cachedUsers });
	if (!curr.checkCached()) await curr.cache();
	curr.addmsg();
	// await checkpokemon(user)
	if (msg.body.toLowerCase().startsWith('uno')) {
		await executeCommand(msg);
		return;
	}

	const { prefix } = client;
	if (
		!msg.body.toLowerCase().startsWith(prefix.toLowerCase()) &&
		!client.s_prefix.includes(msg.body[0])
	) {
		return;
	}

	let args: string[];
	if (msg.body.toLowerCase().startsWith(prefix))
		args = msg.body.slice(prefix.length).trim().split(/ +/);
	else args = msg.body.slice(1).trim().split(/ +/);
	const cmd = args.shift()?.toLowerCase();

	const command =
		client.commands.get(cmd.toLowerCase()) ||
		client.commands.get(client.aliases.get(cmd.toLowerCase()));
	if (!command) {
		return;
	}

	// dont async itll increase ping by ~500ms
	curr.addCommand(command.name);
	if (command.name == 'eval') {
		return command.run(client, msg, args);
	}

	if (command.name == 'sticker' && msg.hasQuotedMsg) {
		const res = await msg.getQuotedMessage();
		command.run(client, res, args, prefix);
	}

	if (command.disabled) {
		return;
	}

	command.run(client, msg, args, date);
});
async function executeCommand(msg: Message) {
	const prefix = 'uno';
	try {
		if (
			msg.body &&
			typeof msg.body === 'string' &&
			msg.body?.toLowerCase()?.startsWith(prefix)
		) {
			const segments = msg.body.substring(prefix.length).trim().split('&&');
			if (segments.length > 2) {
				return await msg.reply(
					'Sorry, you can only execute up to **two** commands with a single message!'
				);
			}

			if (segments[1] && segments[1].trim().toLowerCase().startsWith(prefix)) {
				segments[1] = segments[1].trim().substring(prefix.length);
			}

			for (const text of segments) {
				const words = text.trim().split(/\s+/);
				const name = words.shift()?.toLowerCase().replace(/\!+/, '!');
				if (!name) {
					return;
				}

				if (client.getCommand(name)) {
					const res = await client
						.getCommand(name)
						.execute(msg, words, text.trim().substring(name.length));
					if (res) {
						await msg.reply(res);
					}
				}
			}
		} else {
			return 9;
		}
	} catch (e) {
		console.log(e);
	}
}

/* async function checkpokemon(msg,member){
  if(client.ind) return;
  client.ind= true
  if(!client.cooldowns.has(member.number)) client.cooldowns.set(member.number,Date.now())
  else{
  if(Date.now() - client.cooldowns.get(member.number) < 5000) {client.ind = false;return;  }
  }
  client.cooldowns.set(member.number, Date.now())
  const user = new baseuser({ userId : member.number, users : client.cachedUsers })
  let selected = await user.getselectedpokemon();
  if(!selected || selected.length == 0) {client.ind = false; return;}
  let randomselect = Math.floor(Math.random() * selected.length)
  selected = selected[randomselect]
  let pokemonfound = await pokemonschema.findOne({owner_id : member.number, id : selected})
  if(!pokemonfound) {client.ind = false;return;}
  let pokemon: PokemonBase = new PokemonBase({id : pokemonfound.id, timestamp : pokemonfound.timestamp, owner_id : pokemonfound.owner_id, idx : pokemonfound.idx, species_id : pokemonfound.species_id, level : pokemonfound.level, xp : pokemonfound.xp, nature : pokemonfound.nature, shiny : pokemonfound.shiny, iv_hp : pokemonfound.iv_hp, iv_atk : pokemonfound.iv_atk, iv_defn : pokemonfound.iv_defn, iv_satk : pokemonfound.iv_satk, iv_sdef : pokemonfound.iv_sdef, iv_spd : pokemonfound.iv_spd, iv_total : pokemonfound.iv_total, nickname : pokemonfound.nickname, favorite : pokemonfound.favorite, held_item : pokemonfound.held_item, moves : pokemonfound.moves, has_color : pokemonfound.has_color, color : pokemonfound.color})
  if(pokemon.held_item == 13002) {client.ind = false;return;}
  let inc_xp = 0
  if(pokemon.level < 100 && pokemon.xp < pokemon.max_xp){
    inc_xp = Math.floor(Math.random() * 40)
    if((user.getxpboost() - Date.now()) > 0) inc_xp *= 2
    pokemon.xp += inc_xp
    await pokemonschema.updateOne({ owner_id:member.number, id : selected },
      {
          $set: { "xp" : pokemon.xp
      },
  });
  }
  if(pokemon.xp >= pokemon.max_xp && pokemon.level < 100){
    pokemon.level += 1
    await user.addCoins(pokemon.level * 2)
    pokemon.xp = 0
    await pokemonschema.updateOne({ owner_id:member.number, id : selected },
      {
          $set: { "level" : pokemon.level
      },
    });
    await pokemonschema.updateOne({ owner_id:member.number, id : selected },
      {
          $set: { "xp" : pokemon.xp
      },
    });
    if(pokemon.getNextEvolution()){
      let evo = pokemon.getNextEvolution()
      let oldname = cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)
      pokemon.species_id = evo.id
      await msg.reply(`Your ${oldname} evolved into ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)}!`)
      await pokemonschema.updateOne({ owner_id:member.number, id : selected },
        {
            $set: { "species_id" : pokemon.species_id
        },
      });
    }
    else {
      let res = `Your ${cp(client.data.findSpeciesByNumber(pokemon.species_id).slug)} learnt these moves :-\n`
      let flag = false
      pokemon.species.moves.forEach(async move => {
        if(move?.method?.level <= pokemon.level){
          if(move.move_id && !pokemon.moves.includes(move.move_id))pokemon.moves.push(move.move_id)
          flag = true
          res += `*${cp(client.data.moveByNumber(move.move_id)?.slug || 'brokr here')}*\n`
          await pokemonschema.updateOne({ owner_id:member.number, id : selected },
            {
                $set: { "moves" : pokemon.moves
            },
        });
        }
      })
    }

  }
  if(pokemon.level == 100){
    pokemon.xp = pokemon.max_xp
  }
  client.ind = false;
}
this.id = data.id
      this.timestamp = data.timestamp || new Date();
      this.owner_id = data.owner_id;
      this.idx = data.idx;
      this.species_id = data.species_id;
      this.level = data.level;
      this.xp = data.xp;
      this.nature = data.nature;
      this.shiny = data.shiny;
      this.iv_hp = data.iv_hp;
      this.iv_atk = data.iv_atk;
      this.iv_defn = data.iv_defn;
      this.iv_satk = data.iv_satk;
      this.iv_sdef = data.iv_sdef;
      this.iv_spd = data.iv_spd;

      this.iv_total = data.iv_total;

      // Customization
      this.nickname = data.nickname || null;
      this.favorite = data.favorite || false;
      this.held_item = data.held_item || null;
      this.moves = data.moves || [];
      this.has_color = data.has_color || false;
      this.color = data.color || null;

      this._hp = null;
      this.ailments = null;
      this.stages = null;
      this.cached = data.cached || null; */
function cp(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
