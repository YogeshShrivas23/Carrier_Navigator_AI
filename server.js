require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const OpenAI = require('openai');
const { connect, close } = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working fine!' });
});

// Initialize server
async function initializeServer() {
  try {
    // Connect to MongoDB
    await connect();
    
    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await close();
        console.log('✅ Server shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("❌ Server initialization error:", error);
    process.exit(1);
  }
}

// Initialize the server
initializeServer();

// Routes
app.use('/api', userRoutes); // User routes

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    // Send file to Python parser
    const response = await axios.post('http://localhost:5001/parse-resume', {
      file: req.file.buffer.toString('base64'),
      filename: req.file.originalname
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: 'Error processing resume' });
  }
});

app.post('/submit-quiz', async (req, res) => {
  try {
    const { resumeContent, quizAnswers } = req.body;
    
    const prompt = `Based on this resume content and user interests, suggest 1-2 ideal career paths, missing skills, learning platforms, and job market relevance.
    Resume: ${resumeContent}
    Interests: ${JSON.stringify(quizAnswers)}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    res.json({ recommendations: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Error generating recommendations' });
  }
}); 