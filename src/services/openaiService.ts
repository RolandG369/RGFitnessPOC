/**
 * Mock OpenAI Service
 * 
 * This service simulates the functionality of using OpenAI's API to parse
 * natural language food descriptions into structured data.
 * 
 * In a real implementation, this would make API calls to OpenAI.
 */

// Type definitions
export interface ParsedFood {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface ParseFoodResult {
  items: ParsedFood[];
  raw: string;
}

/**
 * Parse a natural language food description into structured data
 * 
 * @param description - Natural language description of food consumed
 * @returns Structured representation of the food items
 */
export async function parseFood(description: string): Promise<ParseFoodResult> {
  console.log(`[Mock OpenAI] Processing: "${description}"`);
  
  // Simple mock implementation that extracts food items based on common patterns
  // In a real implementation, this would use OpenAI's API for more accurate parsing
  
  // Convert to lowercase for easier processing
  const lowerDesc = description.toLowerCase();
  
  // Split by common conjunctions and punctuation
  const parts = lowerDesc.split(/(?:,|and|with|plus|\s+)/);
  
  // Filter out empty strings and common words that aren't food
  const filteredParts = parts.filter(part => {
    const trimmed = part.trim();
    return trimmed.length > 0 && 
           !['i', 'had', 'ate', 'consumed', 'some', 'a', 'an', 'the', 'of'].includes(trimmed);
  });
  
  // Convert to structured format
  const items: ParsedFood[] = filteredParts.map(part => {
    const trimmed = part.trim();
    
    // Try to extract quantity and unit (very simplified)
    const quantityMatch = trimmed.match(/^(\d+)\s+(.+)$/);
    
    if (quantityMatch) {
      return {
        name: quantityMatch[2],
        quantity: parseInt(quantityMatch[1], 10)
      };
    }
    
    return { name: trimmed };
  });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    items,
    raw: description
  };
}
