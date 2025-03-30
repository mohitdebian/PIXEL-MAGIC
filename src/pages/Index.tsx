import React, { useState, useEffect } from 'react';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import ImageGrid from '@/components/ImageGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import ApiKeyInput from '@/components/ApiKeyInput';
import { toast } from "sonner";
import { generateImage, GeneratedImage, initializeTogether } from '@/services/imageService';
import { Sparkles, Wand2, Image as ImageIcon, Stars } from 'lucide-react';

const Index: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  // Initialize Together client when API key changes
  useEffect(() => {
    if (apiKey) {
      try {
        initializeTogether(apiKey);
      } catch (error) {
        console.error("Error initializing Together client:", error);
        toast.error("Invalid API key format");
      }
    }
  }, [apiKey]);

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    if (!apiKey) {
      toast.error('Please enter your Together AI API key first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const newImage = await generateImage(prompt);
      setImages(prevImages => [newImage, ...prevImages]);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please check your API key and try again.');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full bg-gradient-to-b from-violet-900/20 to-background py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-violet-300 flex items-center justify-center gap-2">
              <Stars className="h-4 w-4" />
              AI-Powered Image Generation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Modern Pixel Magic
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-90">
            Transform your imagination into stunning visuals with our cutting-edge AI image generator
          </p>
          
          <div className="flex flex-col gap-4 items-center mt-8 animate-fade-in">
            <div className="relative w-full max-w-3xl">
              <Sparkles className="absolute -top-6 -right-6 text-violet-500 animate-pulse w-12 h-12 opacity-70" />
              <Wand2 className="absolute -bottom-6 -left-6 text-indigo-500 animate-pulse w-12 h-12 opacity-70" />
              <div className="glass-card p-1 rounded-xl border border-violet-500/20 shadow-lg shadow-violet-500/10">
                <div className="w-full mx-auto">
                  <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
                  <div className="flex flex-col md:flex-row gap-4 items-center p-4 rounded-xl animate-fade-in">
                    <div className="flex-1 w-full">
                      <PromptInput 
                        onPromptChange={handlePromptChange}
                        disabled={isGenerating}
                      />
                    </div>
                    <div>
                      <GenerateButton 
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || !apiKey}
                        isLoading={isGenerating}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {isGenerating ? (
          <div className="flex justify-center my-10 animate-fade-in">
            <div className="flex flex-col items-center">
              <LoadingSpinner size="large" />
              <p className="mt-4 text-muted-foreground">Creating your visual masterpiece...</p>
            </div>
          </div>
        ) : images.length > 0 ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
              Your Creations
            </h2>
            <ImageGrid images={images} isLoading={isGenerating} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 mb-4 mx-auto bg-violet-500/20 rounded-full flex items-center justify-center">
                    <Wand2 className="text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Describe</h3>
                  <p className="text-muted-foreground">Type your imagination into words with detailed prompts</p>
                </div>
                <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 mb-4 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Generate</h3>
                  <p className="text-muted-foreground">Our AI processes your prompt and creates unique visuals</p>
                </div>
                <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 mb-4 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
                    <ImageIcon className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
                  <p className="text-muted-foreground">Download, share or refine your generated masterpieces</p>
                </div>
              </div>
            </div>
            <ImageGrid images={images} isLoading={isGenerating} />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="w-full py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
              Modern Pixel Magic
            </h3>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Modern Pixel Magic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
