
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
  const [showInput, setShowInput] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isUsingEnvVar, setIsUsingEnvVar] = useState<boolean>(false);

  useEffect(() => {
    // Check if API key exists in environment variables
    const envApiKey = import.meta.env.VITE_TOGETHER_API_KEY;
    
    if (envApiKey) {
      setApiKey(envApiKey);
      onApiKeyChange(envApiKey);
      setIsSaved(true);
      setShowInput(false);
      setIsUsingEnvVar(true);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    onApiKeyChange(apiKey);
    setIsSaved(true);
    setShowInput(false);
    toast.success('API key saved successfully');
  };

  const handleReset = () => {
    if (!isUsingEnvVar) {
      setApiKey('');
    }
    setIsSaved(false);
    setShowInput(true);
    onApiKeyChange('');
    toast.info('API key removed');
  };

  if (!showInput && isSaved) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg my-4">
        <Check size={16} />
        <span className="text-sm">
          {isUsingEnvVar 
            ? "Using API key from environment variable" 
            : "API key set"}
        </span>
        {!isUsingEnvVar && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowInput(true)}
            className="ml-auto text-xs h-7"
          >
            Change
          </Button>
        )}
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
        {!isUsingEnvVar && (
          <>
            <p className="mt-1">For better security, set the VITE_TOGETHER_API_KEY environment variable.</p>
            <a 
              href="https://www.together.ai/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Get an API key here
            </a>
          </>
        )}
      </div>

      {!isUsingEnvVar && (
        <div className="flex gap-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Together AI API key"
            className="flex-1"
            disabled={isUsingEnvVar}
          />
          <Button onClick={handleSaveApiKey} size="sm" disabled={isUsingEnvVar}>
            Save
          </Button>
          {isSaved && (
            <Button onClick={handleReset} variant="outline" size="sm">
              Reset
            </Button>
          )}
        </div>
      )}

      {!apiKey && showInput && !isUsingEnvVar && (
        <div className="flex items-center gap-2 mt-2 text-amber-500 text-xs">
          <AlertCircle size={14} />
          <span>API key is required to generate images</span>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
