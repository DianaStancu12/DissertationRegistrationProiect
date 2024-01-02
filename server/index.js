const app = require('./app/app');

const StudentUser = require('./database/models/StudentUser');
const TeacherUser = require('./database/models/TeacherUser');

TeacherUser.hasMany(StudentUser, {foreighKey: "teacherId"});

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.listen(5001)