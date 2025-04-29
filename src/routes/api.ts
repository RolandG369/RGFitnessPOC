/**
 * API Routes
 * 
 * This file defines the API routes for the Real Gains Fitness POC.
 */

import express from 'express';
import { parseFood } from '../services/openaiService';
import { getNutrition } from '../services/nutritionixService';

const router = express.Router();

/**
 * Food Analysis Endpoint
 * 
 * Analyzes a natural language food description and returns structured nutrition data.
 * 
 * Request:
 * {
 *   "description": "I had chicken and rice"
 * }
 * 
 * Response:
 * {
 *   "parsed": [
 *     { "name": "chicken", "quantity": 1 },
 *     { "name": "rice", "quantity": 1 }
 *   ],
 *   "nutrition": {
 *     "items": [
 *       {
 *         "food": "chicken",
 *         "nutrition": { "calories": 140, "protein": 26, ... },
 *         "quantity": 1,
 *         "unit": "g"
 *       },
 *       ...
 *     ],
 *     "totals": { "calories": 350, "protein": 25, ... }
 *   }
 * }
 */
router.post('/analyze', async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!description || typeof description !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Please provide a food description as a string'
      });
    }
    
    // Step 1: Parse the food description using OpenAI (mock)
    const parsedResult = await parseFood(description);
    
    // Step 2: Get nutrition information using Nutritionix (mock)
    const nutritionResult = await getNutrition(parsedResult.items);
    
    // Step 3: Return combined results
    res.json({
      parsed: parsedResult.items,
      nutrition: nutritionResult
    });
  } catch (error) {
    console.error('Error processing food analysis:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred while processing your request'
    });
  }
});

/**
 * Health Check Endpoint
 * 
 * Returns the status of the API.
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Real Gains Fitness API is running'
  });
});

export default router;
