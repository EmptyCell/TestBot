require('dotenv').config();
const { Client,
        IntentsBitField,
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle,
        EmbedBuilder,
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

const roles = [
  {
    id: '1086056187952381993',
    label: 'Red'
  },
  {
    id: '1086056558045179976',
    label: 'Green'
  },
  {
    id: '1086056637204267098',
    label: 'Blue'
  },
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get(process.env.CHANNEL);
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary),
      )
    });

    channel.send({
      content: 'Claim or remove a role:',
      components: [row],
    });

    // TODO: Function is exiting way too soon!
    // process.exit();
  } catch (err) {
      console.log(err);
  }
});

client.login(process.env.TOKEN);
