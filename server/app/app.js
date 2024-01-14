const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const studentRoutes = require('../routes/studentRoutes')
const teacherRoutes = require('../routes/teacherRoutes')
const authRoutes = require('../routes/authRoutes')
const {verifyToken} = require('../utils');
// token

dotenv.config();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/students', studentRoutes)
app.use('/teachers', teacherRoutes)
app.use('/auth', authRoutes)

// adauga rute
//app.get('isUserAuth', verifyToken, studentRoutes);

app.get('isUserAuth', verifyToken, (req, res) => {
    return res.json("Authenticated");
})
module.exports = app