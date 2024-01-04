const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleErrorResponse} = require('../utils');

const StudentUser = require('../database/models/StudentUser');
const TeacherUser = require('../database/models/TeacherUser');

const router = express.Router();

router.post('/student/login', async function(req, res) {
    try {
        const {email, password} = req.body;

        const user = await StudentUser.findOne({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(404).json({success: false, message: "User not found", data: {}});
        }

        const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);

        if(!isValidPassword) {
            return res.status(400).json({success: false, message: "Invalid password", data: {}});
        }

        const token = jwt.sign({id: user.dataValues.id}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })

        return res.status(200).json({success: true, message: "User logged in", data: token})
    } catch (error) {
        handleErrorResponse(res, error, 'Error logging in');
        //console.log('Error logging in');
    }
})

router.post('/teacher/login', async function(req, res) {
    try {
        const {email, password} = req.body;

        const user = await TeacherUser.findOne({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(404).json({success: false, message: "User not found", data: {}});
        }

        const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);

        if(!isValidPassword) {
            return res.status(400).json({success: false, message: "Invalid password", data: {}});
        }

        const token = jwt.sign({id: user.dataValues.id}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })

        return res.status(200).json({success: true, message: "User logged in", data: token})
    } catch (error) {
        handleErrorResponse(res, error, 'Error logging in');
        //console.log('Error logging in');
    }
})


module.exports = router;