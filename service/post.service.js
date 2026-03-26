import { Post } from '../models/post.model.js'
import FileService from './file.service.js'

class PostService {
	async create(post, picture) {
	let fileName = null
	if(picture) {
		fileName = await FileService.save(picture)
	}
	const newPost = await Post.create({...post, picture: fileName})
	return newPost
}

	async getAll() {
		const allPosts = await Post.find()
		return allPosts
	}

	async delete(id) {
		const deletedPost = await Post.findByIdAndDelete(id)
		return deletedPost
	}
	
	async edit(id, post) {
		if(!id) {
			throw new Error('Id is required')
		}
		const isPost = await this.getOne(id)
		
		const editedPost = await Post.findByIdAndUpdate(id, post, {new: true})
		return editedPost
	}

	async getOne(id) {
		const post = await Post.findById(id)
		return post 
	}
} 

export default new PostService()