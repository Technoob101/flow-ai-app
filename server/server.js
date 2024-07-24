const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateSummary() {
    const prompt = "Please summarize the content of this page extension terminology short and easy for me to understand each concept";
    const image = {
        inlineData: {
            data: Buffer.from(fs.readFileSync("screenshot.jpg")).toString("base64"),
            mimeType: "image/png",
        },
    };

    try {
        const result = await model.generateContent([prompt, image]);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating summary:", error); 
    }
}

generateSummary();