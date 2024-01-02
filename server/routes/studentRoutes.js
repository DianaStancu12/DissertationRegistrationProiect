const express = require('express');
const bcrypt = require('bcrypt');
const {handleErrorResponse} = require('../utils');

const StudentUser = require('../database/models/StudentUser');

const router = express.Router();

//select *

router.get('/', async function (req, res) {
    try {
        const users = await StudentUser.findAll({
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(users);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving students');
    }
});

// select by id

// insert
router.post('/', async function (req, res) {
    try {
        const { username, password, name, email } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createdUser = await StudentUser.create({
            username,
            password: hashedPassword,
            name, 
            email
        });

        res.status(201).json(createdUser);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating users');
    }
})

module.exports = router