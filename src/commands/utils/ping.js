module.exports = {
  name: 'ping',
  description: 'Pong!',
  // devOnly: Bool,
  // testOnly: Bool,
  // deleted: Bool,
  // options: Object[],

  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  }
}
