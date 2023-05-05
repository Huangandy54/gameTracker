import dotenv from 'dotenv'
dotenv.config();
import express, { application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import gameRouters from './routes/index.js'

const app= express();
app.use(cors());

app.use('/', gameRouters);

const PORT= process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`)))
    .catch((error)=> console.log(error.message));

export default app;