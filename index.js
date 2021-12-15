//import express from 'express'
const express = require('express')
//import mongoose from 'mongoose'
const mongoose = require('mongoose'); 
//import cors from 'cors'
const cors = require('cors')
//import postRoutes from './routes/posts.js'
const postRoutes = require('./routes/posts.js')
//import leadRoutes from './routes/leads.js'
const leadRoutes = require('./routes/leads.js')
const uploadRoutes = require('./routes/uploads.js')
const qrCodeRoutes = require('./routes/qrCodeEntry.js')
//import dotenv from "dotenv";
const dotenv = require('dotenv'); 
const compression = require('compression')


dotenv.config();

const app = express()

app.use(compression())

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.use('/posts', postRoutes)
app.use('/leads', leadRoutes)
app.use('/uploads', uploadRoutes)
app.use('/qrCodeInfo', qrCodeRoutes)



const CONNECTION_URL = 'mongodb+srv://manipalRentals:mkQmu6yBScBqDOFa@cluster0.gz5zj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)}))
    .catch((error) => console.log(error.message)) 

mongoose.set('useFindAndModify', false);