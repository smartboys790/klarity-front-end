
import React, { useState, useEffect } from 'react';
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
  LogOut,
  MessageSquare 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { SettingsDialog } from "./settings-dialog";
import { HelpDialog } from "./help-dialog";
import { PremiumDialog } from "./premium-dialog";
import { ReportBugDialog } from "./report-bug-dialog";
import { createSpace, getSpaces } from "@/services/chat-service";
import { useToast } from "@/hooks/use-toast";

export function Sidebar() {
  const [journalsOpen, setJournalsOpen] = useState(true);
  const [spacesOpen, setSpacesOpen] = useState(true);
  const [spaces, setSpaces] = useState<Array<{ id: string; name: string }>>([]);
  const isMobile = useIsMobile();
  
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Load spaces on mount
  useEffect(() => {
    loadSpaces();
  }, []);
  
  const loadSpaces = () => {
    const loadedSpaces = getSpaces();
    setSpaces(loadedSpaces.map(space => ({ id: space.id, name: space.name })));
  };
  
  const handleCreateSpace = () => {
    const spaceName = prompt('Enter space name:');
    if (spaceName) {
      createSpace(spaceName);
      loadSpaces();
      toast({
        title: "Space Created",
        description: `Space "${spaceName}" has been created.`,
      });
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">Hi, ProxyYt</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <PenBox size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <Link to="/" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <Code size={16} />
            <span>Praxis</span>
            <ChevronRight size={16} className="ml-auto" />
          </Link>
          <Link to="/canvas" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <PenBox size={16} />
            <span>Open Canvas</span>
          </Link>
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
            <Link to="/journals" className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
              <Plus size={14} />
              <span>Create Journal</span>
            </Link>
          </div>
        )}
      </div>

      <div className="p-4 border-b">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setSpacesOpen(!spacesOpen)}
        >
          <span className="font-medium text-sm text-gray-500 dark:text-gray-400">SPACES</span>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={(e) => { e.stopPropagation(); handleCreateSpace(); }}>
              <Plus size={12} />
            </Button>
            {spacesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
        {spacesOpen && (
          <div className="mt-2 pl-2 space-y-1 max-h-[200px] overflow-y-auto">
            {spaces.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">No spaces yet</div>
            ) : (
              spaces.map((space) => (
                <Link
                  key={space.id}
                  to="/"
                  className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span className="truncate">{space.name}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mt-auto p-4 space-y-2">
        <div 
          className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
          onClick={() => setDialogOpen('premium')}
        >
          <CircleDollarSign size={16} />
          <span>Get Premium</span>
        </div>
        <div 
          className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
          onClick={() => setDialogOpen('settings')}
        >
          <Settings size={16} />
          <span>Settings</span>
        </div>
        <div 
          className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
          onClick={() => setDialogOpen('report-bug')}
        >
          <AlertCircle size={16} />
          <span>Report Bug</span>
        </div>
        <div 
          className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
          onClick={() => setDialogOpen('help')}
        >
          <HelpCircle size={16} />
          <span>Help</span>
        </div>
        <div className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
          <LogOut size={16} />
          <span>Exit to Home</span>
        </div>
      </div>
      
      {/* Dialog Components */}
      <SettingsDialog open={dialogOpen === 'settings'} onClose={() => setDialogOpen(null)} />
      <HelpDialog open={dialogOpen === 'help'} onClose={() => setDialogOpen(null)} />
      <PremiumDialog open={dialogOpen === 'premium'} onClose={() => setDialogOpen(null)} />
      <ReportBugDialog open={dialogOpen === 'report-bug'} onClose={() => setDialogOpen(null)} />
    </div>
  );

  return isMobile ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-50 rounded-full">
          <Code size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  ) : (
    <div className="w-56 min-h-screen bg-muted/30 border-r flex flex-col">
      <SidebarContent />
    </div>
  );
}
