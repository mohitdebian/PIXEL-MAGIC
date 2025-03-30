
import React from 'react';
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ 
  onClick, 
  disabled, 
  isLoading 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-8 py-6 font-semibold text-lg rounded-lg button-glow
        ${isLoading ? 'opacity-80' : 'hover:scale-105'}
        bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
    >
      {isLoading ? 'Generating...' : 'Generate'}
    </Button>
  );
};

export default GenerateButton;
