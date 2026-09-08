require('dotenv').config();

const path = require('path');
const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  const question = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!question) {
    return res.status(400).json({ error: 'Please enter a question.' });
  }

  if (!ai) {
    return res.status(503).json({ error: 'Gemini API is not configured.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `You are Bappa Seva, a warm and helpful assistant for a Ganpati Festival website in Ahilyanagar, Maharashtra. Answer in the same language as the user, especially Marathi or Marathi-English mix. Keep answers concise, friendly, and practical. Use these known details when relevant: the celebration includes Sthapana, morning and evening Aarti, Bhajan Sandhya, Cultural Programs, and Visarjan; general celebration timing is 6:00 AM to 10:00 PM; location is Old Maliwada Road, behind Old Bus Stand, Maliwada, Ahilyanagar, Maharashtra 414001. Do not invent exact event timings, contact details, medical/legal advice, or private information. For unrelated questions, answer helpfully but briefly and say when you are unsure. User question: ${question}`
          }]
        }
      ]
    });

    const answer = response.text?.trim();
    if (!answer) {
      return res.status(502).json({ error: 'Gemini returned an empty response.' });
    }

    return res.json({ answer });
  } catch (error) {
    console.error('Gemini request failed:', error.message);
    return res.status(502).json({ error: 'Gemini could not answer right now.' });
  }
});

app.listen(port, () => {
  console.log(`Ganpati Festival running at http://localhost:${port}`);
});
