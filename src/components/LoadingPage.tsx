import React, { useEffect, useMemo, useState } from "react";

const LoadingPage: React.FC = () => {
  const [showBlocks] = useState(true);
  const [hideBlocks, setHideBlocks] = useState(false);
  const [hideHello, setHideHello] = useState(false);
  const [showHello, setShowHello] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Start Hello fade animation after 3 seconds
    const helloTimer = setTimeout(() => {
      setHideHello(true);
    }, 3000);

    // Completely remove Hello text after fade completes (3.5s)
    const removeHelloTimer = setTimeout(() => {
      setShowHello(false);
    }, 3500);

    // Start block falling animation after 3.5 seconds (immediately when Hello is gone)
    const startTimer = setTimeout(() => {
      setHideBlocks(true);
    }, 3500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(helloTimer);
      clearTimeout(removeHelloTimer);
    };
  }, []);

  // Glitch effect during 3-second wait
  useEffect(() => {
    const glitchTimes = [500, 1000, 1500, 2000]; // Glitch times: 0.5s, 1s, 1.5s, 2s
    const glitchTimers: number[] = [];

    glitchTimes.forEach((time) => {
      const timer = setTimeout(() => {
        // Generate random glitch offset
        const xOffset = (Math.random() - 0.5) * 16; // ±8px
        const yOffset = (Math.random() - 0.5) * 10; // ±5px
        
        setGlitchOffset({ x: xOffset, y: yOffset });
        setIsGlitching(true);

        // Reset glitch after 100ms
        setTimeout(() => {
          setIsGlitching(false);
          setGlitchOffset({ x: 0, y: 0 });
        }, 100);
      }, time);

      glitchTimers.push(timer);
    });

    return () => {
      glitchTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Specific gray shade colors
  const grayShades = [
    "#161618",
    "#111111", 
    "#131316",
    "#181818",
    "#1c1c1c",
    "#141416",
    "#131314",
    "#121212",
    "#0f0f0f",
    "#141414",
  ];

  // Generate exactly 100 square blocks in 10x10 grid
  const blocks = useMemo(() => {
    const generatedBlocks = [];
    const gridSize = 10; // 10x10 grid
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Calculate position (10% increments)
        const x = col * 10; // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
        const y = row * 10; // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
        
        // Row-based stagger: top rows fall first, bottom rows fall last
        const staggerDelay = row * 50; // 50ms per row (0-450ms)
        
        // Random gray shade
        const color = grayShades[Math.floor(Math.random() * grayShades.length)];
        
        // Random rotation for tumbling effect (-360 to 360 degrees)
        const rotation = (Math.random() - 0.5) * 720;
        
        // Random horizontal drift (-5vw to +5vw)
        const horizontalDrift = (Math.random() - 0.5) * 10;
        
        // Random fall speed variation (2.0-3.0 seconds)
        const fallDuration = Math.random() * 1000 + 2000; // 2000-3000ms
        
        // Target position: falls straight down off screen
        const targetY = 120; // 100vh + 20vh off screen
        const targetX = x + horizontalDrift;
        
        generatedBlocks.push({
          id: `${row}-${col}`,
          x,
          y,
          w: 10, // 10% width
          h: 10, // 10% height
          color,
          rotation,
          staggerDelay,
          targetX,
          targetY,
          fallDuration,
          horizontalDrift,
          row
        });
      }
    }
    
    // Sort by row for cascading effect (top to bottom)
    return generatedBlocks.sort((a, b) => a.row - b.row);
  }, []);

  return (
    <div className="fixed inset-0 z-[5000]">
      {/* 100 square blocks with falling glass animation */}
      {showBlocks && (
        <>
          {blocks.map((block) => (
            <div
              key={block.id}
              className={`absolute transition-all ease-in ${
                hideBlocks ? "opacity-0" : "opacity-100"
              }`}
              style={{
                left: `${block.x}%`,
                top: `${block.y}%`,
                width: `${block.w}%`,
                height: `${block.h}%`,
                backgroundColor: block.color,
                transformOrigin: "center center",
                transitionDelay: `${block.staggerDelay}ms`,
                transitionDuration: `${block.fallDuration}ms`,
                zIndex: 1000,
                transform: hideBlocks
                  ? `translate(${block.horizontalDrift}vw, ${block.targetY}vh) rotate(${block.rotation}deg)`
                  : `translate(0vw, 0vh) rotate(0deg)`,
                transitionTimingFunction: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
              }}
            >
              {/* Subtle texture overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "8px 8px",
                }}
              />
            </div>
          ))}
        </>
      )}

      {/* Hello text - top layer with glitch and falling motion */}
      {showHello && (
        <div className="flex items-center justify-center h-full relative z-[2000]">
          <div
            className={`text-white text-6xl md:text-8xl lg:text-9xl font-buljirya transition-all duration-500 ease-in-out ${
              hideHello ? "opacity-0 translate-y-[50px]" : "opacity-100 translate-y-0"
            }`}
            style={{
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px) ${
                isGlitching ? `skewX(${(Math.random() - 0.5) * 4}deg)` : 'skewX(0deg)'
              }`,
              opacity: isGlitching ? 0.7 : (hideHello ? 0 : 1),
              textShadow: isGlitching 
                ? `2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px rgba(255,0,0,0.5)`
                : 'none',
              transition: isGlitching 
                ? 'none' 
                : 'all 0.5s ease-in-out',
            }}
          >
            Hello
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;