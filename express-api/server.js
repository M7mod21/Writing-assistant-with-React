import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

// تهيئة متغيرات البيئة أولًا
dotenv.config();

// إنشاء تطبيق Express
const app = express();
const PORT = process.env.PORT || 5000;

// تفعيل CORS و JSON parsing
app.use(cors({
  origin: "https://writing-assistant-with-react.vercel.app", // لاحظ إزالة / في النهاية
}));
app.use(express.json());

// Routes
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.VITE_GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
