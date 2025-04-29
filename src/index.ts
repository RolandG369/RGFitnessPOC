import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { errorHandler, notFoundHandler, requestLogger } from './middleware/errorHandler';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(requestLogger);
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Real Gains Fitness API',
    description: 'A proof of concept for the Real Gains Fitness application',
    endpoints: {
      analyze: 'POST /api/analyze - Analyze food descriptions',
      health: 'GET /api/health - Check API status'
    }
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API documentation available at: http://localhost:${port}`);
  console.log(`Health check available at: http://localhost:${port}/api/health`);
});
