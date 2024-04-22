import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from './config/connectdb.js';
dotenv.config(); //Note You will not be needed Dotenv package if you are using latest 20 version of Nodejs;

const app = express();
const port=process.env.port;
const DATABASE_URL = process.env.DATABASE_URL;

// For using Cors 
app.use(cors());
// For connecting Database 
connectdb(DATABASE_URL);
// Basic route 
app.get('/ping',(req,res)=>{
    console.log("heelo");
    res.status(200).send("Hellow there");

})

app.listen(port,()=>{
    console.log(`Server is Listening on Port ${port}`)
})
