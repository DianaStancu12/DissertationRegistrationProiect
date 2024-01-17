const express = require('express');
const bcrypt = require('bcrypt');
const {handleErrorResponse} = require('../utils');

const TeacherUser = require('../database/models/TeacherUser');

const router = express.Router();

//select *

router.get('/', async function (req, res) {
    try {
        const users = await TeacherUser.findAll({
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(users);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving students');
    }
});

// select by id for heading
router.get('/:id', async function (req, res) {
try {
    const id = req.params.id;

    const user = await TeacherUser.findByPk(id, {
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

        const createdUser = await TeacherUser.create({
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

// update
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { email, name } = req.body;
    

    try {
    const user = await TeacherUser.findByPk(id, {
        attributes: { exclude: ['password'] }
    });

    if (!user) {
        return res.status(404).json({ success: false, message: 'Cererea nu a fost găsită', data: {} });
    }

    user.email = email;
    user.name = name;
    await user.save();

    return res.status(200).json({ success: true, message: 'Cererea a fost actualizată cu succes', data: user });
    } catch (error) {
    console.error('Error updating request:', error);
    return res.status(500).json({ success: false, message: 'Eroare la actualizarea cererii', data: {} });
    }
});

module.exports = router