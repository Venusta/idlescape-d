import { Client, Message } from "discord.js";

require('dotenv').config()
const token = process.env.DISCORD_TOKEN

const client = new Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message: Message) => {
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}	
});

client.login(token);
