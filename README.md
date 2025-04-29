# Real Gains Fitness POC

A proof of concept for the Real Gains Fitness application that demonstrates the integration of natural language processing for food tracking with nutrition data retrieval.

## Overview

This proof of concept demonstrates:

1. Processing natural language food descriptions (e.g., "I had chicken and rice") using a mock OpenAI service
2. Retrieving nutrition information for the parsed food items using a mock Nutritionix service
3. Returning combined results through a simple API

## Tech Stack

- **Backend**: Node.js with Express.js
- **Language**: TypeScript
- **APIs** (mocked for POC):
  - OpenAI API for natural language processing
  - Nutritionix API for nutrition data

## Project Structure

```
RGFitnessPOC/
├── src/
│   ├── index.ts                # Entry point with Express server
│   ├── services/
│   │   ├── openaiService.ts    # Mock OpenAI service
│   │   └── nutritionixService.ts # Mock Nutritionix service
│   ├── routes/
│   │   └── api.ts              # API routes
│   └── middleware/
│       └── errorHandler.ts     # Error handling middleware
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RGFitnessPOC.git
   cd RGFitnessPOC
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   For a real implementation, you would add your API keys to this file:
   ```
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   NUTRITIONIX_APP_ID=your_nutritionix_app_id_here
   NUTRITIONIX_APP_KEY=your_nutritionix_app_key_here
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the API at `http://localhost:3000`

## API Usage

### 1. Health Check

Verify the API is running properly.

**Endpoint**: `GET /api/health`

**Example Request**:
```bash
curl http://localhost:3000/api/health
```

**Example Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-04-29T18:30:00.000Z",
  "message": "Real Gains Fitness API is running"
}
```

### 2. Analyze Food

Process a natural language food description and get nutrition information.

**Endpoint**: `POST /api/analyze`

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"description": "I had 2 eggs, toast, and coffee for breakfast"}'
```

**Example Response**:
```json
{
  "parsed": [
    {
      "name": "eggs",
      "quantity": 2
    },
    {
      "name": "toast"
    },
    {
      "name": "coffee"
    }
  ],
  "nutrition": {
    "items": [
      {
        "food": "egg",
        "nutrition": {
          "calories": 155,
          "protein": 13,
          "carbs": 1.1,
          "fat": 11
        },
        "quantity": 2,
        "unit": "g"
      },
      {
        "food": "bread",
        "nutrition": {
          "calories": 80,
          "protein": 2.8,
          "carbs": 14.7,
          "fat": 1,
          "fiber": 0.8
        },
        "quantity": 1,
        "unit": "g"
      },
      {
        "food": "coffee",
        "nutrition": {
          "calories": 2,
          "protein": 0.1,
          "carbs": 0,
          "fat": 0
        },
        "quantity": 1,
        "unit": "ml"
      }
    ],
    "totals": {
      "calories": 237,
      "protein": 15.9,
      "carbs": 15.8,
      "fat": 12,
      "fiber": 0.8
    }
  }
}
```

## Testing with Different Food Descriptions

Try these examples to test the API:

1. Simple meal: `"I had chicken and rice"`
2. Breakfast: `"I had 2 eggs, toast, and coffee for breakfast"`
3. Complex meal: `"For dinner I ate grilled salmon with broccoli and a side of rice"`
4. Snack: `"I snacked on an apple and some cheese"`
5. Dessert: `"I had chocolate cake for dessert"`

## Implementation Notes

This POC uses mock implementations of the OpenAI and Nutritionix services:

- **Mock OpenAI Service**: Simulates natural language processing by parsing food descriptions using simple string manipulation
- **Mock Nutritionix Service**: Contains a hardcoded database of nutrition information for common foods

In a production implementation, these would be replaced with actual API calls.

## Future Development

This POC demonstrates the core concept and tech stack. In a full implementation:

1. **Real API Integrations**:
   - Replace mock OpenAI service with actual API calls
   - Replace mock Nutritionix service with actual API calls

2. **Enhanced Features**:
   - User authentication and profiles
   - Meal history and tracking
   - Customizable nutrition goals
   - Food recommendations

3. **Mobile Frontend**:
   - Develop a React Native or Progressive Web App frontend
   - Implement responsive UI for various device sizes
   - Add offline capabilities

4. **Data Persistence**:
   - Implement MongoDB or another database for storing user data
   - Add caching layer for frequently accessed nutrition data

5. **Advanced Analytics**:
   - Trend analysis of nutritional intake
   - Goal progress visualization
   - Personalized recommendations

## License

ISC
