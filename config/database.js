
const mongoose=require('mongoose');

require('dotenv').config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Db connected");
    })
    .catch(()=>{
        console.log("Error in connection");
        console.error(err);
        process.exit(1);
    })
}