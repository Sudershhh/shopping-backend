const express = require('express');
const router = express.Router();

require('dotenv').config()

const login = require('../middlewares/login')
const register = require('../middlewares/register')


//REGISTER


router.post('/register',register)


//LOGIN

router.post('/login',login)



module.exports = router;