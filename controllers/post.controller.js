import PostService from '../server/post.service.js'

const postService = new PostService()

class PostController {
	async getAll(req, res) {
		try {
			const allPosts = await postService.getAll()
			res.status(200).json(allPosts)
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async create(req, res) {
		try {
			const post = await postService.create(req.body)
			res.status(201).json(post)	
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async delete(req, res) {
		try {
			const deletedPost = await postService.delete(req.params.id)
			res.status(200).json(deletedPost)
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async edit(req, res) {
		try {
			const {body, params} = req
			const editedPost = await postService.edit(params.id, body)
			res.status(200).json(editedPost) 
		}	 catch (error) {	
			res.status(400).json(error)
		}
	}
	
	async getOne(req,res) {
		try {
			const post = await postService.getOne(req.params.id)
			res.status(200).json(post)
		} catch (error) {
			res.status(400).json(error)
		}
	}
}

export default PostController