const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");




module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Latency?")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
   
   const reply = new EmbedBuilder()
   .setTitle("Pong! 🏓")
  .setColor("Green")


  await interaction.reply({embeds:[reply]})
  },
};
