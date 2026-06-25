import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const GlassCard = ({ children, className, glow = false }) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 relative overflow-hidden group transition-all duration-300", 
        glow && "hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        className
      )}
    >
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(6,182,212,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );
};

export default GlassCard;
