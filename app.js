require('dotenv').config()
const {Client, Intents, MessageActionRow, MessageButton} = require('discord.js');


var https = require('https');

let statusCode = 404;
let a = null;
let b = null;
let headers = null;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log("Bot is ready!")
});

https.get('https://api.tylernodes.ml/', function(res) {
	statusCode = res.statusCode; // <======= Here's the status code
	headers = res.headers.age;

   res.on('data', function(d) {
	 return;
   });
 
 }).on('error', function(e) {
    return;
 });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`User tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'status') {
		await interaction.reply(`Status of https://api.tylernodes.ml : Status code: ${statusCode}, Headers: ${"headers: ", headers}`)
	} else if (commandName === 'button') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle('PRIMARY')
			);

			await interaction.reply({ content: 'Button!', components: [row]});
	}
});

const filter = i => i.customId === 'primary';



client.login(process.env.TOKEN);
