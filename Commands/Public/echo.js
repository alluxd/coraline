const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription("Echoes back what you said!")
        .addStringOption(option =>
            option.setName('content')
                .setDescription("Content to echo back.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        /** 
   * @param {CommandInteraction} interaction
   */

   const content = interaction.options.getString('content') || ":x: No input!"

   await interaction.reply(`${interaction.user} said: **${content}**`)



    }
}