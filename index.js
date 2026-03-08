import express from 'express'
import mongoose from 'mongoose'
import { Post } from './models/post.model.js'
import dotenv from 'dotenv'

dotenv.config() // configuration

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
	try {
		const AllPosts = await Post.find()
		res.status(200).json(AllPosts)
	} catch (error) {
		res.status(400).json(error)
	}
})

app.post('/', async (req, res) => { 
	try {
		const {title, body} = req.body
		const newPost = new Post({title, body})	
		await newPost.save()
		res.status(201).json(newPost)
	} catch (error) {
		res.status(400).json(error)
	}
})


app.delete('/:id', (req, res) => {
	const {id} = req.params
	res.send(id)
}) 

app.put('/:id', (req, res) => {
	const {id} = req.params
	const body = req.body
	
	res.json({id, body})
})

const PORT = process.env.PORT || 5173

const bootstrap = async () => {
	try{
		await mongoose.connect(process.env.DB_URL).then(() => console.log('DB connected successfully'))
		app.listen(PORT, () => {console.log(`Server is running on - http://localhost:${PORT}`);})
	}catch (error){
		console.log(`Error connecting with DB: ${error}`)
	}
}

bootstrap()