
import React from 'react';
import { Image } from 'lucide-react';

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
        <Image className="w-12 h-12 text-muted-foreground/50 mb-4 animate-float" />
        <p className="text-lg text-muted-foreground text-center bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text text-transparent">
          Your generated images will appear here
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2 text-center">
          Enter a prompt and click Generate to create an image
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {images.map((image, index) => (
        <div 
          key={image.id} 
          className="overflow-hidden rounded-xl glass-card group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={image.url} 
              alt={image.prompt} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300 line-clamp-2">
              {image.prompt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
