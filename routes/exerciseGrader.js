const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Enrolled = require('../models/enrolled');
const Category = require('../models/category');
const Exercise = require('../models/exercise');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/viewExercise/:id', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

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
                            course_id:enrolled.dataValues.course_id,
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

router.post('/viewCourseCategory/:id', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    Enrolled.findOne({
      where: {
        student_id: decoded.id,
        course_id: req.params.id
      }
    })
    .then( async (enrolls) => {
          await Category.findAll({
              where:{
                course_id:enrolls.dataValues.course_id
              }
            })
            .then(course => {
              var data = []
              for( category_course of course ){
                data.push(category_course.dataValues);
              }
              res.json(data);
            })
    })
    .catch(err => {
      res.send('error: ' + err);
    });
  }
})

router.post('/addExercise', (req, res) => {
    var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);
  
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