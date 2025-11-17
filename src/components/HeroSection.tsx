import React, { useEffect, useState } from "react";

type HeroSectionProps = {
  onScrollDown?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  // Glitch effect state
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);

  // Glitch effect function
  const triggerGlitch = () => {
    setIsGlitching(true);
    setGlitchKey((prev) => prev + 1);

    // Reset glitch after 200ms
    setTimeout(() => {
      setIsGlitching(false);
    }, 200);
  };

  // Set up recurring glitch intervals
  useEffect(() => {
    const scheduleNextGlitch = () => {
      const randomDelay = Math.random() * 2000 + 3000; // 3-5 seconds
      setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch(); // Schedule next glitch
      }, randomDelay);
    };

    // Start first glitch after initial delay
    const initialDelay = Math.random() * 2000 + 3000; // 3-5 seconds
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
      scheduleNextGlitch();
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  // Generate grid cells for hover effect
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
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden z-[1]">
      {/* Grid cell hover layer - positioned before grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ margin: "20px", zIndex: 25 }}
      >
        {generateGridCells()}
      </div>

      {/* Grid overlay - 5 columns, 4 rows with 20px margin */}
      <div className="absolute inset-0" style={{ margin: "20px", zIndex: 20 }}>
        {/* Vertical lines - 6 lines for 5 columns */}
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

        {/* Horizontal lines - 5 lines for 4 rows */}
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
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.07)",
          zIndex: 30,
        }}
      />

      {/* Grid box fills */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ margin: "20px", zIndex: 40 }}
      >
        {/* Portrait in 2nd row, 3rd column (center box) */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "40%", // Start of 3rd column
            top: "25%", // Start of 2nd row
            width: "20%", // Width of one column
            height: "25%", // Height of one row
          }}
        >
          <img
            src="/images/hero_img.svg"
            alt="Wasana Perera"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2nd column, 1st row box */}
        <div
          className="absolute"
          style={{
            left: "20%", // Start of 2nd column
            top: "0%", // Start of 1st row
            width: "20%", // Width of one column
            height: "25%", // Height of one row
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        ></div>

        {/* 4th column, 1st row box */}
        <div
          className="absolute"
          style={{
            left: "60%", // Start of 4th column
            top: "0%", // Start of 1st row
            width: "20%", // Width of one column
            height: "25%", // Height of one row
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        ></div>

        {/* 5th column, 3rd row box */}
        <div
          className="absolute"
          style={{
            left: "80%", // Start of 5th column
            top: "50%", // Start of 3rd row
            width: "20%", // Width of one column
            height: "25%", // Height of one row
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        ></div>
      </div>

      {/* Main content container with 20px margin - no scroll */}
      <div
        className="relative h-screen flex flex-col pointer-events-none"
        style={{ margin: "20px", zIndex: 50 }}
      >
        {/* Center section - Name and Portrait */}
        <div className="flex items-center justify-center relative flex-1">
          <div
            className="flex flex-col items-center sm:items-end justify-center relative gap-10"
            style={{ transform: "translateY(80%)" }}
          >
            {/* UI/UX DESIGNER text with glitch effect */}
            <p
              key={glitchKey}
              className={`text-3xl md:text-4xl lg:text-5xl font-agdasima text-white z-20 relative ${
                isGlitching ? "glitch-active" : ""
              }`}
              style={{
                transformOrigin: "center",
                transition: isGlitching ? "none" : "all 0.1s ease-out",
              }}
            >
              UI/UX DESIGNER
            </p>

            {/* WASANA PERERA text - centered and responsive */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-buljirya text-white leading-none text-center relative z-10 whitespace-nowrap tracking-tighter">
              WASANA PERERA
            </h1>
          </div>
        </div>

        {/* Bottom section - positioned at bottom with proper margins */}
        <div
          className="flex justify-between items-end mx-5"
          style={{
            marginBottom: "55px",
            minHeight: "fit-content",
          }}
        >
          {/* Left side - Tagline and Resume button */}
          <div className="max-w-full">
            <p className="text-white font-agdasima text-2xl md:text-3xl lg:text-4xl mb-4 leading-relaxed">
              NO PIXEL WITHOUT PURPOSE, CRAFTED INTERFACE LANGUAGE
              <br />
              THAT RESONATES.
            </p>
            <button
              className="border-2 border-white px-10 py-4 rounded-sm font-afacad text-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3 text-xl font-semibold pointer-events-auto"
              onClick={() =>
                window.open(
                  "/Wasana Perera - Associate UI Designer_fig.pdf",
                  "_blank"
                )
              }
            >
              RESUME
              <span className="text-2xl">↗</span>
            </button>
          </div>

          {/* Right side - Scroll arrow */}
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
  );
};

export default HeroSection;
