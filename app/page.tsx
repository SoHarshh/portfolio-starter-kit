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
            className="profile-container h-[140px] w-[140px] overflow-hidden rounded-lg cursor-pointer shadow-lg"
            onClick={handleImageClick}
          >
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Image 
                src={`/profile.jpeg`}
                alt="Harsh Soni" 
                width={140} 
                height={140} 
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
                src={`/profile.jpg`}
                alt="Harsh Soni" 
                width={1000} 
                height={1000}
                className="object-contain max-h-[85vh] w-auto static-image"
                priority
                unoptimized
                loading="eager"
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
        
        <p className="mb-4 leading-relaxed text-base">
          Here's a little corner where you can get to know me better.
        </p>
        
        <p className="mb-4 leading-relaxed text-base">
          I'm a sophomore majoring in Computer Science and Economics. I've always been someone who loves exploring new things and constantly looks for opportunities to learn and add new skills to my backpack. Whether it's solving problems with technology or understanding the intricacies of economic systems, I'm passionate about finding creative ways to apply my knowledge.
        </p>
        
        <p className="mb-4 leading-relaxed text-base">
          When I'm outside my academic era, you'll likely find me on the tennis court!
        </p>
        
        <p className="mb-6 leading-relaxed text-base">
          Feel free to reach out :)
        </p>
        
        <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-row items-center justify-between flex-wrap gap-2">
            <SocialLink href="https://www.linkedin.com/in/harsh-soni46" label="LinkedIn" icon={<LinkedInIcon />} />
            <SocialLink href="https://twitter.com/SoHarshhh" label="Twitter" icon={<TwitterIcon />} />
            <SocialLink href="https://instagram.com/Soharshh__" label="Instagram" icon={<InstagramIcon />} />
            <SocialLink href="https://github.com/SoHarshh" label="GitHub" icon={<GitHubIcon />} />
            <SocialLink href="mailto:Soni.harsh0707@gmail.com" label="Email" icon={<EmailIcon />} />
            <SocialLink href="/Harsh Soni CV.pdf" label="Resume" icon={<ResumeIcon />} forceNewTab={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, label, icon, forceNewTab }: { href: string; label: string; icon: React.ReactNode; forceNewTab?: boolean }) {
  return (
    <Link 
      href={href}
      className="social-link text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 text-sm"
      target={(href.startsWith('http') || href.startsWith('mailto') || forceNewTab) ? '_blank' : undefined}
      rel={(href.startsWith('http') || forceNewTab) ? 'noopener noreferrer' : undefined}
    >
      {icon}
      {label}
    </Link>
  )
}

// Social Icons
function LinkedInIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
}
