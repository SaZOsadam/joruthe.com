require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const NodeCache = require('node-cache');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Create a new cache with a TTL of 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
});

// Routes
app.get('/', (req, res) => {
  res.send('Joruthe LLC Chatbot API');
});

app.post('/api/chatbot', [
  body('message').isString().trim().notEmpty(),
  body('messages').isArray(),
  body('messages.*.text').isString().trim().notEmpty(),
  body('messages.*.isBot').isBoolean()
], async (req, res) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { message, messages } = req.body;

    // Generate a cache key based on the input
    const cacheKey = JSON.stringify(messages) + message;
    
    // Check if we have a cached response
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return res.json({ botResponse: cachedResponse });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Ruthie, a helpful assistant for Joruthe LLC, a home repair and renovation company. Provide friendly and informative responses about their services including plumbing, electrical work, carpentry, renovation, lawn care, landscaping, and fencing."
        },
        ...messages.map(msg => ({
          role: msg.isBot ? "assistant" : "user",
          content: msg.text
        })),
        { role: "user", content: message }
      ],
    });

    const botResponse = response.choices[0].message.content.trim();
    
    // Cache the response
    cache.set(cacheKey, botResponse);

    res.json({ botResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json({ error: error.response.data.error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred', message: error.message });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));