const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, },
    createdAt: { type: Date, default: Date.now },
  },
);


module.exports = proofSchema;