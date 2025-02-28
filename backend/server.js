require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`${AIzaSyBOqHSdcywBamyu52PTrugOVPNCm7MBQEk}?key=${process.env.AIzaSyBOqHSdcywBamyu52PTrugOVPNCm7MBQEk}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      res.json({ reply: data });
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
