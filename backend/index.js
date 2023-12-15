import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Router from './routes/route.js'
import Connect from './database/db.js'
import morgan from 'morgan'
import createHttpError from 'http-errors'

const app = express();
app.use(morgan('dev'))
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v2', Router);


// Error handling middleware
app.use(async (req, res, next) => {
    next(createHttpError.NotFound())
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})


const PORT = process.env.PORT || 8000

Connect(process.env.MONGODB_URL)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
