const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    type: String,

    category: String,

    organizer: String,

    location: String,

    deadline: String,

    source: String,

    sourceUrl: {
      type: String,
      unique: true,
    },

    tags: [String],

    fundingRange: String,

    startupStage: String,

    mode: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
