const router = require('express').Router();
const { Exercise, ExerciseInfo, ExerciseSet } = require('../models/exercise.model');
const { Session } = require('../models/session.model');

//  @route   PUT api/exercise/info
//  @desc    create exercise info for referencing in user's session > workout > exercises
router.post('/info', async (req, res) => {
    try {
        const { name } = req.body;
        const exercise = new ExerciseInfo({ name });
        const newExercise = await exercise.save();
        res.json(newExercise);
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   POST api/exercise/
//  @desc    Create an exercise for session
router.post('/', async (req, res) => {
    try {
        const { exerciseName, userRef, sessionRef } = req.body;
        const exerciseInfo = await ExerciseInfo.findOne({ name: exerciseName });
        const session = await Session.findOne({ userRef, _id: sessionRef });
        const exercise = new Exercise({
            exerciseInfoRef: exerciseInfo._id,
            exerciseSets: []
        });
        session.workout.exercises.push(exercise);
        await session.save();
        res.json({session});
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   POST api/exercise/set
//  @desc    Create an exercise set for exercise
router.post('/set', async (req, res) => {
    try {
        const { exerciseName, sessionRef, userRef, number, suggestedWeight, suggestedReps } = req.body;
        const session = await Session.findOne({ userRef, _id: sessionRef });
        const ex = await ExerciseInfo.findOne({ name: exerciseName });
        session.workout.exercises.forEach(exercise => {
            if (exercise.exerciseInfoRef.toString() === ex._id.toString()) {
                const exerciseSet = new ExerciseSet({
                    number,
                    suggestedWeight,
                    suggestedReps
                });
                exercise.exerciseSets.push(exerciseSet);
            }
        })
        await session.save();
        res.json({ session });
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   PUT api/exercise/updateFirstSet
//  @desc    Update first exercise set for exercise of user's session
router.put('/updateFirstSet', async (req, res) => {
    try {
        const { userRef, performedWeight, performedReps } = req.body;
        const session = await Session.findOne({ userRef });
        session.workout.exercises[0].exerciseSets[0].performedWeight = performedWeight;
        session.workout.exercises[0].exerciseSets[0].performedReps = performedReps;
        await session.save();
        res.json({ session });
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;