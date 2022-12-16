const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const projectSchema = new Schema({
  name: {
    type: String,
    required: "Your project needs a name!",
    trim: true,
  },
  projectAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  symbol: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  supply: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Project = model("Project", projectSchema);

module.exports = Project;
