
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface PromptInputProps {
  onPromptChange: (prompt: string) => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onPromptChange, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    onPromptChange(newPrompt);
  };

  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Describe the image you want to generate..."
        value={prompt}
        onChange={handleInputChange}
        disabled={disabled}
        className="px-4 py-6 bg-input text-foreground rounded-lg w-full input-glow text-lg"
        autoFocus
      />
    </div>
  );
};

export default PromptInput;
