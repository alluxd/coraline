const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("imagine")
        .setDescription("Makes ai-generated images based on the user's prompt.")
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the image. Do not put inappropriate content. Define the art style, characters etc.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction, client) {

        const prompt = interaction.options.getString("prompt") || 'cat'


       async function generateDalleImage(prompt) {
            // Use the DallE API to generate the image
            const response = await fetch(`https://api.openai.com/v1/images/generations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.config.openai}`,
                },
                body: JSON.stringify({
                    model: 'image-alpha-001',
                    prompt: prompt,
                }),
           });

            if (response.ok) {
                // Extract the image url from the response
                const json = await response.json();
                return json.data[0].url;
            } else {
                const embedFail = new EmbedBuilder()
                    .setTitle(":x: Failed to generate image!")
                    .setColor("Red")
                    .setDescription(`${interaction.user}, your query couldn't be generated. \n This is most likely because your query was against  [DALL-E's content policy](https://labs.openai.com/policies/content-policy) or the request failed. Please try again! \n 🔎 Query: ||**${prompt}**||`)
                return await interaction.editReply({ embeds: [embedFail], content: "Oops!" })
            }
        }

    

       

     
        await interaction.reply('Generating..');


        let imageUrl = await generateDalleImage(prompt); 
        //const imagefile = new AttachmentBuilder(imageUrl, { name: 'response-image.png' })

       

        const embedSuccess = new EmbedBuilder()
            .setTitle("Output")
            .addFields(
                { name: "User 💳", value: `${interaction.user}`, inline: true },
                { name: "Prompt ❔", value: `**${prompt}**`, inline: true },
            )
            .setColor("Blue")
            
            .setFooter({ text: 'Source: DALL-E' })

           
            
        await interaction.editReply({ embeds: [embedSuccess], content: "Done!" })

    }
}
