'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const { toggleTheme } = useTheme()
  const pageRef = useRef<HTMLElement>(null)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [imageTimestamp, setImageTimestamp] = useState(Date.now())

  // Refresh the image when component mounts and periodically check for changes
  useEffect(() => {
    // Initial refresh
    setImageTimestamp(Date.now())
    
    // Set up periodic check for new image
    const checkInterval = setInterval(() => {
      setImageTimestamp(Date.now())
    }, 60000) // Check every minute
    
    return () => clearInterval(checkInterval)
  }, [])

  // Set up click handlers only after initial mount
  useEffect(() => {    
    // Use document.body instead of section element for click handling
    const handlePageClick = (e: MouseEvent) => {
      // Ignore clicks on interactive elements
      if ((e.target as HTMLElement).closest('a, button, .theme-icon, .profile-container')) {
        return
      }
      toggleTheme()
    }
    
    // Add click listener to document.body for wider coverage
    document.body.addEventListener('click', handlePageClick)
    
    return () => {
      document.body.removeEventListener('click', handlePageClick)
    }
  }, [toggleTheme])

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Refresh image when previewing
    setImageTimestamp(Date.now());
    setShowImagePreview(true);
  }

  const closeImagePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImagePreview(false);
  }

  return (
    <section 
      ref={pageRef} 
      className="min-h-screen pb-20 relative w-full"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Harsh Soni
        </h1>
        <div className="flex items-center">
          <div 
            className="profile-container h-[160px] w-[160px] overflow-hidden rounded-lg cursor-pointer shadow-lg"
            onClick={handleImageClick}
          >
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Image 
                src={`/profile.jpg?v=${imageTimestamp}`}
                alt="Harsh Soni" 
                width={160} 
                height={160} 
                className="object-cover h-full w-full static-image"
                priority
                unoptimized
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeImagePreview}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all z-10 backdrop-blur-sm"
              onClick={closeImagePreview}
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="image-preview-container rounded-lg overflow-hidden">
              <Image 
                src={`/profile.jpg?v=${imageTimestamp}`}
                alt="Harsh Soni" 
                width={1000} 
                height={1000}
                className="object-contain max-h-[85vh] w-auto static-image"
                priority
                unoptimized
                loading="eager"
                quality={95}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="font-normal">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Howdy!</h2>
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        </div>
        
        <p className="mb-4 leading-relaxed">
          Here's a little corner where you can get to know me better.
        </p>
        
        <p className="mb-4 leading-relaxed">
          I'm a sophomore majoring in Computer Science and Economics. I've always been someone who loves exploring new things and constantly looks for opportunities to learn and add new skills to my backpack. Whether it's solving problems with technology or understanding the intricacies of economic systems, I'm passionate about finding creative ways to apply my knowledge.
        </p>
        
        <p className="mb-4 leading-relaxed">
          When I'm outside my academic era, you'll likely find me on the tennis court!
        </p>
        
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-wrap items-center gap-5">
            <SocialLink href="https://www.linkedin.com/in/harsh-soni46" label="LinkedIn" />
            <SocialLink href="https://twitter.com/SoHarshhh" label="Twitter" />
            <SocialLink href="https://instagram.com/Soharshh__" label="Instagram" />
            <SocialLink href="https://github.com/SoHarshh" label="GitHub" />
            <SocialLink href="mailto:Soni.harsh0707@gmail.com" label="Email" />
            <SocialLink href="/Harsh Soni CV.pdf" label="Resume" forceNewTab={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, label, forceNewTab }: { href: string; label: string; forceNewTab?: boolean }) {
  return (
    <Link 
      href={href}
      className="social-link text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
      target={(href.startsWith('http') || href.startsWith('mailto') || forceNewTab) ? '_blank' : undefined}
      rel={(href.startsWith('http') || forceNewTab) ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  )
}
