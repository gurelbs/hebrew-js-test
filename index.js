const express = require('express')
const Hebrew  = require('hebrew-js')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 5000
const answers = new Hebrew()

express()
	.use(cors())
	.use(express.json())
	.use(express.static(path.join('/client/build/index.html')))
	// .get('*', (req, res) => res.sendFile(path.join('/build/index.html')))
	.post('/translate', async (req, res) => {
		try {
			let answer = await answers.news('קורונה')
			res.status(200).send({ answer }).end()
		} catch (error) {
			console.log(error)
		}
	})
	.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))