import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
require('dotenv').config();

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.use('/posts', postRoutes)




const CONNECTION_URL = 'mongodb+srv://manipalRentals:mkQmu6yBScBqDOFa@cluster0.gz5zj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.port || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)}))
    .catch((error) => console.log(error.message)) 

mongoose.set('useFindAndModify', false);