const {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

const dialogues = [
    "nah",
    "yeah",
    "probably?",
    "ur mom",
    "mogus 😳",
    "what",
    "shut up",
    "lmao no",
    "yes",
    "yup",
    "bi#ch",
    "what did u say? was playing fortnite",
    "uh",
    "balls",
    "lmao NO.",
    "L + Bozo",
    "ligma balls",
    "lmao what",
    "...",
    "8ball has left the chat.",
    "a-",
    "yos",
    "nop",
    "The Hog Rider is a Rare card that is unlocked from the Builder's Workshop (Arena 5). He is a quick, building-targeting melee troop with moderately high hitpoints and damage. He appears just like his Clash of Clans counterpart; a man with brown eyebrows, a beard, a mohawk, and a golden body piercing in his left ear who is riding a hog. A Hog Rider card costs 4 Elixir to deploy.",
    "..."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the mysterious 8Ball questions.')
        .setDefaultPermission(true)
        .addStringOption((option) =>
            option.setName('question')
            .setDescription('Question to ask?')
            .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question') || '...';
        const randomIndex = Math.floor(Math.random() * dialogues.length);
        const randomMessage = dialogues[randomIndex];

        const replypos = new EmbedBuilder()
            .setTitle('🎱 The 8-ball has responded.')
            .setDescription("You're lucky that he answered you...?")
            .setThumbnail("https://i.pinimg.com/736x/93/a2/d6/93a2d65df48ee8279556a504f24b40b7.jpg")
            .addFields({
                name: 'Question ❔',
                value: `**${question}**`,
                inline: true
            }, {
                name: 'Answer 🎱',
                value: `**${randomMessage}**`,
                inline: true
            })
            .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
            .setColor('BLUE');

        await interaction.reply({
            embeds: [replypos]
        });
    }
};
