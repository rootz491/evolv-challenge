const router = require('express').Router();
const { Session } = require('../models/session.model');

// @route   POST api/session/
router.post('/', async (req, res) => {
    try {
        const { userRef, trainerRef, date } = req.body;
        const session = new Session({
            userRef,
            trainerRef,
            date,
            workout: {
                exercises: []
            }
        });
        const newSession = await session.save();
        res.status(201).json({session: newSession});
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   GET api/session/shift
router.put('/shift', async (req, res) => {
    try {
        const { sessionRef } = req.body;
        const session = await Session.findById(sessionRef);
        if (session.isCompleted === false) {
            session.date = new Date(session.date.setDate(session.date.getDate() + 1));
            const newSession = await session.save();    
            res.json({session: newSession});
        } else {
            res.status(400).send('Session is already completed');
        }

    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;