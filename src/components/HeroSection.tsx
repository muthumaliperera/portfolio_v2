import React, { useEffect, useState } from "react";
import LatestUpdates from "./updates/LatestUpdates";

type HeroSectionProps = {
  onScrollDown?: () => void;
  onNavigate?: (view: string, id?: string) => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollDown,
  onNavigate,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setGlitchKey((prev) => prev + 1);
    setTimeout(() => setIsGlitching(false), 200);
  };

  useEffect(() => {
    const scheduleNextGlitch = () => {
      const randomDelay = Math.random() * 2000 + 3000;
      setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, randomDelay);
    };

    const initialDelay = Math.random() * 2000 + 3000;
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
      scheduleNextGlitch();
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, []);

  const generateGridCells = () => {
    const cells = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        cells.push(
          <div
            key={`cell-${row}-${col}`}
            className="absolute transition-all duration-200 ease-out hover:duration-300"
            style={{
              left: `${col * 20}%`,
              top: `${row * 25}%`,
              width: "20%",
              height: "25%",
              backgroundColor: "transparent",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          />,
        );
      }
    }
    return cells;
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden z-[1]">
      {/* Latest Updates popup */}
      {onNavigate && <LatestUpdates onNavigate={onNavigate} />}

      {/* Grid cell hover layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ margin: "20px", zIndex: 25 }}
      >
        {generateGridCells()}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{ margin: "20px", zIndex: 20 }}>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "0px" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "20%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "40%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "60%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "80%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ right: "0px" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "0px" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "25%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "50%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "75%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ bottom: "0px" }}
        ></div>
      </div>

      {/* Transparent box overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.07)", zIndex: 30 }}
      />

      {/* Grid box fills */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ margin: "20px", zIndex: 40 }}
      >
        {/* Portrait — 2nd row, 3rd column */}
        <div
          className="absolute overflow-hidden hidden sm:block"
          style={{ left: "40%", top: "25%", width: "20%", height: "25%" }}
        >
          <img
            src="/images/hero_img.svg"
            alt="Wasana Perera"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Portrait — 3rd row, 3rd column */}
        <div
          className="absolute overflow-hidden sm:hidden"
          style={{ left: "40%", top: "40%", width: "20%", height: "25%" }}
        >
          <img
            src="/images/hero_img.svg"
            alt="Wasana Perera"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2nd column, 1st row */}
        <div
          className="absolute"
          style={{
            left: "20%",
            top: "0%",
            width: "20%",
            height: "25%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* 4th column, 1st row */}
        <div
          className="absolute"
          style={{
            left: "60%",
            top: "0%",
            width: "20%",
            height: "25%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* 5th column, 3rd row */}
        <div
          className="absolute"
          style={{
            left: "80%",
            top: "50%",
            width: "20%",
            height: "25%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative h-screen flex flex-col pointer-events-none"
        style={{ margin: "20px", zIndex: 50 }}
      >
        {/* Center — Name and Portrait */}
        <div className="flex items-center justify-center relative flex-1 top-28 sm:top-0">
          <div
            className="flex flex-col items-center sm:items-end justify-center relative gap-10"
            style={{ transform: "translateY(80%)" }}
          >
            <p
              key={glitchKey}
              className={`text-3xl md:text-4xl lg:text-5xl font-agdasima text-white z-20 relative ${isGlitching ? "glitch-active" : ""}`}
              style={{
                transformOrigin: "center",
                transition: isGlitching ? "none" : "all 0.1s ease-out",
              }}
            >
              UI/UX DESIGNER
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-buljirya text-white leading-none text-center relative z-10 whitespace-nowrap tracking-tighter">
              WASANA PERERA
            </h1>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex justify-between items-end ml-5"
          style={{ marginBottom: "55px", minHeight: "fit-content" }}
        >
          {/* Left — Tagline and Resume */}
          <div className="max-w-full">
            <div className="w-2/3">
              <p className="text-white font-afacad text-xl md:text-3xl lg:text-4xl mb-4 leading-relaxed">
                NO PIXEL WITHOUT PURPOSE, CRAFTED INTERFACE LANGUAGE THAT
                RESONATES.
              </p>
              <button
                className="border-2 border-white px-10 py-4 rounded-sm font-afacad text-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3 text-xl font-semibold pointer-events-auto"
                onClick={() =>
                  window.open(
                    "/Wasana Perera - Associate UI Designer_fig.pdf",
                    "_blank",
                  )
                }
              >
                RESUME
                <span className="text-2xl">↗</span>
              </button>
            </div>
          </div>
          <div className="w-24 flex justify-end">
            {/* Right — Scroll arrow */}
            <button
              type="button"
              onClick={onScrollDown}
              aria-label="Go to work section"
              className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none pointer-events-auto"
            >
              <img
                src="/images/arrow-down.png"
                alt="Scroll down"
                className="w-12 h-12 cursor-pointer select-none"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
