const User = require('../models/User')
const CryptoJS = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')


async function register(req,res,next)
{


    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password: CryptoJS.AES.encrypt(password,process.env.SECRET_PARAPHRASE).toString()
    })
    try
    {
        const savedUser = await newUser.save()


        const registeredUser = await User.find({username:username})
        const accessToken = jwt.sign({
            id:registeredUser._id,
            isAdmin: registeredUser.isAdmin
        },process.env.JWT_SECRET,{expiresIn:'3d'})


        const {password,...userInfo}= registeredUser._doc;
        res.status(201).json({...userInfo,accessToken})
    }
    catch (err)
    {
        res.status(500).json(err)
    }
}




module.exports = register;

