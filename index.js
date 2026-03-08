/// GET, POST, DELETE, PUT

import express from 'express'

const app = express()
const PORT = 5173 // port

app.use(express.json()) // it tells for our express project we are using json

app.get('/', (req, res) => {
	res.status(200).json({message: 'Hello Shox!'})
})

// post - GET, POST, DELETE, PUT
app.post('/', (req, res) => {
	const {firstName, lastName} = req.body
	const message = `His full name : ${firstName} ${lastName}`
	res.send(message)
})


	// : “Accept any value here and call it id.”
app.delete('/:id', (req, res) => { // Think of : as “this part will be filled later”.
	const {id} = req.params
	res.send(id)
}) 

app.put('/:id', (req, res) => {
	const {id} = req.params
	const body = req.body
	
	res.json({id, body})
})

app.listen(PORT, () => {
	console.log(`Server is running on - http://localhost:${PORT}`);
})

// domain - port - endpoint
// http://localhost:8080/api/v1/users
