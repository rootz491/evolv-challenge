const router = require('express').Router();
const mongoose = require('mongoose');
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

//  @route   PUT api/session/:id
router.put('/:id', async (req, res) => {
    try {
        const sessionRef = req.params.id;
        if (mongoose.Types.ObjectId.isValid(sessionRef) === false) // check for valid ObjectId
            throw new Error('Invalid session id');
        const { date } = req.body;
        const dateObj = new Date(date);
        if (dateObj instanceof Date && !isNaN(dateObj)){ // check if date is valid
            const session = await Session.findById(sessionRef);
            if (session.isCompleted === false) {
                dateObj.setTime(dateObj.getTime() + 1000 * 60 * 60 * 24 * 2);   // add 1 day
                session.date = dateObj;
                await session.save();    
                res.json({session});
            } else {
                res.json({message: 'Session is already completed'});
            }
        } else {
            res.json({message: 'Invalid date'});
        }
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;