const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Course = require('../models/course');
const Enrolled = require('../models/enrolled');
const Category = require('../models/category');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/viewCourse', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    Enrolled.findAll({
      where: {
        student_id: decoded.id
      }
    })
    .then( async (enrolls) => {
      if (enrolls) {
        var data = [];
        for( enroll of enrolls ) {
          await Course.findOne({
            where:{
              id:enroll.dataValues.course_id,
              status:1
            }
          })
          .then(course => {
            data.push(course.dataValues);
          })
        }
        res.json(data);
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
                course_id:enrolls.dataValues.course_id,
                status:1
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

router.post('/addCourse', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id || decoded.rank === 1){
    const courseData = {
      name: req.body.name,
      desc: req.body.desc,
      create_by: decoded.id,
      update_by: decoded.id,
      status:1
    }

    Course.create(courseData)
    .then(user => {
      res.json({ error: courseData.name + ' | Create!' });
    })
    .catch(err => {
      res.send('error: ' + err);
    })
  }
})

module.exports = router;