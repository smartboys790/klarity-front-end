
import React from 'react';
import { Send } from "lucide-react";

export function InputPrompt() {
  return (
    <div className="border rounded-lg p-4 bg-background">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Make a plot of...</span>
        <div className="p-1 px-2 bg-muted rounded-md text-xs text-muted-foreground">@DeepTutor</div>
      </div>
      <div className="flex items-center justify-between">
        <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            Feynman may make mistakes. Check important info and please report any bugs.
          </p>
          <button className="p-2 bg-primary rounded-lg text-primary-foreground">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
