import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { morganMiddleware } from './middlewares/morgan.middlewares.js'
import { errorMiddleware } from './middlewares/error.middlewares.js'
import { ApiResponse } from './utils/api-response.utils.js'
import { generalRateLimiter } from './middlewares/rateLimiter.middlewares.js'

const app = express()

app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use(generalRateLimiter)
app.use(morganMiddleware)
app.get("/health", (req, res) => {
    res.status(200).status(new ApiResponse(200, "BookBazaar API is healthy."))
})
app.use((req, res, next) => {
    res.status(404).status(new ApiResponse(404, `Route ${req.method} ${req.originalUrl} not found.`))
})
app.use(errorMiddleware)

export default app;