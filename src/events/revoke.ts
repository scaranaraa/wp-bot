/**
 * @name MessageRevoked
 * @memberof Client
 * Handles message revoke and edit events.
 * 
 * listens for 'message_revoke_everyone' and 'message_edit' events and adds the 
 * deleted/edited message information to the `client.snipe` array
 */

import client from '../../index.js';

client.on('message_revoke_everyone', async (_msg, delmsg) => {
	if (delmsg?.hasMedia) {
		const media = await delmsg.downloadMedia2();
		client.snipe.unshift({
			body: delmsg.body,
			author: delmsg.author,
			date: Date.now(),
			type: 'delete',
			media,
		});
	} else {
		client.snipe.unshift({
			body: delmsg?.body,
			author: delmsg?.author,
			date: Date.now(),
			type: 'delete',
		});
	}
});

client.on('message_edit', (msg, newBody: string, prevBody: string) => {
	if (msg.hasMedia) {
		client.snipe.unshift({
			newbody: newBody,
			author: msg.author,
			prevbody: prevBody,
			date: Date.now(),
			type: 'edit',
		});
	} else {
		client.snipe.unshift({
			newbody: newBody,
			author: msg.author,
			prevbody: prevBody,
			date: Date.now(),
			type: 'edit',
		});
	}
});
