const express = require('express');
const router = express.Router();
const Action = require('../models/Action');
const upload = require('../middleware/upload');

const auth = require('../middleware/auth');
router.post('/',auth, upload.single('image'), async (req, res) => {
  const { actionId, text } = req.body;

  const action = await Action.findById(
    {
        _id: actionId,
        user: req.userId
    }
  );
  if (!action) {
    return res.status(404).json({ error: 'Action not found' });
  }
  const proof = {
    text,
    imageUrl: req.file ? req.file.path : undefined,
  };
  action.proofs.push(proof);
  await action.save();
  res.status(201).json(proof);
});

module.exports = router;
