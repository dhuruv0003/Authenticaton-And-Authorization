const express=require("express")

const app=express();

require('dotenv').config();

const PORT=process.env.PORT || 4000;

// body parser express.json extracts the uncstrucired data from the body of request and than convers it into structures form .
app.use(express.json());

// Cookie-parser:- Extracts the cookie data from the HTTP request and converts it into a usable format that can be accessed by the server-side code
const cookieParser=require('cookie-parser');
app.use(cookieParser());


require('./config/database').dbconnect();

const allroute=require('./routes/route')
app.use("/api/v1",allroute)


app.listen(PORT,()=>{
    console.log(`App is listenong at ${PORT}`);
})