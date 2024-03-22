const mongoose = require("mongoose");

const pairSchema = new mongoose.Schema({
  priceNative: String,
  priceUsd: String,
  volume: {
    h24: Number,
    h6: Number,
    h1: Number,
    m5: Number
  }
});

const Pair = mongoose.model("Pair", pairSchema);

module.exports = Pair;
