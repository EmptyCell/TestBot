require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'add',
    description: 'Add two numbers.',
    options: [
      {
        name: 'first-number',
        description: 'The first number.',
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
              name: 'one',
              value: 1,
          },
          {
              name: 'two',
              value: 2,
          },
        ],
        required: true,
      },
      {
        name: 'second-number',
        description: 'The second number.',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: 'embed',
    description: 'Sends an embed.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT,
        process.env.GUILD
      ),
      { body: commands }
    )

    console.log('Slash commands were registered successfully!');
  } catch (err) {
    console.log(`There was an error: ${err}`)
  }
})();
