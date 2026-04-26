import { useEffect, useState } from "react";

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

type NavbarProps = {
  onNavigate: (view: View) => void;
  currentView: View;
};

const navItems: { label: string; view: View }[] = [
  { label: "WORK", view: "work" },
  { label: "FEATURED", view: "sampleWork" },
  { label: "PROCESS", view: "workProcess" },
  { label: "BLOG", view: "blog" },
  //  { label: "UI DIARY", view: "uiDiary" },
  { label: "ABOUT", view: "aboutMe" },
];

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (isOpen) e.stopPropagation();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { capture: true });
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll, { capture: true });
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll, { capture: true });
    };
  }, [isOpen]);

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button - always visible */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed top-7 right-8 z-[200] flex flex-col justify-center items-end gap-[6px] group"
        aria-label="Toggle menu"
        style={{ pointerEvents: "auto" }}
      >
        <span
          className="block h-px bg-white transition-all duration-500 ease-in-out"
          style={{
            width: "28px",
            transform: isOpen ? "translateY(9px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-300"
          style={{
            width: "18px",
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "translateX(10px)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-500 ease-in-out"
          style={{
            width: isOpen ? "28px" : "24px",
            transform: isOpen ? "translateY(-9px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Full screen overlay menu */}
      <div
        className="fixed inset-0 z-[150] flex flex-col justify-end"
        style={{
          backgroundColor: "rgba(0,0,0,0.96)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: isOpen
            ? "circle(200% at calc(100% - 52px) 44px)"
            : "circle(0% at calc(100% - 52px) 44px)",
          transition:
            "clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s ease",
        }}
      >
        {/* Subtle grid lines matching hero */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ margin: "20px" }}
        >
          {[0, 20, 40, 60, 80].map((left) => (
            <div
              key={left}
              className="absolute w-px h-full bg-white"
              style={{ left: `${left}%` }}
            />
          ))}
          <div className="absolute w-px h-full bg-white" style={{ right: 0 }} />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-10 pb-24 gap-12">
          {navItems.map(({ label, view }, i) => (
            <button
              key={view}
              onClick={() => handleNavigate(view)}
              className="group flex items-end gap-6 w-fit text-left"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <span className="font-agdasima text-white/20 text-lg w-6 tabular-nums">
                0{i + 1}
              </span>
              <span
                className="font-buljirya text-white leading-none tracking-tight"
                style={{
                  fontSize: "clamp(24px, 5.5vw, 74px)",
                  WebkitTextStroke:
                    currentView === view ? "0px" : "1px rgba(255,255,255,0.3)",
                  color: currentView === view ? "white" : "transparent",
                  transition: "color 0.3s ease, -webkit-text-stroke 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentView !== view) {
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.webkitTextStroke =
                      "0px";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== view) {
                    (e.currentTarget as HTMLElement).style.color =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.webkitTextStroke =
                      "1px rgba(255,255,255,0.3)";
                  }
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom strip */}
        <div className="absolute bottom-8 left-10 flex items-center gap-8">
          <span className="font-agdasima text-white/30 text-lg tracking-widest">
            WASANA PERERA
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="font-agdasima text-white/30 text-lg tracking-widest">
            UI/UX DESIGNER
          </span>
        </div>
      </div>
    </>
  );
}
