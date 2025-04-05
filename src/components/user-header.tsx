
import React from 'react';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserHeader() {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <ThemeToggle />
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
