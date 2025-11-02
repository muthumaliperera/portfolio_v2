import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import LoadingPage from './components/LoadingPage'
import Work from './components/Work'
import SampleWork from './components/SampleWork'
import WorkProcess from './components/WorkProcess'
import AboutMe from './components/AboutMe'

type View = 'hero' | 'work' | 'sampleWork' | 'workProcess' | 'aboutMe'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHorizontalTransition, setIsHorizontalTransition] = useState(false)
  
  const pages: View[] = ['hero', 'work', 'sampleWork', 'workProcess', 'aboutMe']

  useEffect(() => {
    // Hide loading page after 7 seconds (3s Hello + 1s gap + 3s blocks)
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (targetView: View) => {
    const targetIndex = pages.indexOf(targetView)
    if (targetIndex === currentPageIndex || isAnimating) return
    
    // Check if this is a horizontal transition (work <-> sampleWork)
    const isHorizontal = (currentPageIndex === 1 && targetIndex === 2) || 
                        (currentPageIndex === 2 && targetIndex === 1)
    
    setIsAnimating(true)
    setIsHorizontalTransition(isHorizontal)
    setCurrentPageIndex(targetIndex)
    
    // Reset animation state after transition completes (0.7 seconds)
    setTimeout(() => {
      setIsAnimating(false)
      setIsHorizontalTransition(false)
    }, 700)
  }

  const getSectionTransform = (pageIndex: number) => {
    // Handle horizontal transitions ONLY for work <-> sampleWork (pages 1 and 2)
    // AND only when we're actually transitioning between them
    if (isHorizontalTransition && (pageIndex === 1 || pageIndex === 2)) {
      if (pageIndex === currentPageIndex) {
        return 'translateX(0)'
      } else if (pageIndex < currentPageIndex) {
        return 'translateX(-100%)'
      } else {
        return 'translateX(100%)'
      }
    }
    
    // For Work page when NOT in horizontal transition:
    // Use normal vertical positioning for all other navigation
    if (pageIndex === 1 && !isHorizontalTransition) {
      if (pageIndex === currentPageIndex) {
        return 'translateY(0)'
      } else if (pageIndex < currentPageIndex) {
        return 'translateY(-100vh)'
      } else {
        return 'translateY(100vh)'
      }
    }
    
    // For SampleWork page when NOT in horizontal transition:
    // Keep it positioned horizontally (off-screen to the right) so it doesn't interfere with vertical navigation
    if (pageIndex === 2 && !isHorizontalTransition) {
      if (pageIndex === currentPageIndex) {
        return 'translateX(0)'
      } else {
        return 'translateX(100%)'
      }
    }
    
    // Normal vertical transitions for all other pages (Hero, WorkProcess, AboutMe)
    if (pageIndex === currentPageIndex) {
      return 'translateY(0)'
    } else if (pageIndex < currentPageIndex) {
      return 'translateY(-100vh)'
    } else {
      return 'translateY(100vh)'
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Hero Section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{ 
          transform: getSectionTransform(0),
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      >
        <HeroSection onScrollDown={() => handleNavigation('work')} />
      </div>

      {/* Work Section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{ 
          transform: getSectionTransform(1),
          transitionTimingFunction: isHorizontalTransition ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      >
        <Work 
          onScrollUp={() => handleNavigation('hero')} 
          onScrollDown={() => handleNavigation('workProcess')}
          onNavigateToSamples={() => handleNavigation('sampleWork')}
        />
      </div>

      {/* SampleWork Section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{ 
          transform: getSectionTransform(2),
          transitionTimingFunction: isHorizontalTransition ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      >
        <SampleWork onBackToWork={() => handleNavigation('work')} />
      </div>

      {/* Work Process Section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{ 
          transform: getSectionTransform(3),
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      >
        <WorkProcess 
          onScrollUp={() => handleNavigation('work')} 
          onScrollDown={() => handleNavigation('aboutMe')}
        />
      </div>

      {/* About Me Section */}
      <div 
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{ 
          transform: getSectionTransform(4),
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      >
        <AboutMe 
          onScrollUp={() => handleNavigation('workProcess')} 
          onScrollHome={() => handleNavigation('hero')}
        />
      </div>

      {/* Loading page overlays on top */}
      {showLoading && <LoadingPage />}
    </div>
  )
}

export default App
