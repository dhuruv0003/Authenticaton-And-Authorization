const express=require('express')
const router=express.Router();

const {signup,login}=require('../controller/Auth');

router.post("/signup",signup);
router.post("/login",login);



//          Proteted Routes
const { auth, isStudent, isAdmin } = require('../MiddleWare/MiddleW');

//Using middleware for testing 
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

// Protected route for admin

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Protected routes for Admin"
    })
})

module.exports=router