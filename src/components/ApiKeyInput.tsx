
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Check, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('togetherApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
      setIsSaved(true);
    } else {
      setShowInput(true);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    localStorage.setItem('togetherApiKey', apiKey);
    onApiKeyChange(apiKey);
    setIsSaved(true);
    setShowInput(false);
    toast.success('API key saved successfully');
  };

  const handleReset = () => {
    localStorage.removeItem('togetherApiKey');
    setApiKey('');
    setIsSaved(false);
    setShowInput(true);
    onApiKeyChange('');
    toast.info('API key removed');
  };

  if (!showInput && isSaved) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg my-4">
        <Check size={16} />
        <span className="text-sm">API key set</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowInput(true)}
          className="ml-auto text-xs h-7"
        >
          Change
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full glass-card p-4 rounded-xl mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Key size={16} className="text-primary" />
        <h3 className="text-sm font-medium">Together AI API Key</h3>
      </div>
      
      <div className="mb-2 text-xs text-muted-foreground">
        <p>You need a Together AI API key to generate images.</p>
        <a 
          href="https://www.together.ai/api" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Get an API key here
        </a>
      </div>

      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Together AI API key"
          className="flex-1"
        />
        <Button onClick={handleSaveApiKey} size="sm">
          Save
        </Button>
        {isSaved && (
          <Button onClick={handleReset} variant="outline" size="sm">
            Reset
          </Button>
        )}
      </div>

      {!apiKey && showInput && (
        <div className="flex items-center gap-2 mt-2 text-amber-500 text-xs">
          <AlertCircle size={14} />
          <span>API key is required to generate images</span>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
