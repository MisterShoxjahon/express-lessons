import { v4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class FileService {

	static async save(file) {
		try {
			const fileExt = file.name.split('.').pop() // we are getting file extension
			const fileName = v4() + '.' + fileExt // we are creating unique file name with extension
			const staticDir = path.join(__dirname, '..', 'static') // we are quiting from server folder and create static folder in root directory 
			const filePath = path.join(staticDir, fileName) // we are creating path to file in static folder

			if (!fs.existsSync(staticDir)) {
				fs.mkdirSync(staticDir, { recursive: true }) // if static folder doesn't exist we are creating it, recursive: true - if there are some folders in path that doesn't exist they will be created too
			}

			await file.mv(filePath)

			return fileName
		} catch (error) {
			throw new Error(`Error saving file: ${error}`)
		}
	}

	delete() {}
}

export default FileService