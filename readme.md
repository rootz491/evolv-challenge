

# solution:


## Level 1

*   create a trainer:

    *   url: `http://localhost:3000/api/user/trainer` 
    *   body:
        
        ```json
        {            
            "email": "rootz491@gmail.com",
            "name": "rootz"
        }
        ```
    *   response:

        ```json
        {
            "trainer": {
                "name": "rootz",
                "email": "rootz491@gmail.com",
                "userRefs": [],
                "_id": "622a3c874e72c3e08c9c5010",
                "createdAt": "2022-03-10T17:59:35.666Z",
                "updatedAt": "2022-03-10T17:59:35.666Z",
                "__v": 0
            }
        }
        ```

*   create a user:

    *   url: `http://localhost:3000/api/user/` 
    *   body:

        ```json
        {            
            "email": "karan@gmail.com",
            "name": "Karan Sharma", 
            "gender": "M",
            "DOB": "10 march 2021",
            "phone": "6397523249",
            "trainerRef": "622a3c874e72c3e08c9c5010"
        }
        ```

    *   response:

        ```json
        {
            "user": {
                "email": "karan@gmail.com",
                "name": "Karan Sharma",
                "gender": "M",
                "DOB": "2021-03-09T18:30:00.000Z",
                "phone": 6397523249,
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "sessions": [],
                "_id": "622a3cac4e72c3e08c9c5012",
                "createdAt": "2022-03-10T18:00:12.601Z",
                "updatedAt": "2022-03-10T18:00:12.601Z",
                "__v": 0
            }
        }
        ```

## Level 

>   I'm creating generic API endpoints to create session for users, exercise-info for exercises, exercise & also exercise-set!

*   create a session (with empty array of exercises) for above user:

    *   url: `http://localhost:3000/api/session/`

    *   body:

        ```json
        {
            "userRef": "622a3cac4e72c3e08c9c5012",
            "trainerRef": "622a3c874e72c3e08c9c5010",
            "date": "13 march 2021"
        }
        ```

    *   response:

        ```json
        {
            "session": {
                "workout": {
                    "exercises": [],
                    "_id": "622a55e43ad23b7993889f1a"
                },
                "date": "2021-03-12T18:30:00.000Z",
                "userRef": "622a3cac4e72c3e08c9c5012",
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "isCompleted": false,
                "_id": "622a55e43ad23b7993889f19",
                "__v": 0
            }
        }
        ```

*   create exercise-info (pushup & squat) for reference:

    *   url: `http://localhost:3000/api/exercise/info/`

    *   body:
        ```json
        {
            "name": "pushup",
        }
        ```

    *   response:
        ```json
        {
            "name": "Pushup",
            "_id": "622a598d08cf195905c22897",
            "__v": 0
        }
        ```

        >   note: create exercise-info for `squat` & `pushup`
    
*   create an exercise (with empty array of sets) for above session:

    *   url: `http://localhost:3000/api/exercise/`

    *   body:

        ```json
        {
            "userRef": "622a3cac4e72c3e08c9c5012",
            "exerciseName": "Pushup",
        }
        ```

    *   response:
        ```json
        {
            "session": {
                "_id": "622a55e43ad23b7993889f19",
                "workout": {
                    "exercises": [
                        {
                            "exerciseInfoRef": "622a598d08cf195905c22897",
                            "exerciseSets": [],
                            "_id": "622a60cee0f9e9cdad096d77"
                        }
                    ],
                    "_id": "622a55e43ad23b7993889f1a"
                },
                "date": "2021-03-12T18:30:00.000Z",
                "userRef": "622a3cac4e72c3e08c9c5012",
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "isCompleted": false,
                "__v": 1
            }
            }
        ```

        >   note: create exercise for `pushup` & `squat`

