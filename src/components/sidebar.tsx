
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
  MessageSquare, 
  FileText,
  Image,
  Menu,
  X,
  User,
  ClipboardList,
  GraduationCap,
  ChevronLeft,
  ChevronLeftIcon
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { SettingsDialog } from "./settings-dialog";
import { HelpDialog } from "./help-dialog";
import { PremiumDialog } from "./premium-dialog";
import { ReportBugDialog } from "./report-bug-dialog";
import { createSpace, getSpaces, getJournals } from "@/services/chat-service";
import { useToast } from "@/hooks/use-toast";
import { Journal } from "@/models/chat";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CreateItemDialog } from "./create-item-dialog";

export function Sidebar() {
  const [journalsOpen, setJournalsOpen] = useState(true);
  const [spacesOpen, setSpacesOpen] = useState(true);
  const [spaces, setSpaces] = useState<Array<{ id: string; name: string }>>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<'space' | 'journal' | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Load spaces and journals on mount
  useEffect(() => {
    loadSpaces();
    loadJournals();
  }, []);
  
  const loadSpaces = () => {
    const loadedSpaces = getSpaces();
    setSpaces(loadedSpaces.map(space => ({ id: space.id, name: space.name })));
  };
  
  const loadJournals = () => {
    const loadedJournals = getJournals();
    setJournals(loadedJournals);
  };
  
  const handleCreateSpace = (name: string) => {
    createSpace(name);
    loadSpaces();
    toast({
      title: "Space Created",
      description: `Space "${name}" has been created.`,
    });
  };
  
  const handleNavigateToSpace = (spaceId: string) => {
    // Navigate to the index page with the space ID
    navigate('/', { state: { activeSpaceId: spaceId } });
  };
  
  const handleNavigateToJournal = (journalId: string) => {
    navigate('/journals', { state: { activeJournalId: journalId } });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      {!isMobile && (
        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 bg-primary text-white rounded-full p-1 shadow-md z-50"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}

      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">Hi, ProxyYt</h2>
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </Link>
          </div>
        </div>
        
        {!isCollapsed && (
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
        )}
      </div>

      <div className="p-4 border-b">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => !isCollapsed && setJournalsOpen(!journalsOpen)}
        >
          {isCollapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mx-auto"
              onClick={() => navigate('/journals')}
            >
              <FileText size={18} />
            </Button>
          ) : (
            <>
              <span className="font-medium text-sm text-gray-500 dark:text-gray-400">JOURNALS</span>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setCreateDialogOpen('journal');
                  }}
                >
                  <Plus size={12} />
                </Button>
                {journalsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </>
          )}
        </div>

        {!isCollapsed && journalsOpen && (
          <div className="mt-2 pl-2 space-y-1 max-h-[150px] overflow-y-auto">
            <div 
              className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
              onClick={() => setCreateDialogOpen('journal')}
            >
              <Plus size={14} />
              <span>Create Journal</span>
            </div>
            {journals.map((journal) => (
              <div
                key={journal.id}
                className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                onClick={() => handleNavigateToJournal(journal.id)}
              >
                <FileText size={14} />
                <span className="truncate flex-1">{journal.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-b">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => !isCollapsed && setSpacesOpen(!spacesOpen)}
        >
          {isCollapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mx-auto"
              onClick={() => navigate('/')}
            >
              <MessageSquare size={18} />
            </Button>
          ) : (
            <>
              <span className="font-medium text-sm text-gray-500 dark:text-gray-400">SPACES</span>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={(e) => { e.stopPropagation(); setCreateDialogOpen('space'); }}>
                  <Plus size={12} />
                </Button>
                {spacesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </>
          )}
        </div>

        {!isCollapsed && spacesOpen && (
          <div className="mt-2 pl-2 space-y-1 max-h-[200px] overflow-y-auto">
            {spaces.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">No spaces yet</div>
            ) : (
              spaces.map((space) => (
                <div
                  key={space.id}
                  className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                  onClick={() => handleNavigateToSpace(space.id)}
                >
                  <MessageSquare size={14} />
                  <span className="truncate">{space.name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isCollapsed ? (
        <div className="p-4 flex flex-col items-center gap-4">
          <Link to="/tasks">
            <Button variant="ghost" size="icon">
              <ClipboardList size={18} />
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="ghost" size="icon">
              <GraduationCap size={18} />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDialogOpen('settings')}
          >
            <Settings size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDialogOpen('help')}
          >
            <HelpCircle size={18} />
          </Button>
        </div>
      ) : (
        <div className="mt-auto p-4 space-y-2">
          <Link to="/tasks" className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <ClipboardList size={16} />
            <span>Tasks</span>
          </Link>
          <Link to="/courses" className="flex items-center gap-2 p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <GraduationCap size={16} />
            <span>Courses</span>
          </Link>
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
      )}
      
      {/* Dialog Components */}
      <SettingsDialog open={dialogOpen === 'settings'} onClose={() => setDialogOpen(null)} />
      <HelpDialog open={dialogOpen === 'help'} onClose={() => setDialogOpen(null)} />
      <PremiumDialog open={dialogOpen === 'premium'} onClose={() => setDialogOpen(null)} />
      <ReportBugDialog open={dialogOpen === 'report-bug'} onClose={() => setDialogOpen(null)} />

      {/* Create Dialogs */}
      <CreateItemDialog
        open={createDialogOpen === 'space'}
        onClose={() => setCreateDialogOpen(null)}
        onSubmit={handleCreateSpace}
        title="Create New Chat"
        description="Enter a name for your new chat."
        itemLabel="Chat"
      />
      
      <CreateItemDialog
        open={createDialogOpen === 'journal'}
        onClose={() => setCreateDialogOpen(null)}
        onSubmit={(name) => {
          navigate('/journals', { state: { createNew: true, newTitle: name } });
          setCreateDialogOpen(null);
        }}
        title="Create New Journal"
        description="Enter a title for your new journal."
        itemLabel="Journal"
      />
    </div>
  );

  return isMobile ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-50 rounded-full">
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  ) : (
    <div className={`${isCollapsed ? 'w-14' : 'w-56'} min-h-screen bg-muted/30 border-r flex flex-col transition-all duration-300 ease-in-out`}>
      <SidebarContent />
    </div>
  );
}
