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

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {
    if (interaction.customId === 'welcomeBtn') {
      const channel = client.channels.cache.get(process.env.CHANNEL);

      let userID = interaction.message.mentions.users.first().id;
      let reply = {
        content: `<@${interaction.user.id}> says hi to <@` + userID + '>',
        stickers: client.guilds.cache.get(process.env.GUILD)
          .stickers.cache.filter(s => s.id === process.env.STICKER)
      };

    	channel.send(reply);
      interaction.deferUpdate();
    } else {
      try {
        const role = interaction.guild.roles.cache.get(interaction.customId);
        await interaction.deferReply({ ephemeral: true });

        if (!role) {
          interaction.reply({
            content: "I couldn't find that role",
          });

          return;
        }

        const hasRole = interaction.member.roles.cache.has(role.id);

        if (hasRole) {
          await interaction.member.roles.remove(role);
          await interaction.editReply(`The role ${role} has been removed.`);
          return;
        }

        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
      } catch (err) {
        console.log(err);
      }
    }
  } else if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'add') {
      const num1 = interaction.options.get('first-number').value;
      const num2 = interaction.options.get('second-number').value;

      interaction.reply(`The sum is ${num1 + num2}`);
    } else if (interaction.commandName === 'embed') {
      const embed = new EmbedBuilder()
        .setTitle('Embed title')
        .setDescription('This is an embed description')
        .setColor(0x00ff4c)
        .addFields({
                    name: 'First field title',
                    value: 'First field value',
                    inline: true
                  }, {
                    name: 'Second field title',
                    value: 'Second field value',
                    inline: true
                  }, {
                    name: 'Third field title',
                    value: 'Third field value',
                    inline: true
                  });

      interaction.reply({ embeds: [embed] });
    }
  }
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is running.`);
})

client.login(process.env.TOKEN);
