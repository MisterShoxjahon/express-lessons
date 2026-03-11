import { Post } from '../models/post.model.js'

class PostService {
	async create(post) {
			const newPost = await Post.create(post)
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
		
		const editedPost = await Post.findByIdAndUpdate(id, post, {new: true}) // id - что редактируем, post - на что редактируем, {new: true} - возвращает обновленный пост
		return editedPost
	}

	async getOne(id) {
		const post = await Post.findById(id)
		return post 
	}
} 

export default PostService