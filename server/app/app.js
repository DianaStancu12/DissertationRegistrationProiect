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

// app.get('/isUserAuth', verifyToken, (req, res) => {
//     return res.json("Authenticated");
// })


// trying
// app.get('/userInfo',verifyToken, (req, res) => {
//     try {
//         const userId = {id: req.decoded.user.id};

//         const user = StudentUser.findByPk(userId, {
//             attributes: { exclude: ['password'] }
//         });

//         if (!user) {
//             res.status(404).json({ success: false, message: 'Error finding user', data: {} });
//         }

//         res.status(200).json({ success: true, message: 'User was found', data: user })
//     } catch (error) {
//         handleErrorResponse(res, error, 'Error finding user');
//     }
// })
module.exports = app