const express = require('express')
const { Hebrew } = require('hebrew-js')
const cors  = require('cors')
const { json } = require('express')
const app = express()
const path = require("path");

app.use(cors())
app.use(json())

let answers = new Hebrew()

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname,'/client/build/index.html'));
  });
  
app.post('/translate', async (req,res) => {
  try {
    let {word} = req.body
    let answer = await answers.translate(word)
    res.status(200).send({answer}).end()
  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.PORT || 5000,() => console.log(`server run at http://localhost:5000`))


// direction('תל אביב','ירושלים')
// news('קורונה')
// translate('תרגם לאנגלית אפליקציה בעברית')
// weather('פתח תקווה')
// meaning('פילוסופיה')