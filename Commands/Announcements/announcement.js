const {
    CommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ButtonStyle,
    ComponentType
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
            option.setName('content')
                .setDescription("Content for the embed. (for members: <@member id here>, for roles add <@&role id here>)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription("Color for the embed, must be a valid hex. Defaults to black.")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {



        const { options, channel, member } = interaction;


        const cchannel = options.getChannel('channel').id || "132344485784584"
        const desc = options.getString('desc') || 'Cool description.'
        const title = options.getString('title') || 'Cool title.'
        const hexcolor = options.getString('color') || '#000000'
    const content = options.getString("content") || 'N'



 const inititialChannel = await client.channels.cache.get(cchannel)


        function isValidHexCode(str) {
            return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(str);
        }

        if (!isValidHexCode(hexcolor)) {
            return await interaction.reply(`Sorry but, '**${hexcolor}**' is not a valid hex code. A hex begins with a hashtag and 6 characters.`);
        }

        const rowEnabled = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('send')
                    .setLabel('Send')
                    .setEmoji("💬")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setEmoji("✖")
                    .setStyle(ButtonStyle.Danger),
            )


        const rowDisabled = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('send')
                    .setLabel('Send')
                    .setDisabled(true)
                    .setEmoji("💬")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setEmoji("✖")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            )

        const previewEmbed = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(desc)
            .setColor(`${hexcolor}`)
            .setFooter({ text: `Announcement by ${interaction.user.tag}` })

        const sent = new EmbedBuilder()
            .setDescription(`✅ Success! Sent announcement embed to: " + <#${inititialChannel.id}>`)
            .setColor("Green")

            const cancelled = new EmbedBuilder()
            .setDescription(`:x: Cancelled announcement.`)
            .setColor("Red")


            const expired = new EmbedBuilder()
            .setDescription(`⚫ This interaction has expired!`)
            .setColor("Grey")

        await interaction.reply({
            content: `This is how your final message is going to look like. Do you want to send it? \n Content: ${content}`,
            embeds: [previewEmbed],
            components: [rowEnabled]
        })

       

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

       //await interaction.deferReply()
        collector.on('collect', async i => {
            if (!i.user.id === interaction.user.id) {
                return await interaction.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
            if (i.customId === 'send') {
                await interaction.editReply({
                    content: `Done!`,
                    embeds: [sent],
                    components: [rowDisabled]
                })
                const anEmbed = new EmbedBuilder()
                .setTitle(`${title}`)
                .setDescription(desc)
                .setColor(`${hexcolor}`)
                .setFooter({ text: `Announcement by ${interaction.user.tag}` })
    
    

                
    
            await inititialChannel.send({ embeds: [anEmbed], content: `${content}` })
    

            }
            if (i.customId === 'cancel') {
                await interaction.editReply({
                    content: `Cancelled action.`,
                    embeds: [cancelled],
                    components: [rowDisabled]
                })



            }

        });

        collector.on('end', async (i, collected) => {
            if(collected.size === 0) {
                await interaction.editReply({
                    content: `This interaction has expired.`,
                    embeds: [expired],
                    components: [rowDisabled]
                })

            } else {
                await interaction.editReply({
                    components: [rowDisabled]
                })
            }
        });



       







        


    }

}
