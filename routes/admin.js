const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Course = require('../models/course');
const Category = require('../models/category');
const Exercise = require('../models/exercise');
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
        res.json({error:'You not have permission'});
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

router.put('/course/:usertoken/:course_id/:name/:desc/:status', (req, res) => {
  var decoded = jwt.verify(req.params.usertoken, process.env.SECRET_KEY);

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
          name: req.params.name,
          desc: req.params.desc,
          status: req.params.status
        }, {
          where: { id: req.params.course_id },
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

router.delete('/course/:usertoken/:course_id', (req, res) => {
  var decoded = jwt.verify(req.params.usertoken, process.env.SECRET_KEY);

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
            id: req.params.course_id
          }
        })
        .then(courses => {
          Category.destroy({where: {course_id: req.params.course_id}});
          Exercise.destroy({where: {course_id: req.params.course_id}});
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

router.post('/viewAllCategory/:id', (req, res) => {
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
        await Category.findAll({
          where: {
            course_id: req.params.id
          }
        })
        .then(category => {
          console.log(category);
          category.map((categoryData) => data.push(categoryData.dataValues));
        });
        res.json(data);
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