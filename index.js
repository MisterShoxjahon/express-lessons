import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/post.route.js'
import fileUpload from 'express-fileupload'
	
dotenv.config()

const app = express()

app.use(express.json())
app.use('/static' ,express.static('static'))
app.use(fileUpload({}))

// Routes
app.use('/api/posts', router)

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