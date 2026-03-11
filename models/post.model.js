import { Schema, model } from 'mongoose';


const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
});

export const Post = model('Post', postSchema)