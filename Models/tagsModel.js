const mongoose = require('mongoose')

module.exports = mongoose.model(
    "tags",
    new mongoose.Schema({
        tagName: String,
         tagContent: String,
         tagGuild: Number,
         tagAuthor: String,
         timestamp: Number
    })
)













