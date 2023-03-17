const getLocalComponents = require('../../sysTools/getLocalComponents');

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    const localComponents = getLocalComponents();

    try {
      const componentObject = localComponents.find(
        (cmp) => cmp.data.name === interaction.customId
      );

      if (!componentObject) { return; }
      await componentObject.execute(client, interaction);
    } catch (err) {
      console.log(`Component Handler - Error Caught: ${err}`);
    }
  }
};
