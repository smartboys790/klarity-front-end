
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserGreetingProps {
  username: string;
}

export function UserGreeting({ username }: UserGreetingProps) {
  const isMobile = useIsMobile();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Happy Late Night';
  };
  
  return (
    <div className="flex flex-col items-center justify-center mt-4 md:mt-6">
      <div className="mb-3 md:mb-4">
        <svg 
          width={isMobile ? "60" : "80"} 
          height={isMobile ? "60" : "80"} 
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
      <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-mono tracking-wide text-center`}>
        {getGreeting()}, {username}
      </h1>
    </div>
  );
}
