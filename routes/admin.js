const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Course = require('../models/course');
const User = require('../models/user');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/viewAllCourse', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    User.findOne({
      where: {
        id: decoded.id,
        rank: "1"
      }
    })
    .then( async (users) => {
      let data = [];
      if (users) {
        await Course.findAll()
        .then(courses => {
          courses.map((courseData) => data.push(courseData.dataValues));
        });
        res.json(data);
      } else {
        res.json({error:'Not have any course'});
      }
    })
    .catch(err => {
      res.send({error:'error: '+err});
    });
  }
});

router.post('/course', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    User.findOne({
      where: {
        id: decoded.id,
        rank: "1"
      }
    })
    .then( async (users) => {
      if (users) {
        const courseData = {
          name: req.body.name,
          desc: req.body.desc,
          create_by: decoded.id,
          update_by: decoded.id,
          status: req.body.status
        }
    
        await Course.create(courseData)
        .then(user => {
          res.json({ error: courseData.name + ' | Create!' });
        })
        .catch(err => {
          res.send('error: ' + err);
        })

      }else{
        res.send('You not have permission');
      }
    })
    .catch(err => {
      res.send({error:'error: '+err});
    });
  }
});

router.put('/course', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    User.findOne({
      where: {
        id: decoded.id,
        rank: "1"
      }
    })
    .then( async (users) => {
      if (users) {
        await Course.update({
          name: req.body.name,
          desc: req.body.desc,
          status: req.body.status
        }, {
          where: { id: req.body.course_id },
          returning: true,
          plain: true
        })
        .then(courses => {
          res.json(courses)
        });
      } else {
        res.json({error:'You not have permission'});
      }
    })
    .catch(err => {
      res.send({error:'error: '+err});
    });
  }
});

router.delete('/course', (req, res) => {
  var decoded = jwt.verify(req.body.usertoken, process.env.SECRET_KEY);

  if(decoded.id){
    User.findOne({
      where: {
        id: decoded.id,
        rank: "1"
      }
    })
    .then( async (users) => {
      if (users) {
        await Course.destroy({
          where: {
            id: req.body.course_id
          }
        })
        .then(courses => {
          res.json(courses);
        });
      } else {
        res.json({error:'You not have permission'});
      }
    })
    .catch(err => {
      res.send({error:'error: '+err});
    });
  }
});

module.exports = router;