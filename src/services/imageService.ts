
import Together from "together-ai";
import axios from "axios";

// Initialize Together client - we'll pass the API key from the component
let together: Together | null = null;

export function initializeTogether(apiKey: string) {
  together = new Together({ apiKey });
  return together;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

export async function generateImage(prompt: string): Promise<GeneratedImage> {
  try {
    if (!together) {
      throw new Error("API client is not initialized. Please provide an API key first.");
    }

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-schnell-Free",
      prompt: prompt,
      steps: 4, // Steps must be between 1-4
      n: 1 // Generate one image
    });

    const imageUrl = response.data[0].url;
    
    return {
      id: Date.now().toString(),
      url: imageUrl,
      prompt: prompt
    };
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}
