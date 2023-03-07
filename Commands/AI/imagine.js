const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");
const fetch = require('node-fetch');
const { it } = require("node:test");

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
                    'Authorization': `Bearer ${client.config.apikey}`,
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
              return interaction.channel.send({ content: "Failed! This is probably because your query is against the content policy!" })
               // throw new Error(`Failed to generate image: ${response.statusText}`);

            }
        }

  
  await interaction.reply('Generating..');

       
           
    /* generateDalleImage(prompt).then(image => interaction.channel.send({ files: [image], content: "Done!" }))
      .catch(error => interaction.channel.send(`An error occurred: ${error}`));
          */

      const imagefile = new AttachmentBuilder(await generateDalleImage(prompt), { name: 'response-image.png' })
      
      await interaction.deferReply
  await interaction.editReply({files: [imagefile], content: `✅ Generated Image! \n **💭 Request: ${prompt} \n 👦 User: ${interaction.user}**`})

    }
}







