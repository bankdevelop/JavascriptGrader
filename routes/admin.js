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

module.exports = router;