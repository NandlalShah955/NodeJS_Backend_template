import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); //Note You will not be needed Dotenv package if you are using latest 20 version of Nodejs;
const app = express();
const port=process.env.port;
app.use(cors());

app.get('/',(req,res)=>{
    console.log("heelo");
})

app.listen(port,()=>{
    console.log(`Server is Listening on Port ${port}`)
})
