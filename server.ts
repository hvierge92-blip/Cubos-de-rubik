import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // Logger middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // API endpoints FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!ai) {
        return res.json({
          text: "¡Hola! Soy CRUBIK AI GUIDE. Actualmente estoy operando en modo simulación de alta velocidad porque la clave de API (GEMINI_API_KEY) no está configurada en los secretos de la aplicación. Para desbloquear mi red de redes neuronales y recibir asistencia en tiempo real, añade la clave de API en Settings > Secrets en la interfaz de AI Studio.\n\nMientras tanto, puedo contarte que nuestros modelos premium como el Neon 3x3 están optimizados para giros MagLev extremos de tolerancia ultra-baja y el Cyber-Dog es un puzzle táctil de vanguardia.",
        });
      }

      // Format history properly according to @google/genai
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "Eres el 'CRUBIK AI GUIDE', una inteligencia artificial avanzada diseñada por Crubik para entrenar, guiar e instruir a cubers de élite y entusiastas de los speed-cubes de alta gama. Tus respuestas deben ser técnicas, inspiradoras, de estética cyber-futurista, breves y sumamente útiles. Habla siempre en español con entusiasmo sobre el arte de la resolución mecánica, algoritmos CFOP (Cross, F2L, OLL, PLL), y la tecnología disruptiva de los productos de Crubik (como el 'The Cyber-Dog', el 'Neon 3x3' y el 'Void 4x4'). Responde de manera profesional y clara, y usa emojis de estilo técnico (como ⚙️, ⚡, 🟩, 🚀) si aportan valor, pero mantén un tono de ingeniería de precisión.",
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message: message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Ocurrió un error al procesar tu solicitud con la IA.", details: error.message });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
