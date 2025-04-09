
import React, { useState } from 'react';
import { Send, Loader2, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Image, File, MapPin } from "lucide-react";

interface InputPromptProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function InputPrompt({ 
  onSendMessage,
  placeholder = "Type your message here...",
  disabled = false
}: InputPromptProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim() || disabled) return;
    
    setIsLoading(true);
    
    try {
      if (onSendMessage) {
        await onSendMessage(message);
      } else {
        // Default handler for standalone use
        console.log('Message sent:', message);
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully.",
        });
      }
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="rounded-lg p-4 bg-[#111827] border border-gray-800 shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm text-gray-400">Make a plot of...</span>
        <div className="p-1 px-2 bg-[#1E293B] rounded-md text-xs text-gray-400">@DeepTutor</div>
      </div>
      <Textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-[60px] mb-2 resize-none bg-[#1A1F2C] border-gray-700 focus:border-blue-500"
        disabled={disabled}
      />
      <div className="flex items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Plus size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-[#1A1F2C] border-gray-700">
            <div className="grid gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-gray-300"
              >
                <Image className="mr-2 h-4 w-4" /> Insert Image
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-gray-300"
              >
                <File className="mr-2 h-4 w-4" /> Upload File
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-gray-300"
              >
                <MapPin className="mr-2 h-4 w-4" /> Share Location
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">
            Feynman may make mistakes. Check important info and please report any bugs.
          </p>
          <button 
            className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim() || disabled}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
