import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Generation Proxy Route
  app.post("/api/generate", async (req, res) => {
    const { prompt, template } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      // Mock response for demo if key is missing
      return res.json({
        content: `<!DOCTYPE html><html><body><h1>Demo: ${template}</h1><p>Prompt: ${prompt}</p><p style="color:red">Note: GROQ_API_KEY is missing in server environment.</p></body></html>`
      });
    }

    try {
      const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Nazcom Engine by Nazcorp. You are a master web developer. 
            Generate a complete, single-file HTML website with embedded CSS and modern JavaScript. 
            The style should be ${template}. 
            Return ONLY the raw HTML code, no markdown markers, no preamble.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: false
      }, {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      res.json({ content: response.data.choices[0].message.content });
    } catch (error) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ error: "Failed to generate website" });
    }
  });

  // Admin API (Simplified for Demo)
  app.get("/api/admin/users", (req, res) => {
    // In a real app, verify admin session first
    res.json([
      { id: '1', name: 'John Doe', email: 'john@nazcom.com', verified: true },
      { id: '2', name: 'Jane Smith', email: 'jane@nazcom.com', verified: false },
    ]);
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nazcom Server running on http://localhost:${PORT}`);
  });
}

startServer();
