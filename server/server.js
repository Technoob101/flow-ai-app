const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)
const PORT = 3000;

app.post('/gemini', async (req, res) => {
    try {
      console.log(req.body.history)
      console.log(req.body.message)
      
      //get gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
      
      const chat = model.startChat({ 
        history: req.body.history
      })
      
      const msg = req.body.message
      const result = await chat.sendMessage(msg)
      const response = result.response
      const text = response.text()
      
      //send response back to request
      /* res.send(text) */
      
    } catch (error) {
        console.error('Server error:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});