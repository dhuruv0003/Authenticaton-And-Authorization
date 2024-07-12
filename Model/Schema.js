const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
        // If you add { type: String, trim: true } to a field in your schema, then trying to save strings like " hello" , or "hello " , or " hello " , would end up being saved as "hello" in Mongo
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
});

module.exports=mongoose.model("schema",userSchema)