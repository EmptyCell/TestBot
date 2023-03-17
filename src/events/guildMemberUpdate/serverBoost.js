const { channel } = require('../../../config.json');

module.exports = async (oldMember, newMember) => {
  try {
    if (!oldMember.premiumSince && newMember.premiumSince) {
      const chnl = client.channels.cache.get(channel);
      chnl.send(`**${newMember.user.tag}** has boosted the server!`);
    }
  } catch (err) {
    console.log(`Server Boost - Error Caught: ${err}`);
  }
};
