/**
 * Mock Nutritionix Service
 * 
 * This service simulates the functionality of using Nutritionix API to retrieve
 * nutrition information for food items.
 * 
 * In a real implementation, this would make API calls to Nutritionix.
 */

import { ParsedFood } from './openaiService';

// Type definitions
export interface NutritionInfo {
  calories: number;
  protein: number;  // in grams
  carbs: number;    // in grams
  fat: number;      // in grams
  fiber?: number;   // in grams
  sugar?: number;   // in grams
  sodium?: number;  // in mg
}

export interface FoodNutrition {
  food: string;
  nutrition: NutritionInfo;
  quantity: number;
  unit: string;
}

export interface NutritionResult {
  items: FoodNutrition[];
  totals: NutritionInfo;
}

// Mock database of nutrition information for common foods (per 100g unless specified)
const mockNutritionDatabase: Record<string, NutritionInfo> = {
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.3 },
  'banana': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2 },
  'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'bread': { calories: 265, protein: 9.4, carbs: 49, fat: 3.2, fiber: 2.7 },
  'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 17 },
  'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13 },
  'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  'yogurt': { calories: 59, protein: 3.5, carbs: 5, fat: 3.3 },
  'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33 },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8 },
  'coffee': { calories: 2, protein: 0.1, carbs: 0, fat: 0 },
  'tea': { calories: 1, protein: 0, carbs: 0.3, fat: 0 },
  'water': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'chocolate': { calories: 546, protein: 4.9, carbs: 60, fat: 31, sugar: 52 },
  'pizza': { calories: 266, protein: 11, carbs: 33, fat: 10 },
  'burger': { calories: 295, protein: 17, carbs: 30, fat: 14 },
  'fries': { calories: 312, protein: 3.4, carbs: 41, fat: 15 },
  'soda': { calories: 41, protein: 0, carbs: 10.6, fat: 0, sugar: 10.6 },
  'juice': { calories: 45, protein: 0.5, carbs: 10.4, fat: 0.1, sugar: 9.5 }
};

// Default portion sizes (in grams) for common foods
const defaultPortions: Record<string, { quantity: number, unit: string }> = {
  'chicken': { quantity: 85, unit: 'g' },  // ~3 oz
  'rice': { quantity: 150, unit: 'g' },    // ~1 cup cooked
  'apple': { quantity: 182, unit: 'g' },   // 1 medium apple
  'banana': { quantity: 118, unit: 'g' },  // 1 medium banana
  'egg': { quantity: 50, unit: 'g' },      // 1 large egg
  'bread': { quantity: 30, unit: 'g' },    // 1 slice
  'pasta': { quantity: 140, unit: 'g' },   // ~1 cup cooked
  'potato': { quantity: 173, unit: 'g' },  // 1 medium potato
  'beef': { quantity: 85, unit: 'g' },     // ~3 oz
  'salmon': { quantity: 85, unit: 'g' },   // ~3 oz
  'milk': { quantity: 240, unit: 'ml' },   // 1 cup
  'yogurt': { quantity: 170, unit: 'g' },  // ~6 oz container
  'cheese': { quantity: 28, unit: 'g' },   // ~1 oz
  'broccoli': { quantity: 91, unit: 'g' }, // 1 cup
  'spinach': { quantity: 30, unit: 'g' },  // 1 cup raw
  'carrot': { quantity: 61, unit: 'g' },   // 1 medium carrot
  'coffee': { quantity: 240, unit: 'ml' }, // 1 cup
  'tea': { quantity: 240, unit: 'ml' },    // 1 cup
  'water': { quantity: 240, unit: 'ml' },  // 1 cup
  'chocolate': { quantity: 40, unit: 'g' },// ~1.4 oz bar
  'pizza': { quantity: 107, unit: 'g' },   // 1 slice
  'burger': { quantity: 150, unit: 'g' },  // 1 patty
  'fries': { quantity: 117, unit: 'g' },   // medium serving
  'soda': { quantity: 355, unit: 'ml' },   // 12 oz can
  'juice': { quantity: 240, unit: 'ml' }   // 1 cup
};

/**
 * Get nutrition information for a list of food items
 * 
 * @param foods - Array of parsed food items
 * @returns Nutrition information for each food and totals
 */
export async function getNutrition(foods: ParsedFood[]): Promise<NutritionResult> {
  console.log(`[Mock Nutritionix] Processing ${foods.length} food items`);
  
  const items: FoodNutrition[] = [];
  const totals: NutritionInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  };
  
  // Process each food item
  for (const food of foods) {
    // Find the closest match in our database (very simplified)
    const foodName = food.name.toLowerCase().trim();
    let matchedFood = foodName;
    
    // If exact match not found, try to find a partial match
    if (!mockNutritionDatabase[matchedFood]) {
      matchedFood = Object.keys(mockNutritionDatabase).find(key => 
        foodName.includes(key) || key.includes(foodName)
      ) || 'chicken'; // Default to chicken if no match found
    }
    
    // Get nutrition data for this food
    const nutritionPer100g = mockNutritionDatabase[matchedFood];
    
    // Determine quantity and unit
    const quantity = food.quantity || 1;
    const defaultPortion = defaultPortions[matchedFood] || { quantity: 100, unit: 'g' };
    const portionSize = defaultPortion.quantity;
    const unit = food.unit || defaultPortion.unit;
    
    // Calculate nutrition based on portion size
    const scaleFactor = (portionSize / 100) * quantity;
    const nutrition: NutritionInfo = {
      calories: Math.round(nutritionPer100g.calories * scaleFactor),
      protein: parseFloat((nutritionPer100g.protein * scaleFactor).toFixed(1)),
      carbs: parseFloat((nutritionPer100g.carbs * scaleFactor).toFixed(1)),
      fat: parseFloat((nutritionPer100g.fat * scaleFactor).toFixed(1))
    };
    
    if (nutritionPer100g.fiber) {
      nutrition.fiber = parseFloat((nutritionPer100g.fiber * scaleFactor).toFixed(1));
      totals.fiber = (totals.fiber || 0) + nutrition.fiber;
    }
    
    if (nutritionPer100g.sugar) {
      nutrition.sugar = parseFloat((nutritionPer100g.sugar * scaleFactor).toFixed(1));
      totals.sugar = (totals.sugar || 0) + nutrition.sugar;
    }
    
    if (nutritionPer100g.sodium) {
      nutrition.sodium = parseFloat((nutritionPer100g.sodium * scaleFactor).toFixed(1));
      totals.sodium = (totals.sodium || 0) + nutrition.sodium;
    }
    
    // Add to items array
    items.push({
      food: matchedFood,
      nutrition,
      quantity,
      unit
    });
    
    // Add to totals
    totals.calories += nutrition.calories;
    totals.protein += nutrition.protein;
    totals.carbs += nutrition.carbs;
    totals.fat += nutrition.fat;
  }
  
  // Round totals
  totals.calories = Math.round(totals.calories);
  totals.protein = parseFloat(totals.protein.toFixed(1));
  totals.carbs = parseFloat(totals.carbs.toFixed(1));
  totals.fat = parseFloat(totals.fat.toFixed(1));
  
  if (totals.fiber) totals.fiber = parseFloat(totals.fiber.toFixed(1));
  if (totals.sugar) totals.sugar = parseFloat(totals.sugar.toFixed(1));
  if (totals.sodium) totals.sodium = parseFloat(totals.sodium.toFixed(1));
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return { items, totals };
}
