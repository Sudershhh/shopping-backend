const express = require('express');
const User = require('../models/User')
const CryptoJS = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')



async function login(req, res, next)
{
    const {username,password} = req.body;
    
        try
        {
            const user = await User.findOne({username: username})
    
    
            if(!user)
            {
                res.status(401).json('User does not exist!')
            }
    
            else
            {
                const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET_PARAPHRASE)
                const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    
                if(OriginalPassword != password)
                {
                    res.status(401).json('WRONG PASSWORD')
                }
                else
                {
                    const accessToken = jwt.sign({
                        id:user._id,
                        isAdmin: user.isAdmin
                    },process.env.JWT_SECRET,{expiresIn:'3d'})


                    const {password, ...userInfo} = user._doc;
                    res.status(200).json({...userInfo,accessToken})
                    
                }
    
            }
    
        }catch(err)
        {
            res.status(500).json(err)
        }
}




module.exports = login;