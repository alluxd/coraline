const {CommandInteraction} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({content: ":x: Command not found! Maybe double-check the spacing, capitiliazation and try again?"});
    }

    command.execute(interaction, client);
  },
};
