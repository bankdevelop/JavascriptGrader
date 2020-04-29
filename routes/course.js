const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Course = require('../models/course');
const Enrolled = require('../models/enrolled');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/addCourse', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

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
              id:enroll.dataValues.course_id
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

router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
      where: {
        id: decoded.id
      }
    })
    .then(user => {
      console.log(user);
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
})

module.exports = router;