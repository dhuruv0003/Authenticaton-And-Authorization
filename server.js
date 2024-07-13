const express=require("express")

const app=express();

require('dotenv').config();

const PORT=process.env.PORT || 4000;

// body parser express.json extracts the uncstrucyired data from the body of request and than convers it inoo structures form .

app.use(express.json());

require('./config/database').dbconnect();

const allroute=require('./routes/route')
app.use("/api/v1",allroute)


app.listen(PORT,()=>{
    console.log(`App is listenong at ${PORT}`);
})