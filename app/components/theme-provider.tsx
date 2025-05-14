'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Apply theme to document element and body
  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    
    // Ensure consistent application of theme to all elements
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      applyTheme(savedTheme)
    } else if (prefersDark) {
      applyTheme('dark')
    } else {
      // Ensure light mode is properly set
      applyTheme('light')
    }

    // Add transitions class with a delay to prevent initial transition
    const timer = setTimeout(() => {
      document.body.classList.add('transitions-enabled')
      setMounted(true)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    // Prevent rapid toggling
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    // Store preference
    localStorage.setItem('theme', newTheme)
    
    // Force update all CSS variables simultaneously
    requestAnimationFrame(() => {
      // Apply new theme
      applyTheme(newTheme)
      
      // Allow transitions to complete before accepting new toggles
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 550) // Match to CSS transition duration
      
      return () => clearTimeout(timer)
    })
  }

  // Only render children once mounted to prevent flickering
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 