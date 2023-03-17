const { channel } = require('../../../config.json');
const { ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle
      } = require('discord.js')

module.exports = async (client, member) => {
  try {
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

    const chnl = await client.channels.cache.get(channel);
    await chnl.send(welcome);
  } catch (err) {
    console.log(`Welcome User - Error Caught: ${err}`);
  }

}
