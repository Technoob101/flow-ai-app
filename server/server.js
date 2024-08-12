const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
const fs = require("fs");
const puppeteer = require('puppeteer');
const { getJson } = require("serpapi");

const { GoogleGenerativeAI } = require('@google/generative-ai')
const SERP_API_KEY = process.env.SERP_API_KEY;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)
const PORT = 3000;

//normal chat history
app.post('/gemini', async (req, res) => {
    try {
      console.log('gemini')
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
      res.send(text)
      
    } catch (error) {
        console.error('Server error:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/websum', async (req, res) => {
  try {
    console.log('websum');
    console.log(req.body.history);
    console.log(req.body.message);
    const history = req.body.history;
    
    if (Array.isArray(history) && history.length === 0) {
      const URL = req.body.message;
      
      // Create a browser instance
      const browser = await puppeteer.launch();

      // Create a new page
      const page = await browser.newPage();

      // Set viewport width and height
      await page.setViewport({ width: 1280, height: 720 });

      // Open URL in current page
      await page.goto(URL, { waitUntil: 'networkidle0' });

      // Capture screenshot
      await page.screenshot({
          path: 'screenshot.jpg',
          fullPage: true 
      });

      // Close the browser instance
      await browser.close();
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a web summarize AI that get url and the function inside will take url to do screenshot then you generate text use screen shot of the webpage to summarize the following web page. Focus on the main points, important details, and any specific sections mentioned. The summary should be concise and easy to understand, but when you finish the web summarize you are answering user question about a website."
    });

    const prompt = req.body.message;
    const image = {
        inlineData: {
            data: Buffer.from(fs.readFileSync("screenshot.jpg")).toString("base64"),
            mimeType: "image/png",
        },
    };

    const chat = model.startChat({ 
      history: req.body.history
    })

    const result = await chat.sendMessage([prompt, image]);
      const response = await result.response;
      const text = response.text();
      res.send(text);

  } catch (error) {
      console.error('Server error:', error)
      res.status(500).send('Internal Server Error')
  }
});


app.post('/internet', async (req, res) => {
  try {
    const userInput = req.body.message;
    console.log(userInput);

    const json = await getJson({
      engine: "google",
      api_key: SERP_API_KEY, 
      q: userInput,
      location: "Austin, Texas",
    });

    const results = json["organic_results"].slice(0, 4); 
    
    const titles = results.map(item => item.title);
    const links = results.map(item => item.link);
    
    console.log(titles);
    console.log(links);

    const summary = await generateSummary(links);

    res.send({
      titles: titles,
      links: links,
      summary: summary,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

async function generateSummary(links) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    for (let i = 0; i < links.length; i++) {
      const website_url = links[i];
      try {
        await page.goto(website_url, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.screenshot({
          path: `images/screenshot_full_${i + 1}.jpg`,
          fullPage: true,
        });
      } catch (error) {
        console.error(`Failed to load ${website_url}:`, error);
        continue; // Skip to the next link
      }
    }

    await browser.close();

    const imageParts = links.map((_, i) => 
      fileToGenerativePart(`images/screenshot_full_${i + 1}.jpg`, "image/jpeg")
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a multiple web search summarization AI that uses screenshots of the webpages to explain briefly what each website's content is about."
    });

    const prompt = "Tell me what each page's website is about, briefly make it own subject for each one.";
    const generatedContent = await model.generateContent([prompt, ...imageParts]);
    
    return generatedContent.response.text(); // Ensure this returns a promise
  } catch (error) {
    console.error('Error in generateSummary:', error);
    throw error;
  }
}

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}



app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});