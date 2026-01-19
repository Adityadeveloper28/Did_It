const mongoose = require('mongoose');
const ProofSchema = require('./Proof');

const actionSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  proofs: [ProofSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', actionSchema);
