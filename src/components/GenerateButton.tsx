
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from 'lucide-react';

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
      className={`px-8 py-6 font-semibold text-lg rounded-lg relative overflow-hidden group
        ${isLoading ? 'opacity-80' : 'hover:scale-105'}
        bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-size-200 bg-pos-0 hover:bg-pos-100
        text-white transition-all duration-500 ease-in-out
        shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      title={disabled ? "Enter a prompt and API key first" : "Generate image"}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span>Generate</span>
          </>
        )}
      </span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-25 bg-gradient-to-r from-white/20 via-white/0 to-white/0 transition-opacity"></span>
    </Button>
  );
};

export default GenerateButton;
