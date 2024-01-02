const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const studentRoutes = require('../routes/studentRoutes')

//adauga rute

// token

dotenv.config();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/students', studentRoutes)

// adauga rute

module.exports = app