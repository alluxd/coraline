const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-presence')
        .setDescription('Update the bots presence.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('activity')
                .setDescription("Update the bot's activity.")
                .addStringOption(option =>
                    option
                        .setName("type")
                        .setDescription("Choose an activity.")
                        .setRequired(true)
                        .addChoices(
                            { name: "Playing", value: "Playing" },
                            { name: "Streaming", value: "Streaming" },
                            { name: "Listening", value: "Listening" },
                            { name: "Watching", value: "Watching" },
                            { name: "Competing", value: "Competing" },
                        )
                )



                .addStringOption(option =>
                    option
                        .setName("activity")
                        .setDescription("Set the bot's activity text.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription("Update the bot's status.")
                .addStringOption(option =>
                    option
                        .setName("type")
                        .setDescription("Choose a status type.")
                        .setRequired(true)
                        .addChoices(
                            { name: "Online", value: "online" },
                            { name: "Idle", value: "idle" },
                            { name: "Do Not Disturb", value: "dnd" },
                            { name: "Invisible", value: "invisible" },

                        )
                )
        ),

    async execute(interaction, client) {
        const { options } = interaction;

        const sub = options.getSubcommand(['activity', 'status'])

        const type = options.getString('type')
        let activity = options.getString('activity')
      //  const activityText = options.getString('activity-text')

      const { Listening, Competing, Watching, Streaming, Playing } = ActivityType;

     

      


        try {
            switch (sub) {
                case 'activity':
                    switch (type) {
                        case "Playing":
                            client.user.setActivity(activity, { type: Playing })
                            break;
                        case "Streaming":
                            client.user.setActivity(activity, { type: Streaming })
                            break;
                        case "Watching":
                            client.user.setActivity(activity, { type: Watching })
                            break;
                        case "Competing":
                            client.user.setActivity(activity, { type: Competing })
                            break;
                        case "Listening":
                            client.user.setActivity(activity, { type: Listening })
                            break;
                    }
                case 'status':
                    client.user.setStatus(type)
                    break;
            }
        } catch (err) {
            console.error(err)
        }


        if(activity === null) activity = 'Nothing'


        const embedA = new EmbedBuilder()
        .setTitle("✅ Presence updated.")
        .setDescription(`The bot's ${sub} has been updated to: **${type}: ${activity}**`)
        .setColor("Green")

        return await interaction.reply({ embeds: [embedA]})

        
    }
};