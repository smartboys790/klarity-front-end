
import React, { useState } from 'react';
import { 
  Code, 
  PenBox, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  CircleDollarSign,
  Settings, 
  AlertCircle, 
  HelpCircle, 
  LogOut 
} from "lucide-react";

export function Sidebar() {
  const [journalsOpen, setJournalsOpen] = useState(true);
  const [spacesOpen, setSpacesOpen] = useState(true);

  return (
    <div className="w-56 min-h-screen bg-muted/30 border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">Hi, ProxyYt</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <PenBox size={18} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Settings size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <Code size={16} />
            <span>Praxis</span>
            <ChevronRight size={16} className="ml-auto" />
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <PenBox size={16} />
            <span>Open Canvas</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <Search size={16} />
            <span>Search</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-b">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setJournalsOpen(!journalsOpen)}
        >
          <span className="font-medium text-sm text-gray-500 dark:text-gray-400">JOURNALS</span>
          {journalsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {journalsOpen && (
          <div className="mt-2 pl-2">
            <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
              <Plus size={14} />
              <span>Create Journal</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-b">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setSpacesOpen(!spacesOpen)}
        >
          <span className="font-medium text-sm text-gray-500 dark:text-gray-400">SPACES</span>
          {spacesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {spacesOpen && (
          <div className="mt-2 pl-2 space-y-1">
            {["t", "tst", "t", "te", "testtt", "sp"].map((space, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
              >
                <PenBox size={14} />
                <span>{space}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto p-4 space-y-2">
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <CircleDollarSign size={16} />
          <span>Get Premium</span>
        </div>
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <Settings size={16} />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <AlertCircle size={16} />
          <span>Report Bug</span>
        </div>
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <HelpCircle size={16} />
          <span>Help</span>
        </div>
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <LogOut size={16} />
          <span>Exit to Home</span>
        </div>
      </div>
    </div>
  );
}
