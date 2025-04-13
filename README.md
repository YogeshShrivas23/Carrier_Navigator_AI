# Career Navigator AI

An AI-powered platform that helps students and freshers identify optimal career paths based on their resume, interests, and current job market trends.

## Features

- Resume parsing and analysis
- Career path recommendations
- Skill gap analysis
- Learning resource suggestions
- Job market insights

## Tech Stack

- **Frontend**: React.js + Tailwind CSS + React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **AI**: OpenAI GPT API
- **Resume Parser**: Python microservice

## Project Structure

```
career-navigator-ai/
├── client/           # React frontend
├── server/           # Express backend
├── python-parser/    # Python resume parsing service
└── .env              # Environment variables
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install

   # Python Parser
   cd ../python-parser
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the root directory with:
   ```
   OPENAI_API_KEY=your_api_key
   MONGODB_URI=your_mongodb_uri
   ```

4. Start the services:
   ```bash
   # Start Python parser
   cd python-parser
   python app.py

   # Start backend
   cd ../server
   npm start

   # Start frontend
   cd ../client
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 