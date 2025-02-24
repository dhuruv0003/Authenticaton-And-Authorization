
const mongoose=require('mongoose');

require('dotenv').config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Db connected");
    })
    .catch((err)=>{
        console.log("Error in connection");
        console.error(err);
        process.exit(1);
    })
}