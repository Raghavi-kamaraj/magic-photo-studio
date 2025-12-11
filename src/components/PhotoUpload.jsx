import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PhotoUpload = ({ onPhotoSelected, isProcessing = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(file);
    onPhotoSelected(file);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto aspect-square rounded-3xl border-4 border-dashed transition-all duration-500 cursor-pointer overflow-hidden",
        isDragging 
          ? "border-coral bg-coral/10 scale-105" 
          : "border-border bg-card hover:border-coral/50 hover:bg-accent/30",
        isProcessing && "pointer-events-none opacity-70"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={isProcessing}
      />
      
      {preview ? (
        <div className="absolute inset-0 animate-fade-in">
          <img 
            src={preview} 
            alt="Uploaded preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-primary-foreground font-display text-lg">
              {isProcessing ? "Creating magic..." : "Photo ready! ✨"}
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          {/* Floating decorative elements */}
          <div className="absolute top-6 left-8 text-sunshine animate-float">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute top-12 right-10 text-lavender animate-float delay-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute bottom-16 left-12 text-sage animate-float delay-300">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300",
            isDragging ? "bg-coral text-primary-foreground scale-110" : "bg-muted text-muted-foreground"
          )}>
            {isDragging ? (
              <ImageIcon className="w-10 h-10 animate-bounce-gentle" />
            ) : (
              <Upload className="w-10 h-10" />
            )}
          </div>
          
          <h3 className="font-display text-xl text-foreground mb-2">
            {isDragging ? "Drop it here!" : "Upload a photo"}
          </h3>
          <p className="text-muted-foreground text-sm max-w-[200px]">
            Drag and drop a child's photo, or click to browse
          </p>
          
          <div className="mt-6 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-sage-light text-sage text-xs font-medium">
              JPG
            </span>
            <span className="px-3 py-1 rounded-full bg-lavender-light text-lavender text-xs font-medium">
              PNG
            </span>
            <span className="px-3 py-1 rounded-full bg-sunshine-light text-sunshine text-xs font-medium">
              WEBP
            </span>
          </div>
        </div>
      )}
      
      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-coral/20" />
              <div className="absolute inset-0 rounded-full border-4 border-coral border-t-transparent animate-spin" />
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-coral animate-pulse-soft" />
            </div>
            <p className="font-display text-lg text-foreground">Creating magic...</p>
            <p className="text-sm text-muted-foreground mt-1">This may take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
};
