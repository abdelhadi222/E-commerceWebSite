import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./Router/Router.js";
import cors from "cors"



const PORT = 5600


const app = express()

app.use(bodyParser.json())
http.createServer(app)
app.use(cors({origin: "*",credentials:true}));
app.use(express.static('images'))
app.use(bodyParser.json({ limit: "50mb" }));






 

app.use('/api/',UserRouter)






mongoose.connect("mongodb://127.0.0.1:27017/Shop")
.then(()=>{
    console.log('Data base Done!');
}).catch((er)=>{
    console.log("validation err is ",er);
})
app.listen(PORT,()=>{
   console.log(`PORT IS ${PORT}`)
})