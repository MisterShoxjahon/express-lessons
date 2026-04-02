import 'dotenv/config'
import express from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import router from './routes/post.route.js'
import cookieParser from 'cookie-parser'
import { ErrorMiddleWare } from './middlewares/error.middleware.js'
import cors from 'cors'
	
const app = express()

app.use(cors())
app.use(cookieParser({}))
app.use(express.json())
app.use('/static', express.static('static'))
app.use(fileUpload({}))

// Routes
app.use('/api/posts', router)
app.use('/api/auth', authRouter)

// Middlewares
app.use(ErrorMiddleWare)

const PORT = process.env.PORT || 8080

const bootstrap = async () => {
	try{
		await mongoose.connect(process.env.DB_URL).then(() => console.log('DB connected successfully'))
		app.listen(PORT, () => {console.log(`Server is running on - http://localhost:${PORT}`);})
	}catch (error){
		console.log(`Error connecting with DB: ${error}`)
	}
}	

bootstrap()