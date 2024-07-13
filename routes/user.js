const express=require('express')
const router=express.Router();

const {signup,login}=require('../controller/Auth');
const { auth, isStudent, isAdmin } = require('../MiddleWare/MiddleW');

router.post("/signup",signup);
router.post("/login",login);

//Using middlewaared for testing protetedroutes

router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Protected routes for test"
    })
})

// Proteted route for student

router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Protected routes for student"
    })
})

// Proteted route for student

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Protected routes for Admin"
    })
})

module.exports=router