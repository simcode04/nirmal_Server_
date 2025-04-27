const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = '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';

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant inside Nirmal Simhadri's portfolio." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content.trim() });
    } else {
      console.error("OpenAI API Error:", data);
      res.status(500).json({ reply: "Sorry, I couldn't get a reply right now." });
    }

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ reply: "Oops! Server error." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
