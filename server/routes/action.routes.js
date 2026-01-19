const express = require('express');
const router = express.Router();
const Action = require('../models/Action');
const auth = require('../middleware/auth');


// Create a new action
router.post('/', auth, async (req, res) => {
    try {
        const action = await Action.create({
            title: req.body.title,
            description: req.body.description,
            user: req.userId,
            proofs: []
        });
        res.status(201).json(action);
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
})

// Get all actions
router.get('/',auth, async (req, res) => {
    try {
        const actions = await Action.find({user:req.userId});
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
module.exports = router;