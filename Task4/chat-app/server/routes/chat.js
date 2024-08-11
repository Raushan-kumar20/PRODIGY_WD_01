const express = require('express');
const router = express.Router();

// Example route for creating chat rooms, etc.
router.post('/create-room', (req, res) => {
    // Logic for creating a chat room
    res.status(201).send('Chat room created');
});

module.exports = router;
