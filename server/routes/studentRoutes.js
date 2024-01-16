const express = require('express');
const bcrypt = require('bcrypt');
const {handleErrorResponse, verifyToken} = require('../utils');

const StudentUser = require('../database/models/StudentUser');
const Request = require('../database/models/Request');
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
router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;

        const user = await StudentUser.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            res.status(404).json({ success: false, message: 'Error finding user', data: {} });
        }

        res.status(200).json({ success: true, message: 'User was found', data: user })
    } catch (error) {
        handleErrorResponse(res, error, 'Error finding user');
    }
})

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

// put == update
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;

        const user = await StudentUser.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            res.status(404).json({ success: false, message: 'Error finding user', data: {} });
        }

        const updatedUser = await user.update(req.body, {
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({ success: true, message: "User updated", data: updatedUser });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating user');
    }
})

// put -> update requests table


module.exports = router