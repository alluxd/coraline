const {
    CommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Announce something to a specific channel.')
        .addChannelOption(channel =>
            channel.setName('channel')
                .setDescription('Channel to send announcement to.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("title")
            .setDescription("Title for the embed.")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('desc')
            .setDescription("Description for the embed.")
            .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('color')
                .setDescription("Color for the embed, must be a valid hex. Defaults to black.")
                .setRequired(false)
                )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const cchannel = interaction.options.getChannel('channel').id || "132344485784584"
      const desc = interaction.options.getString('desc') || 'Cool description.'
      const title = interaction.options.getString('title') || 'Cool title.'
      const hexcolor = interaction.options.getString('color') || '#000000'

function isValidHexCode(str) {
    return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(str);
  }
  
  if (!isValidHexCode(hexcolor)) {
  return await interaction.reply(`Uh, '**${hexcolor}**' is not a valid hex code. A hex begins with a hashtag and 6 characters.`);
  }

  const channel = await client.channels.cache.get(cchannel)
 
const anEmbed = new EmbedBuilder()
.setTitle(title)
.setDescription(desc)
.setColor(`${hexcolor}`)
.setFooter({text: `Announcement by ${interaction.user.tag}`})

  
    interaction.reply({content: "Success! Sent announcement embed to: " + `<#${cchannel}>`})
    await channel.send({embeds: [anEmbed]})

    

}

    }
