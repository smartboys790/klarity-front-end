
import React from 'react';

interface UserGreetingProps {
  username: string;
}

export function UserGreeting({ username }: UserGreetingProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="mb-4">
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 80 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
        >
          <path 
            d="M70 10L15 30L35 45L45 65L70 10Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-mono tracking-wide">
        Happy Late Night, {username}
      </h1>
    </div>
  );
}
