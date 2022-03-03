const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3145

app.use(bodyParser.json())

app.listen(port, () => console.log("Listening at " + port))

app.use(express.static('public'))

let bingoString = ""

app.post('/bingoPOST', (req, res) => {
    bingoString = req.body.bingoStr
    res.send()
})

app.get('/bingoGET', (req, res) => {
    res.send(JSON.stringify(bingoString))
})

app.get('/bingoCLEAR', (req, res) => {
    bingoString = ""
    res.send()
})

