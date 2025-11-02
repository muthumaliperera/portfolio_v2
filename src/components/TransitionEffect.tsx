import React, { useEffect, useState } from "react";

const TransitionEffect: React.FC = () => {
  const [blocks, setBlocks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: 'black' | 'white';
    delay: number;
  }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Generate random geometric blocks
    const generateBlocks = () => {
      const newBlocks = [];
      const blockCount = 12;
      
      for (let i = 0; i < blockCount; i++) {
        newBlocks.push({
          id: i,
          x: Math.random() * 70, // Keep within bounds
          y: Math.random() * 70,
          width: 25 + Math.random() * 35, // 25-60%
          height: 25 + Math.random() * 35, // 25-60%
          color: (Math.random() > 0.5 ? 'black' : 'white') as 'black' | 'white',
          delay: Math.random() * 1000, // 0-1s delay
        });
      }
      setBlocks(newBlocks);
    };

    generateBlocks();

    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-40">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`absolute transition-all duration-1000 ease-out ${
            isAnimating ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: `${block.width}%`,
            height: `${block.height}%`,
            backgroundColor: block.color,
            transitionDelay: `${block.delay}ms`,
          }}
        >
          {/* Speckled effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${
                block.color === 'black' ? 'white' : 'black'
              } 1px, transparent 1px)`,
              backgroundSize: '8px 8px',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TransitionEffect;