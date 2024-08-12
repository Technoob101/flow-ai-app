const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const puppeteer = require('puppeteer');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a web summarize AI that use screen shot of the webpage to summarize the following web page. Focus on the main points, important details, and any specific sections mentioned. The summary should be concise and easy to understand."
});

async function generateSummary() {
    const URL = "https://serpapi.com/";
    
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

    const prompt = "what is this website content";
    const image = {
        inlineData: {
            data: Buffer.from(fs.readFileSync("screenshot.jpg")).toString("base64"),
            mimeType: "image/png",
        },
    };

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "what is this website" }],
                },
                {
                    role: "model",
                    parts: [{ text: "this is google design system website" }],
                },
            ]
        });

        const result = await chat.sendMessage([prompt, image]);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch (error) {
        console.error("Error generating summary :", error); 
    }
}

generateSummary();
