import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/post.route.js'
	
dotenv.config()

const app = express()
app.use(express.json())

// Routes
app.use('/api/posts', router) // it means it works when endpoint is http://localhost:5173/api/posts

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