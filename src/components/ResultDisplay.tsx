import React from 'react';
import { Download, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultDisplayProps {
  originalImage: string;
  personalizedImage: string;
  onReset: () => void;
  onDownload: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImage,
  personalizedImage,
  onReset,
  onDownload,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-foreground mb-2">
          Your Story Awaits! ✨
        </h2>
        <p className="text-muted-foreground">
          The illustration has been personalized with your photo
        </p>
      </div>

      {/* Before/After Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Original Photo */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-accent rounded-3xl opacity-50 blur group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-card rounded-2xl p-4 shadow-card">
            <div className="aspect-square rounded-xl overflow-hidden mb-3">
              <img 
                src={originalImage} 
                alt="Original photo" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-display text-sm text-muted-foreground">
              Original Photo
            </p>
          </div>
        </div>

        {/* Arrow indicator (desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-12 rounded-full bg-coral text-primary-foreground flex items-center justify-center shadow-elevated animate-bounce-gentle">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Personalized Illustration */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-button rounded-3xl opacity-50 blur group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-card rounded-2xl p-4 shadow-card">
            <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
              <img 
                src={personalizedImage} 
                alt="Personalized illustration" 
                className="w-full h-full object-cover"
              />
              {/* Storybook page effect */}
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <path 
                    d="M64 0 L64 64 L0 64 Q32 64 64 32 Z" 
                    fill="hsl(var(--muted))"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
            <p className="text-center font-display text-sm text-coral">
              ✨ Personalized Illustration
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="hero" 
          size="xl" 
          onClick={onDownload}
          className="min-w-[200px]"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </Button>
        <Button 
          variant="outline" 
          size="xl" 
          onClick={onReset}
          className="min-w-[200px]"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Another Photo
        </Button>
      </div>
    </div>
  );
};
