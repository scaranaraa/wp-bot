import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
import { connect } from 'mongoose';
import 'dotenv/config';

const { Client, LocalAuth } = pkg;

/**
 * @module Client
 * @class Client
 * Entry point for the WhatsApp bot.
 *
 * Initializes the WhatsApp client, connects to the MongoDB database, 
 * and handles QR code generation for authentication when the bot is ready. 
 *
 * **Other things:**
 * - Loading command and event handlers when the bot is ready. 
 * - Handling uncaught exceptions and signals for graceful shutdown. 
 */

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-web-security',
			'--disable-gpu',
			'--hide-scrollbars',
			'--disable-cache',
			'--disable-application-cache',
			'--disable-gpu-driver-bug-workarounds',
			'--disable-accelerated-2d-canvas',
		],
		headless: true,
		executablePath: process.env.CHROME_PATH,
	},
});

client.initialize();

connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err: unknown) => {
		console.log(err);
	});

client.on('qr', qr => {
	qrcode.generate(qr, { small: true });
});

import('./init.js');

client.on('ready', (_: any) => {
	const handlers = ['command_handler.js', 'event_handler.js'];
	handlers.forEach((handler: string) => {
		import(`./src/handlers/${handler}`).then(module => module.default(client));
	});
});

process.on('unhandledRejection', (err: Error) => {
	console.log(err.stack ? err.stack : err);
});

process.on('uncaughtException', (err: Error, origin: string) => {
	if (origin === 'unhandledRejection') {
		return;
	}
	console.log(err.stack ? err.stack : err);
});

process.on('SIGINT', async function () {
	await client.destroy();
});

export default client;
