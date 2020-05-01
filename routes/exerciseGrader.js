const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Enrolled = require('../models/enrolled');
const Exercise = require('../models/exercise');
const Grade_transaction = require('../models/grade_transaction');
router.use(cors());

const TestCaseRunner = require('./functions/grader');

process.env.SECRET_KEY = 'secret';

function jwtDecode(usertoken, secret_key) {
  return jwt.verify(usertoken, secret_key);
}

router.post('/viewExercise/:id', (req, res) => {
  var decoded = jwtDecode(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    Exercise.findOne({
      where: {
        id: req.params.id
      }
    })
    .then( async (category) => {
      if (category) {
        await Enrolled.findOne({
            where:{
              course_id:category.dataValues.course_id
            }
          })
          .then(async enrolled => {
            if(enrolled) {
                await Exercise.findAll({
                        where:{
                            category_id:req.params.id,
                            status:1
                        }
                    })
                    .then(exercises => {
                        var data = []
                        for( exercise of exercises ){
                            exercise.dataValues.test_case = null;
                            data.push(exercise.dataValues);
                        }
                        res.json(data);
                    })
            }
          })
      } else {
        res.send('Not have any course');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
  }
})

router.post('/findTestResult/:id', (req, res) => {
  var decoded = jwtDecode(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    Grade_transaction.findOne({
      where: {
        student_id: decoded.id,
        exercise_id: req.params.id
      },
      order: [ [ 'createdAt', 'DESC' ]]
    })
    .then( async (gradeTransaction) => {
        res.json(gradeTransaction.dataValues);
    })
    .catch(err => {
      res.send('error: ' + err);
    });
  }
})


router.post('/runTestCase', (req, res) => {
  var decoded = jwtDecode(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    Enrolled.findOne({
      where: {
        student_id: decoded.id,
        course_id: req.body.id
      }
    })
    .then( async (enroll) => {
        if(enroll){
          await Exercise.findOne({
            where:{
              id:req.body.exercise_id
            }
          })
          .then( async (exercises) => {
            if(exercises){
              const TestResultString = await TestCaseRunner(req.body.raw_code, eval(exercises.dataValues.test_case), exercises.dataValues.function_name);
              Grade_transaction.create({
                exercise_id: exercises.dataValues.id,
                student_id: decoded.id,
                result: TestResultString[1],
                code: req.body.raw_code
              })
              .then(transaction => {
                res.send(TestResultString);
              });
            }
          })
        }
    })
    .catch(err => {
/*      Grade_transaction.create({
        exercise_id: exercise.dataValues.id,
        student_id: decoded.id,
        result: "-".repeat(eval(exercises.dataValues.test_case).length),
        code: req.body.raw_code
      }) */

      res.send('error: ' + err);
    });
  }
})

router.post('/addExercise', (req, res) => {
  var decoded = jwtDecode(req.body.usertoken, process.env.SECRET_KEY);
  
    if(decoded.id || decoded.rank === 1){
      const exerciseData = {
        course_id: req.body.course_id,
        category_id: req.body.category_id,
        title: req.body.title,
        desc: req.body.desc,
        starter_code: req.body.starter_code,
        test_case: req.body.test_case,
        create_by: decoded.id,
        update_by: decoded.id,
        status:1
      }
  
      Exercise.create(exerciseData)
      .then(exercise => {
        res.json({ error: exerciseData.name + ' | Create!' });
      })
      .catch(err => {
        res.send('error: ' + err);
      })
    }
  })

module.exports = router;