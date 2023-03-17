const { testServer, channel, sticker } = require('../../../config.json');

module.exports = {
  data: {
    name: 'welcomeBtn'
  },
  execute(client, interaction) {
    if (interaction.customId === 'welcomeBtn') {
      const chnl = client.channels.cache.get(channel);

      let userID = interaction.message.mentions.users.first().id;
      let reply = {
        content: `<@${interaction.user.id}> says hi to <@` + userID + '>',
        stickers: client.guilds.cache.get(testServer)
          .stickers.cache.filter(s => s.id === sticker)
      };

      chnl.send(reply);
      interaction.deferUpdate();
    }
  }
};
