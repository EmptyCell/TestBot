require('dotenv').config();
const { Client,
        IntentsBitField,
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle,
        Events } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('guildMemberAdd', (member) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('welcomeBtn')
        .setEmoji('👋')
        .setLabel('Say Hi!')
        .setStyle(ButtonStyle.Secondary),
    );

  let welcome = {
    content: `<@${member.user.id}> just joined the server!`,
    components: [row]
  }

  const channel = client.channels.cache.get(process.env.CHANNEL);
  channel.send(welcome);
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (!oldMember.premiumSince && newMember.premiumSince) {
    const channel = client.channels.cache.get(process.env.CHANNEL);
    channel.send(`**${newMember.user.tag}** has boosted the server!`);
  }
})

client.on('interactionCreate', (interaction) => {
	if (interaction.isButton()) {
    const channel = client.channels.cache.get(process.env.CHANNEL);

    let userID = interaction.message.mentions.users.first().id;
    let reply = {
      content: `<@${interaction.user.id}> says hi to <@` + userID + '>',
      stickers: client.guilds.cache.get(process.env.GUILD)
        .stickers.cache.filter(s => s.id === process.env.STICKER)
    };

  	channel.send(reply);
    interaction.deferUpdate();
  } else if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'add') {
      const num1 = interaction.options.get('first-number').value;
      const num2 = interaction.options.get('second-number').value;

      interaction.reply(`The sum is ${num1 + num2}`);
    }
  }
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is running.`);
})

client.login(process.env.TOKEN);
