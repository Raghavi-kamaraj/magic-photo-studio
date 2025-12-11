import React from 'react';
import { Sparkles, BookOpen, Wand2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-button flex items-center justify-center shadow-soft">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-foreground">Pickabook</h1>
            <p className="text-xs text-muted-foreground">Personalized Stories</p>
          </div>
        </div>

        {/* Navigation hints */}
        <div className="hidden sm:flex items-center gap-6">
          <a 
            href="/architecture" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            <span className="text-sm font-medium">Architecture</span>
          </a>
        </div>
      </div>
    </header>
  );
};
