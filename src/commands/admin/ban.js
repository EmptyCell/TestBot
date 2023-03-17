const { ApplicationCommandOptionType,
        PermissionFlagsBits
      } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  // devOnly: Bool,
  // testOnly: Bool,
  // deleted: Bool,
  options: [
    {
      name: 'target-user',
      description: 'User to ban.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Reason for the ban.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply('Banned..');
  }
}
