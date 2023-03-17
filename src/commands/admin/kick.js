const { Client,
        Interaction,
        ApplicationCommandOptionType,
        PermissionFlagsBits
      } = require('discord.js');

module.exports = {
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason')?.value || "No reason provided";

    await interaction.deferReply();
    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("User doesn't exist.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("Can't kick the server owner.");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply("Can't kick a user with same/higher role than you.");
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("Can't kick a user with same/higher role than me.");
      return;
    }

    try {
      await targetUser.kick(reason);
      await interaction.editReply(`User ${targetUser} was kicked.\nReason: ${reason}`);
    } catch (err) {
      console.log(`Kick Command - Error Caught: ${err}`);
    }
  },

  name: 'kick',
  description: 'Kicks a member from the server.',
  // devOnly: Bool,
  // testOnly: Bool,
  // deleted: Bool,
  options: [
    {
      name: 'target-user',
      description: 'User to kick.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Reason for the kick.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
};
