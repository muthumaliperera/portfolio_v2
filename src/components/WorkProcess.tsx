import React from "react";

type WorkProcessProps = {
  onScrollUp: () => void;
  onScrollDown?: () => void;
};

const steps = [
  {
    number: "01",
    title: "RESEARCH",
    description:
      "DIVING DEEP INTO USER BEHAVIOR, MARKET GAPS, AND BUSINESS GOALS. I DON'T ASSUME—I UNCOVER. EVERY INSIGHT BECOMES AMMUNITION FOR WHAT COMES NEXT.",
  },
  {
    number: "02",
    title: "PLAN",
    description:
      "TRANSFORMING DATA INTO DIRECTION. MAPPING USER JOURNEYS, DEFINING PROBLEMS WORTH SOLVING, AND ARCHITECTING SOLUTIONS THAT DON'T JUST WORK—THEY RESONATE.",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "WHERE STRATEGY TAKES FORM. CRAFTING INTERFACES THAT FEEL INTUITIVE, LOOK SHARP, AND CREATE EXPERIENCES USERS DON'T JUST USE—THEY REMEMBER.",
  },
];

const WorkProcess: React.FC<WorkProcessProps> = ({
  onScrollUp,
  onScrollDown,
}) => {
  const itemRefs = React.useRef<HTMLDivElement[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full min-h-screen bg-black text-white">
      <div className="w-full px-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {steps.map((s, i) => (
          <div
            key={s.number}
            ref={(el) => {
              if (el) itemRefs.current[i] = el;
            }}
            className="reveal rounded-md relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, #0F0F0F 0%, rgba(0,0,0,0) 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="px-5 sm:px-6 pt-8 pb-10">
              <div className="font-afacad text-6xl sm:text-7xl font-semibold select-none">
                {s.number}
              </div>
              <div className="mt-3 font-afacad text-5xl sm:text-6xl font-extrabold tracking-tight">
                {s.title}
              </div>
              <p className="mt-6 font-agdasima text-2xl leading-7 tracking-wide opacity-90">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Full width image below steps - visible on md and above */}
      <div className="hidden md:block w-full mt-8">
        <img
          src="/images/process.JPG"
          alt="Work Process"
          className="w-full h-auto object-fill"
        />
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex justify-end items-end mx-5"
        style={{ marginBottom: "55px" }}
      >
        <div className="flex gap-6">
          <button
            type="button"
            onClick={onScrollUp}
            aria-label="Back to work"
            className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none"
          >
            <img
              src="/images/arrow-up.png"
              alt="Up"
              className="w-12 h-12 cursor-pointer select-none"
              draggable={false}
            />
          </button>
          {onScrollDown && (
            <button
              type="button"
              onClick={onScrollDown}
              aria-label="Next section"
              className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none opacity-80 hover:opacity-100"
            >
              <img
                src="/images/arrow-down.png"
                alt="Down"
                className="w-12 h-12 cursor-pointer select-none"
                draggable={false}
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
