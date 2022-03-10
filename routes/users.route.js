const router = require('express').Router();
const { Trainer, User } = require('../models/users.model');

//  @route   POST api/user/
router.post('/', async (req, res) => {
    try {
        const { email, name, gender, DOB, phone, trainerRef } = req.body;
        const user = new User({
            email, name, gender, DOB, phone, trainerRef, sessions: []
        });
        const savedUser = await user.save();
        res.json({user: savedUser});
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   POST api/user/trainer
router.post('/trainer', async (req, res) => {
    try {
        const { email, name, userRef } = req.body;
        const trainer = new Trainer({ email, name, userRef });
        const savedTrainer = await trainer.save();
        res.json({trainer: savedTrainer});
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;