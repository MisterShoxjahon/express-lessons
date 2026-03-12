import { Schema, model } from 'mongoose';


const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: false
	}
});

export const Post = model('Post', postSchema)