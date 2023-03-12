const mongoose = require('mongoose')

module.exports = mongoose.model(
    "warns",
    new mongoose.Schema({
     warnId: _id,
     userId: Number,
     warnReason: String,
     moderatorId: Number,
     timestamp: Number,
     
    })
)













