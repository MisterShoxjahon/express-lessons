import express from 'express';
import PostController from '../controllers/post.controller.js';
import logger from '../middlewares/logger.js'

const router = express.Router();
const postController = new PostController();

router.get('/get', postController.getAll.bind(postController));
router.post('/create', logger, postController.create.bind(postController));
router.delete('/delete/:id', postController.delete.bind(postController));
router.put('/edit/:id', postController.edit.bind(postController));
router.get('/get-one/:id', postController.getOne.bind(postController));

export default router;