
import React from 'react';

interface Image {
  id: string;
  url: string;
  prompt: string;
}

interface ImageGridProps {
  images: Image[];
  isLoading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading }) => {
  if (images.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 glass-card rounded-xl p-6 mt-8 animate-fade-in">
        <p className="text-lg text-muted-foreground text-center">
          Your generated images will appear here.
        </p>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Enter a prompt and click Generate to create an image.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="overflow-hidden rounded-xl glass-card group hover:shadow-lg transition-all duration-300 animate-fade-in"
        >
          <div className="relative aspect-square">
            <img 
              src={image.url} 
              alt={image.prompt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-3 text-sm text-muted-foreground">
            <p className="truncate">{image.prompt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
