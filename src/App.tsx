import { useEffect, useRef, useState } from "react";
import AboutMe from "./components/AboutMe";
import Blog from "./components/blog/Blog";
import type { BlogPost as BlogPostType } from "./components/blog/blogData";
import { posts } from "./components/blog/blogData";
import BlogTemplate from "./components/blog/BlogTemplate";
import type { DiaryEntry as DiaryEntryType } from "./components/diary/diaryData";
import { diaryEntries } from "./components/diary/diaryData";
import DiaryTemplate from "./components/diary/DiaryTemplate";
import UIDiary from "./components/diary/UIDiary";
import HeroSection from "./components/HeroSection";
import LoadingPage from "./components/LoadingPage";
import Navbar from "./components/Navbar";
import SampleWork from "./components/SampleWork";
import Work from "./components/Work";
import WorkProcess from "./components/WorkProcess";

type View =
  | "hero"
  | "work"
  | "sampleWork"
  | "workProcess"
  | "aboutMe"
  | "blog"
  | "uiDiary"
  | "blogPost"
  | "diaryEntry";

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntryType | null>(
    null,
  );

  const currentPageIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const showLoadingRef = useRef(true);

  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);
  useEffect(() => {
    showLoadingRef.current = showLoading;
  }, [showLoading]);

  // index map:
  // 0 hero | 1 work | 2 sampleWork | 3 workProcess
  // 4 aboutMe | 5 blog | 6 uiDiary
  // 7 blogPost (overlay over blog)
  // 8 diaryEntry (overlay over uiDiary)
  const pages: View[] = [
    "hero", // 0
    "work", // 1
    "sampleWork", // 2
    "workProcess", // 3
    "aboutMe", // 4
    "blog", // 5
    "uiDiary", // 6
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (targetView: View) => {
    if (isAnimatingRef.current) return;

    if (targetView === "blogPost") {
      setIsAnimating(true);
      isAnimatingRef.current = true;
      setCurrentPageIndex(7);
      currentPageIndexRef.current = 7;
      setTimeout(() => {
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }, 700);
      return;
    }

    if (targetView === "diaryEntry") {
      setIsAnimating(true);
      isAnimatingRef.current = true;
      setCurrentPageIndex(8);
      currentPageIndexRef.current = 8;
      setTimeout(() => {
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }, 700);
      return;
    }

    const targetIndex = pages.indexOf(targetView);
    if (targetIndex === currentPageIndexRef.current) return;

    setIsAnimating(true);
    isAnimatingRef.current = true;
    setCurrentPageIndex(targetIndex);
    currentPageIndexRef.current = targetIndex;

    setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, 700);
  };

  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThreshold = 1000;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current || showLoadingRef.current) return;
      if (currentPageIndexRef.current === 2) return; // sampleWork overlay
      if (currentPageIndexRef.current === 7) return; // blogPost overlay
      if (currentPageIndexRef.current === 8) return; // diaryEntry overlay

      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        // hero → work → workProcess → blog → uiDiary → aboutMe
        if (currentPageIndexRef.current === 0) {
          handleNavigation("work");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 1) {
          handleNavigation("workProcess");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 3) {
          handleNavigation("blog");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 5) {
          handleNavigation("uiDiary");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 6) {
          handleNavigation("aboutMe");
          lastScrollTime = now;
        }
      } else if (isScrollingUp) {
        // aboutMe → uiDiary → blog → workProcess → work → hero
        if (currentPageIndexRef.current === 4) {
          handleNavigation("uiDiary");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 6) {
          handleNavigation("blog");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 5) {
          handleNavigation("workProcess");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 3) {
          handleNavigation("work");
          lastScrollTime = now;
        } else if (currentPageIndexRef.current === 1) {
          handleNavigation("hero");
          lastScrollTime = now;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const getSectionTransform = (pageIndex: number) => {
    // blogPost — overlay, slides in from right over blog
    if (pageIndex === 7) {
      if (currentPageIndex === 7) return "translateX(0)";
      else return "translateX(100%)";
    }

    // diaryEntry — overlay, slides in from right over uiDiary
    if (pageIndex === 8) {
      if (currentPageIndex === 8) return "translateX(0)";
      else return "translateX(100%)";
    }

    // sampleWork — overlay, slides in from right over work
    if (pageIndex === 2) {
      if (currentPageIndex === 2) return "translateX(0)";
      else return "translateX(100%)";
    }

    // work — freeze when sampleWork is active
    if (pageIndex === 1) {
      if (currentPageIndex === 1 || currentPageIndex === 2)
        return "translateY(0)";
      else if (currentPageIndex < 1) return "translateY(100vh)";
      else return "translateY(-100vh)";
    }

    // Visual scroll order: 0(hero) 1(work) 3(workProcess) 5(blog) 6(uiDiary) 4(aboutMe)
    const visualOrder: Record<number, number> = {
      0: 0, // hero
      1: 1, // work
      2: 1, // sampleWork — same visual slot as work
      3: 2, // workProcess
      5: 3, // blog
      6: 4, // uiDiary
      4: 5, // aboutMe — visually last
      7: 3, // blogPost — same visual slot as blog
      8: 4, // diaryEntry — same visual slot as uiDiary
    };

    const myVisual = visualOrder[pageIndex] ?? pageIndex;
    const currentVisual = visualOrder[currentPageIndex] ?? currentPageIndex;

    // blog — freeze when blogPost is active
    if (pageIndex === 5) {
      if (currentPageIndex === 5 || currentPageIndex === 7)
        return "translateY(0)";
    }

    // uiDiary — freeze when diaryEntry is active
    if (pageIndex === 6) {
      if (currentPageIndex === 6 || currentPageIndex === 8)
        return "translateY(0)";
    }

    if (myVisual === currentVisual) return "translateY(0)";
    else if (myVisual < currentVisual) return "translateY(-100vh)";
    else return "translateY(100vh)";
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Hero — index 0 */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(0),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <HeroSection
          onScrollDown={() => handleNavigation("work")}
          onNavigate={(view, id) => {
            if (view === "blogPost" && id) {
              const post = posts.find((p) => p.id === id);
              if (post) setSelectedPost(post);
            }
            if (view === "diaryEntry" && id) {
              const entry = diaryEntries.find((e) => e.id === id);
              if (entry) setSelectedEntry(entry);
            }
            handleNavigation(view as View);
          }}
        />
      </div>

      {/* Work — index 1 */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(1),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <Work
          onScrollUp={() => handleNavigation("hero")}
          onScrollDown={() => handleNavigation("workProcess")}
          onNavigateToSamples={() => handleNavigation("sampleWork")}
        />
      </div>

      {/* SampleWork — index 2, overlay over Work */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(2),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <SampleWork onBackToWork={() => handleNavigation("work")} />
      </div>

      {/* WorkProcess — index 3 */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(3),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <WorkProcess
          onScrollUp={() => handleNavigation("work")}
          onScrollDown={() => handleNavigation("blog")}
        />
      </div>

      {/* AboutMe — index 4, last in scroll chain */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(4),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <AboutMe
          onScrollUp={() => handleNavigation("uiDiary")}
          onScrollHome={() => handleNavigation("hero")}
        />
      </div>

      {/* Blog — index 5 */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(5),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <Blog
          onScrollUp={() => handleNavigation("workProcess")}
          onScrollHome={() => handleNavigation("hero")}
          onOpenPost={(post) => {
            setSelectedPost(post);
            handleNavigation("blogPost");
          }}
        />
      </div>

      {/* UIDiary — index 6 */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(6),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <UIDiary
          onScrollUp={() => handleNavigation("blog")}
          onScrollDown={() => handleNavigation("aboutMe")}
          onOpenEntry={(entry) => {
            setSelectedEntry(entry);
            handleNavigation("diaryEntry");
          }}
        />
      </div>

      {/* BlogPost — index 7, overlay over Blog */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(7),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {selectedPost && (
          <BlogTemplate
            post={selectedPost}
            onBack={() => handleNavigation("blog")}
            onNavigate={(post) => setSelectedPost(post)}
          />
        )}
      </div>

      {/* DiaryEntry — index 8, overlay over UIDiary */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-transform duration-700"
        style={{
          transform: getSectionTransform(8),
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {selectedEntry && (
          <DiaryTemplate
            entry={selectedEntry}
            onBack={() => handleNavigation("uiDiary")}
          />
        )}
      </div>

      <Navbar
        onNavigate={handleNavigation}
        currentView={pages[currentPageIndex] ?? "hero"}
      />

      {showLoading && <LoadingPage />}
    </div>
  );
}

export default App;
