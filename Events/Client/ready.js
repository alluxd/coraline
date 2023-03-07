const {Client, ActivityType, EmbedBuilder} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log(`📗 ${client.user.username} is online!`);
    client.user.setActivity('The House! 🏠', { type: ActivityType.Watching });
    
  },
};
