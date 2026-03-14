import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/post.route.js'
import fileUpload from 'express-fileupload'
import requestTime from './middlewares/request.time.js'
	
dotenv.config()

const app = express()

app.use(requestTime) // middleware function that will be executed for every incoming request to the server. It adds a property requestTime to the req object, which contains the timestamp of when the request was received. After adding this property, it calls next() to pass control to the next middleware function in the stack. it should be placed before the routes that need to access the requestTime property, so that it is available when those routes are executed.
app.use(express.json())
app.use('/static', express.static('static'))
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