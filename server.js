import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    const ai = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Kamu adalah Fahri AI yang ramah dan membantu." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await ai.json();

    res.json({
        reply: data.choices[0].message.content
    });
});

app.listen(3000, () => {
    console.log("Fahri AI jalan di http://localhost:3000");
});