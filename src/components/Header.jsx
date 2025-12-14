import React from 'react';
import { BookOpen, Wand2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full py-4 sm:py-6 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-button flex items-center justify-center shadow-soft">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl text-foreground">Pickabook Art</h1>
            <p className="text-xs text-muted-foreground">Personalized Stories</p>
          </div>
        </div>

        {/* Navigation - always visible */}
        <a 
          href="/architecture" 
          className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
        >
          <Wand2 className="w-4 h-4" />
          <span className="text-sm font-medium">Architecture</span>
        </a>
      </div>
    </header>
  );
};