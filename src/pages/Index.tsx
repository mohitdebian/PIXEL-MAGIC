
import React, { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import ImageGrid from '@/components/ImageGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from "sonner";

// Mock function to simulate image generation
// In a real implementation, this would call an AI image API
const mockGenerateImage = (prompt: string): Promise<{id: string, url: string, prompt: string}> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 15);
      
      // For demo purpose, using placeholder images
      const placeholderUrls = [
        'https://images.unsplash.com/photo-1557682250-0ef193361e31',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176',
        'https://images.unsplash.com/photo-1600132806370-bf17e65e942f',
        'https://images.unsplash.com/photo-1614728263952-84ea256f9679',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      ];
      
      const randomImageUrl = placeholderUrls[Math.floor(Math.random() * placeholderUrls.length)];
      
      resolve({
        id: randomId,
        url: `${randomImageUrl}?q=${randomId}`,
        prompt: prompt,
      });
    }, 1500); // Simulate 1.5 second delay
  });
};

const Index: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<Array<{id: string, url: string, prompt: string}>>([]);

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const newImage = await mockGenerateImage(prompt);
      setImages(prevImages => [newImage, ...prevImages]);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
          Modern Pixel Magic
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Transform your imagination into stunning visuals with our AI image generator
        </p>
      </header>

      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center glass-card p-4 rounded-xl animate-fade-in">
          <div className="flex-1 w-full">
            <PromptInput 
              onPromptChange={handlePromptChange}
              disabled={isGenerating}
            />
          </div>
          <div>
            <GenerateButton 
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              isLoading={isGenerating}
            />
          </div>
        </div>

        {isGenerating && (
          <div className="flex justify-center my-10 animate-fade-in">
            <div className="flex flex-col items-center">
              <LoadingSpinner size="large" />
              <p className="mt-4 text-muted-foreground">Creating your masterpiece...</p>
            </div>
          </div>
        )}

        <ImageGrid images={images} isLoading={isGenerating} />
      </div>
    </div>
  );
};

export default Index;
