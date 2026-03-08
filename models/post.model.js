import { Schema, model } from 'mongoose';

// Schema - структура данных, которая описывает, как будет выглядеть документ в коллекции MongoDB
// Model - объект, который содержит методы для работы с базой данных, например, для создания, чтения, обновления и удаления документов.
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