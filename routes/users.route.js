const router = require('express').Router();
const { Trainer, User } = require('../models/users.model');

//  @route   POST api/user/
//  @desc    Create a new user
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

//  @route   PUT api/user/:id
//  @desc    Update user's trainerRef
router.put('/', async (req, res) => {
    try {
        const { trainerRef, email } = req.body;
        const user = await User.findOne({email});
        if (user) {
            user.trainerRef = trainerRef;
            const savedUser = await user.save();
            res.json({user: savedUser});
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
})

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