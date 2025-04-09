
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface ChatMessageProps {
  content: string;
  isAi?: boolean;
  timestamp?: Date;
}

export function ChatMessage({ content, isAi = false, timestamp = new Date() }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-6 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          {isAi ? (
            <AvatarImage src="/placeholder.svg" alt="AI" />
          ) : (
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          )}
          <AvatarFallback>{isAi ? 'AI' : 'U'}</AvatarFallback>
        </Avatar>
      </div>
      <div className={`flex flex-col max-w-[85%] ${isAi ? '' : 'items-end'}`}>
        <div className={`p-3 rounded-lg ${isAi ? 'bg-[#1E293B]' : 'bg-blue-600'}`}>
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
