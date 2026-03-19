import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import requestTime from './middlewares/request.time.js'
import authRouter from './routes/auth.route.js'
import router from './routes/post.route.js'
import cookieParser from 'cookie-parser'
	
dotenv.config()

const app = express()

app.use(requestTime)
app.use(cookieParser({}))
app.use(express.json())
app.use('/static', express.static('static'))
app.use(fileUpload({}))

// Routes
app.use('/api/posts', router)
app.use('/api/auth', authRouter)

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