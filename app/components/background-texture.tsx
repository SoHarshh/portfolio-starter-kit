'use client';

import { useTheme } from './theme-provider';
import { useEffect, useState, useRef } from 'react';

export function BackgroundTexture() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Track mouse movement for subtle interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      
      // Calculate mouse position as percentage of screen
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Apply subtle transform based on mouse position (limited effect)
      const moveX = (x - 0.5) * 5; // -2.5 to 2.5
      const moveY = (y - 0.5) * 5; // -2.5 to 2.5
      
      // Apply with smooth transition
      overlayRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!overlayRef.current) return;
      // Reset position on resize
      overlayRef.current.style.transform = `translate(0, 0) scale(1)`;
    };
    
    // Only render the texture after the component has mounted to prevent hydration issues
    setMounted(true);
    
    // Add the texture-loaded class after a short delay to enable transition
    const timer = setTimeout(() => {
      document.body.classList.add('texture-loaded');
    }, 100);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="background-texture">
      <div className="texture-overlay" ref={overlayRef}></div>
    </div>
  );
} 