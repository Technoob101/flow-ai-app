const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const puppeteer = require('puppeteer');
require('dotenv').config();
const { getJson } = require("serpapi");

const SERP_API_KEY = process.env.SERP_API_KEY;

getJson({
    engine: "google",
    api_key: SERP_API_KEY, 
    q: "Cake ingredient",
    location: "Austin, Texas",
}, async (json) => {
    const results = json["organic_results"].slice(0, 4); 
    
    const titles = results.map(item => item.title);
    const links = results.map(item => item.link);
    
    console.log(titles);
    console.log(links);
    
    // Pass the links to generateSummary
    await generateSummary(links);
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
}



async function generateSummary(links) { // Accept links as a parameter
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    
    // Open a new page
    const page = await browser.newPage();

    for (var i = 0; i < links.length; i++) {
        const website_url = links[i];

        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' });

        // Capture screenshot
        await page.screenshot({
            path: `images/screenshot_full_${i + 1}.jpg`,
            fullPage: true
        });
    }

    // Close the browser
    await browser.close();
      
    // Turn images to Part objects
    const filePart1 = fileToGenerativePart("images/screenshot_full_1.jpg", "image/jpeg")
    const filePart2 = fileToGenerativePart("images/screenshot_full_2.jpg", "image/jpeg")
    const filePart3 = fileToGenerativePart("images/screenshot_full_3.jpg", "image/jpeg")
    const filePart4 = fileToGenerativePart("images/screenshot_full_4.jpg", "image/jpeg")


    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are a multiple web search summarize AI that use screen shots of the webpages to explain shortly to get what website content about each website"
    });

    const prompt = "Tell me each page website what is it about shortly";

    const imageParts = [
        filePart1,
        filePart2,
        filePart3,
        filePart4
    ]
    const generatedContent = await model.generateContent([prompt, ...imageParts]);
  
    console.log(generatedContent.response.text());
}