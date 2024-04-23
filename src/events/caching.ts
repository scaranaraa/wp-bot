import client from '../../index.js';
import curr from '../models/baseuser.js';

async function globalCache(userId: string) {
	const foundUser = client.cachedUsers.get(userId);
	if (!foundUser) {
		client.cachedUsers.set(userId, await new curr({ userId }).findOrCreate());
	}
}

/*client.on('message_create', async msg => {
	const user = await msg.getContact();
	await globalCache(user.number);
});
*/