*   create a set for above exercise:

    *   url: `http://localhost:3000/api/exercise/set/`

    *   body:

        ```json
        {
            "userRef": "622a3cac4e72c3e08c9c5012",
            "exerciseName": "Pushup",
            "number": 1,
            "suggestedWeight": 100,
            "suggestedReps": 20
        }
        ```

    *   response:
        ```json
        {
            "session": {
                "_id": "622a55e43ad23b7993889f19",
                "workout": {
                "exercises": [
                    {
                        "exerciseInfoRef": "622a598d08cf195905c22897",
                        "exerciseSets": [
                            {
                                "number": 1,
                                "suggestedWeight": 100,
                                "suggestedReps": 20,
                                "_id": "622a6445e0acd9fae04d1360"
                            }
                        ],
                        "_id": "622a60cee0f9e9cdad096d77"
                    }
                ],
                "_id": "622a55e43ad23b7993889f1a"
                },
                "date": "2021-03-12T18:30:00.000Z",
                "userRef": "622a3cac4e72c3e08c9c5012",
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "isCompleted": false,
                "__v": 2
            }
        }
        ```

        >  note: here i created a set for `pushup` exercise of above user's session workout, so silimarly can create 3 sets for `squat` & rest of 2 for `pushup`

*   Create an UPDATE Api to update the 1st set of the 1st exercise to update the following attributes –{performedWeight, performedReps}

    *   url: `http://localhost:3000/api/exercise/updateFirstSet/`

    *   body:

        ```json
        {
            "userRef": "622a3cac4e72c3e08c9c5012",
            "performedWeight": 120,
            "performedReps": 25
        }
        ```

    *   response:

        ```json
        {
            "session": {
                "_id": "622a55e43ad23b7993889f19",
                "workout": {
                    "exercises": [
                        {
                            "exerciseInfoRef": "622a598d08cf195905c22897",
                            "exerciseSets": [
                                {
                                "number": 1,
                                "suggestedWeight": 100,
                                "suggestedReps": 20,
                                "_id": "622a6445e0acd9fae04d1360",
                                "performedWeight": 120,
                                "performedReps": 25
                                }
                            ],
                            "_id": "622a60cee0f9e9cdad096d77"
                        }
                    ],
                    "_id": "622a55e43ad23b7993889f1a"
                },
                "date": "2021-03-12T18:30:00.000Z",
                "userRef": "622a3cac4e72c3e08c9c5012",
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "isCompleted": false,
                "__v": 2
            }
        }
        ```

        >   note: here i updated the 1st set of the 1st exercise of above user's session workout. This is required for challenge's Level 2 second part. It's NOT a generic function.

## Level 3

*   Create an UPDATE Api which will receive date in the body and shift the date by 1 day if the session is not completed. Pass 9th March in the body of UPDATE Api and run to shift the 10th and 14th March sessions to 11th and 15th respectively

    *   url: `http://localhost:3000/api/session/shift/`

    *   body:
        ```json
        {
            "sessionRef": "622a55e43ad23b7993889f19"
        }
        ```

    *   response: 

        ```json
        {
            "session": {
                "_id": "622a55e43ad23b7993889f19",
                "workout": {
                    "exercises": [
                        {
                            "exerciseInfoRef": "622a598d08cf195905c22897",
                            "exerciseSets": [
                                {
                                    "number": 1,
                                    "suggestedWeight": 100,
                                    "suggestedReps": 20,
                                    "_id": "622a6445e0acd9fae04d1360",
                                    "performedReps": 25,
                                    "performedWeight": 120
                                }
                            ],
                            "_id": "622a60cee0f9e9cdad096d77"
                        }
                    ],
                    "_id": "622a55e43ad23b7993889f1a"
                },
                "date": "2021-03-13T18:30:00.000Z",
                "userRef": "622a3cac4e72c3e08c9c5012",
                "trainerRef": "622a3c874e72c3e08c9c5010",
                "isCompleted": false,
                "__v": 2
            }
        }
        ```

        >   I'm not sure or confused in level 3 challenge. So i'm taking sessionRef as input, checking if it's completed or not, if not then shift the date by 1 day.

        >   I'm pretty sure that this isn't 100% correct, but yea...cant do anything about it.