var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./database/index')

var app = express();
var port = process.env.PORT || 5000;

db.sequelize.sync();

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var user = require('./routes/user');
var course = require('./routes/course');
var exercise = require('./routes/exerciseGrader');
var admin = require('./routes/admin');

app.use('/users', user);
app.use('/course', course);
app.use('/exercise', exercise);
app.use('/admin', admin);
/*
app.use('/exerise', user);

app.use('/grader', user);
*/
app.all('*', (req, res) => {
    res.status(404).send("Error 404");
})

app.listen(port);