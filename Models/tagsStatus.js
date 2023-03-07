const mongoose = require('mongoose')

module.exports = mongoose.model(
    "tagsStatus",
    new mongoose.Schema({
       guildID: Number,
       status: Boolean,
    })
)













