const mongoose = require('mongoose')

module.exports = mongoose.model(
    "userBalance",
    new mongoose.Schema({
      userID: Number,
      wallet: Number,
      bank: Number
    })
)













