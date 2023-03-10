require('dotenv').config();
const { Client,
        IntentsBitField,
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle,
        Events } = require('discord.js');

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.MessageContent,
  ],
});

bot.on('guildMemberAdd', (member) => {
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

  const channel = bot.channels.cache.get(process.env.CHANNEL);
  channel.send(welcome);
})

// TODO: Doesn't react, unknown reason
bot.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.premiumSince !== newMember.premiumSince) {
    const channel = bot.channels.cache.get(process.env.CHANNEL);
    channel.send(`**${newMember.user.tag}** has boosted the server!`);
  }
})

bot.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isButton()) return;

  const channel = bot.channels.cache.get(process.env.CHANNEL);

  let userID = interaction.message.mentions.users.first().id;
  let reply = {
    content: `<@${interaction.user.id}> says hi to <@` + userID + '>',
    stickers: bot.guilds.cache.get(process.env.GUILD)
      .stickers.cache.filter(s => s.id === process.env.STICKER)
  };

	channel.send(reply);
  if (interaction.isButton()) return interaction.deferUpdate();
});

bot.on('ready', (c) => {
  console.log(`${c.user.tag} is running.`);
})

bot.login(process.env.TOKEN);
