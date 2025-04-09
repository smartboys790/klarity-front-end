
import React from 'react';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { getUserProfile } from '@/services/chat-service';

export function UserHeader() {
  const isMobile = useIsMobile();
  const userProfile = getUserProfile();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <ThemeToggle />
      <Link to="/profile">
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
          <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
