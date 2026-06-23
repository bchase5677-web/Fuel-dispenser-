import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Assistant endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are the AI Customer Assistant for Matic FUELTEC Ltd, a luxury engineering corporate eCommerce company specializing in premium fuel dispensers, fuel station equipment, and genuine spare parts. 
      You are highly knowledgeable about products, repairs, maintenance, and ordering. 
      The website uses a black, gold, and charcoal luxury theme.
      Be polite, helpful, and speak naturally.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
