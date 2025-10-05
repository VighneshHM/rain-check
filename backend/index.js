require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/weather', async (req, res) => {
  const { city, country, date } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const location = city && country ? `${city}, ${country}` : city || country || 'your location';
  const prompt = `What is the weather forecast for ${location} on ${date}? Provide details about temperature, precipitation, and general conditions. also recommend activities whcih can be done there. Give response in concise manner.`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      }
    );
    // Return full Gemini response content object, not just string
    const result = response.data?.candidates?.[0]?.content ?? {};
    res.json({ text: result });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch weather from Gemini API' });
  }
});

app.listen(PORT, () => console.log(`Backend server listening on port ${PORT}`));
