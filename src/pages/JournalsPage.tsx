
import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";

const JournalsPage = () => {
  const isMobile = useIsMobile();
  const [content, setContent] = useState('');
  
  // Auto-save effect
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      console.log('Auto-saving content:', content);
      // Here you would typically save to a backend
      localStorage.setItem('journal-content', content);
    }, 2000);
    
    return () => clearTimeout(saveTimeout);
  }, [content]);
  
  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('journal-content');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-10 ${isMobile ? 'pt-16' : ''}`}>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">My Journal</h1>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Journal Title"
              className="w-full px-4 py-2 text-xl font-semibold border-b border-gray-200 focus:outline-none focus:border-primary"
              defaultValue="Untitled Entry"
            />
          </div>
          
          <div className="mb-2 text-sm text-gray-500">
            Last saved: {new Date().toLocaleString()}
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted p-2 border-b flex flex-wrap gap-2">
              <button className="p-1 hover:bg-background rounded">
                <strong>B</strong>
              </button>
              <button className="p-1 hover:bg-background rounded">
                <i>I</i>
              </button>
              <button className="p-1 hover:bg-background rounded">
                <u>U</u>
              </button>
              <button className="p-1 hover:bg-background rounded">
                H1
              </button>
              <button className="p-1 hover:bg-background rounded">
                H2
              </button>
              <button className="p-1 hover:bg-background rounded">
                • List
              </button>
              <button className="p-1 hover:bg-background rounded">
                1. List
              </button>
            </div>
            
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your thoughts..."
              className="min-h-[60vh] p-4 border-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalsPage;
