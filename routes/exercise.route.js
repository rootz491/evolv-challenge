const router = require('express').Router();
const { Exercise, ExerciseInfo, ExerciseSet } = require('../models/exercise.model');
const { Session } = require('../models/session.model');

// @route   GET api/exericse/
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

//  @route   GET api/exercise/:id
router.get('/:id', async (req, res) => {
    try {   
        const exercise = await Exercise.findById(req.params.id);
        res.json(exercise);
    } catch (error) {
        console.log(error.message || err);
        res.status(500).send('Server Error');
    }
});

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
        const { exerciseName, userRef } = req.body;
        const exerciseInfo = await ExerciseInfo.findOne({ name: exerciseName });
        const session = await Session.findOne({ userRef });
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
        const { exerciseName, userRef, number, suggestedWeight, suggestedReps } = req.body;
        const session = await Session.findOne({ userRef });
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