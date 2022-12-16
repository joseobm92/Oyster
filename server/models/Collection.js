const { Schema, model } = require("mongoose");

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  supply: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  avg_price: {
    type: Number,
    required: true,
  },
});

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
