const express=require('express')

exports.router=express.Router();

const {login, signup}=require('../controller/Auth')

router.post('/login',login);
router.post('/signup',signup);

// module.exports=router