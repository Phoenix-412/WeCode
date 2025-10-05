const express= require('express')
const cors= require('cors')
const cookieParser= require('cookie-parser')

const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(cookieParser())

//routes import
const userRouter= require('./routes/user.routes')
const problemRouter= require('./routes/problem.routes')
const submissionRouter= require('./routes/submission.routes')

//routes declaration
app.use('/api/v1/user', userRouter)
app.use('/api/v1/problem', problemRouter)
app.use('/api/v1/submission', submissionRouter)

module.exports= app