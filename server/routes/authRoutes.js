const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleErrorResponse} = require('../utils');

const StudentUser = require('../database/models/StudentUser');
const TeacherUser = require('../database/models/TeacherUser');
const { use } = require('./studentRoutes');

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

        const id = user.dataValues.id;

        const token = jwt.sign({id: id}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })

        console.log(token);

        return res.status(200).json({success: true, message: "User logged in", data: token, user: user})
        //res.json({auth:true, token: token, result: user});
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

// sign in
router.post('/signin', async (req, res) => {
    try {
        const {  email, password, role } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        let User;
        if (role === 'student') {
            User = StudentUser;
        } else if (role === 'teacher') {
            User = TeacherUser;
        } 
        else {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user) {
            return res.status(404).json({success: false, message: "User not found", data: {}});
        }

        const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);

        if(!isValidPassword) {
            return res.status(400).json({success: false, message: "Invalid password", data: {}});
        }

        const id = user.dataValues.id;

        const token = jwt.sign({id: id}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })

        console.log(token);

        return res.status(200).json({success: true, message: "User logged in", data: token, user: user})
        
    } catch (error) {
        handleErrorResponse(res, error, 'Error logging in');
}
});


//SIGN UP
router.post('/signup', async (req, res) => {
    try {
        const { username, name, email, password, role } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // if (!username ||!name || !email || !password || !role) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }

        let User;
        if (role === 'student') {
            User = StudentUser;
        } else if (role === 'teacher') {
            User = TeacherUser;
        } 
        else {
            return res.status(400).json({ message: "Invalid role" });
        }

        const newUser = await User.create({ 
            username,
            name,
            email, 
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json
({ message: "Error creating user", error: error.message });
}
});

router.post('/check', function (req, res) {
    const token = req.body.token;

    if(!token) {
        return res.status(404).json({success: false, message: "Token not found", data: {}});
    }

    const isValidToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!isValidToken) {
        return res.status(400).json({success: false, message: "Invalid token", data: {}});
    }

    return res.status(200).json({success: true, message: "Valid token", data: token})
})

module.exports = router;