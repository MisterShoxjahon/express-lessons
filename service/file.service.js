import { v4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class FileService {

	static async save(file) {
		try {
			const fileExt = file.name.split('.').pop()
			const fileName = v4() + '.' + fileExt
			const staticDir = path.join(__dirname, '..', 'static')
			const filePath = path.join(staticDir, fileName)

			if (!fs.existsSync(staticDir)) {
				fs.mkdirSync(staticDir, { recursive: true })
			}

			await file.mv(filePath)

			return fileName
		} catch (error) {
			throw new Error(`Error saving file: ${error}`)
		}
	}

	delete() {}
}

export default new FileService()