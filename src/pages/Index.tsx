
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from "@/components/sidebar";
import { UserGreeting } from "@/components/user-greeting";
import { ToolsTabs } from "@/components/tools-tabs";
import { InputPrompt } from "@/components/input-prompt";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatMessage } from "@/components/chat-message";
import { addMessageToSpace, createSpace, getAiResponse, getSpaces } from "@/services/chat-service";
import { ChatSpace } from "@/models/chat";
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const isMobile = useIsMobile();
  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [currentSpace, setCurrentSpace] = useState<ChatSpace | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load spaces on mount
    const loadedSpaces = getSpaces();
    setSpaces(loadedSpaces);
    
    // If there are no spaces, create a default one
    if (loadedSpaces.length === 0) {
      const newSpace = createSpace('Default Space');
      setSpaces([newSpace]);
      setCurrentSpace(newSpace);
    } else {
      // Set the most recently updated space as current
      const mostRecentSpace = [...loadedSpaces].sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      )[0];
      setCurrentSpace(mostRecentSpace);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages when they change
    scrollToBottom();
  }, [currentSpace?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message: string) => {
    if (!currentSpace) {
      toast({
        title: "Error",
        description: "No active chat space found.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage = addMessageToSpace(currentSpace.id, message, false);
    
    if (!userMessage) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
      return;
    }
    
    // Update UI immediately
    setCurrentSpace({
      ...currentSpace,
      messages: [...currentSpace.messages, userMessage],
      updatedAt: new Date()
    });
    
    // Get AI response
    try {
      const aiResponseText = await getAiResponse(message);
      const aiMessage = addMessageToSpace(currentSpace.id, aiResponseText, true);
      
      if (aiMessage) {
        // Update UI with AI response
        setCurrentSpace(prev => prev ? {
          ...prev,
          messages: [...prev.messages, aiMessage],
          updatedAt: new Date()
        } : null);
        
        // Also update spaces list to show the updated timestamp
        setSpaces(prevSpaces => {
          const updatedSpaces = prevSpaces.map(space => 
            space.id === currentSpace.id 
              ? { ...space, updatedAt: new Date() } 
              : space
          );
          return updatedSpaces;
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-10 ${isMobile ? 'pt-16' : ''}`}>
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <UserGreeting username="ProxyYt" />
          <div className="w-full mt-8 md:mt-12">
            <ToolsTabs />
          </div>
          
          {currentSpace && currentSpace.messages.length > 0 ? (
            <div className="w-full mt-6 md:mt-10 mb-6 max-h-[60vh] overflow-y-auto">
              {currentSpace.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isAi={message.isAi}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="w-full mt-6 md:mt-10 text-center text-muted-foreground">
              <p>Start a new conversation!</p>
            </div>
          )}
          
          <div className="w-full mt-auto">
            <InputPrompt onSendMessage={handleSendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
