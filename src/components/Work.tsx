import React from "react";

type WorkProps = {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onNavigateToSamples?: () => void;
};

const projects = [
  {
    src: "/images/LB.gif",
    alt: "LanguageBee",
    linkto: "https://languagebee.ai/",
    title: "LanguageBee.ai",
  },
  {
    src: "/images/SinChin.gif",
    alt: "SinChin",
    title: "SinChin.lk",
    linkto: "https://sinchin.lk/",
  },
  {
    src: "/images/studioProjectss.svg",
    alt: "Studio Projects",
    title: "SOS Studio",
    linkto: "https://thespaceonestudio.com/",
  },
  {
    src: "/images/GetAJob_ProjectSS.svg",
    alt: "Get A Job",
    title: "get-jobai.com",
    linkto: "https://get-jobai.com/",
  },
];

export default function Work({
  onScrollUp,
  onScrollDown,
  onNavigateToSamples,
}: WorkProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  // Handle horizontal scroll with mouse wheel
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY + e.deltaX;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      if (container) {
        container.style.cursor = "grab";
        container.style.removeProperty("user-select");
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (container) {
        container.style.cursor = "grab";
        container.style.removeProperty("user-select");
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, scrollLeft, startX]);

  return (
    <section className="w-full bg-black text-white">
      {/* Top spacing distinct for heading/text block; side margins = 20px */}
      <div
        className="pt-10 sm:pt-14 lg:pt-5"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:justify-between ">
          <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 lg:gap-10">
            {/* Work heading - full width on mobile, auto width on sm+ */}
            <div className="w-full sm:w-auto">
              <h1
                className="font-afacad leading-none tracking-tight select-none"
                style={{ fontSize: "96px" }}
              >
                <span
                  className="hidden lg:block font-bold"
                  style={{ fontSize: "160px" }}
                >
                  WORK
                </span>
                <span className="lg:hidden font-bold">WORK</span>
              </h1>
            </div>

            {/* Highlights block - full width on mobile, auto width on sm+ */}
            <div className="mt-0 sm:mt-4 lg:mt-8 w-full sm:w-auto">
              <div className="inline-block rounded-full bg-white/10 px-5 py-1.5">
                <span className="font-agdasima tracking-wider text-2xl sm:text-2xl md:text-3xl">
                  HIGHLIGHTS
                </span>
              </div>
              <div className="mt-4 sm:mt-5 font-agdasima text-3xl  leading-snug opacity-90 space-y-1.5">
                <p>FROM 2024–2025 (1+ YEARS)</p>
                <p>
                  15+ PROJECTS COLLABORATED WITH{" "}
                  <span className="font-semibold">WISE SOFT LABS</span>
                </p>
              </div>
            </div>
          </div>

          {/* Samples subtitle */}

          <button
            onClick={onNavigateToSamples}
            className="mt-2 sm:mt-8 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer group border border-white px-4 py-2"
            style={{
              fontSize: "18px",
              fontWeight: "400",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            <span className="relative  flex items-center gap-1 ">
              SAMPLES
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out"></span>
              <span className="  duration-300">
                <img
                  src="/images/mynaui_arrow-up-right.svg"
                  alt="explore"
                  className="w-8 h-8 bg-black/40 rounded-full hover:bg-white/10  duration-300 "
                  draggable={false}
                />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="mt-6 sm:mt-8 lg:mt-4 h-px w-full bg-white/10" />

      {/* Projects horizontal scroll with its own margins */}
      <div className="w-full mt-6 sm:mt-8 mb-14 px-5">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar pb-4 cursor-grab active:cursor-grabbing"
        >
          <div
            className="inline-flex gap-5 lg:gap-6 w-max"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {projects.map((p) => (
              <div key={p.src} className="snap-start shrink-0">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    width: "min(90vw, 780px)",
                    height: "min(50.77vw, 420px)",
                  }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="mt-4">
                  <a
                    href={p.linkto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h3 className="font-agdasima text-2xl sm:text-3xl font-semibold">
                      {p.title}
                    </h3>
                    {p.linkto && (
                      <span className="font-agdasima text-lg sm:text-xl opacity-70 mt-1 block group-hover:underline">
                        {p.linkto}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section - positioned at bottom with proper margins */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex justify-between items-end mx-5"
        style={{
          marginBottom: "55px",
          minHeight: "fit-content",
          pointerEvents: "none",
        }}
      >
        {/* Empty div to balance the flex layout */}
        <div className="w-1/2"></div>

        {/* Arrow controls */}
        <div className="flex gap-6" style={{ pointerEvents: "auto" }}>
          <button
            type="button"
            onClick={onScrollUp}
            aria-label="Back to hero"
            className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none"
          >
            <img
              src="/images/arrow-up.png"
              alt="Up"
              className="w-12 h-12 cursor-pointer select-none"
              draggable={false}
            />
          </button>
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
        </div>
      </div>
    </section>
  );
}
