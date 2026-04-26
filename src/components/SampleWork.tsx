import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  desc: string;
  category: "real" | "samples" | "pitch" | "graphics";
  images: string[]; // placeholder image URLs or paths
  scroll?: string[]; // optional images shown as scrollable inside viewer
};

type SampleWorkProps = {
  onBackToWork: () => void;
};

const SAMPLE: Project[] = [
  {
    id: "p1",
    title: "BrightMinds Academy",
    desc: "Education Institute in Sri Lanka.",
    category: "real",
    images: ["/images/ins1.svg", "/images/ins6.gif"],
    scroll: ["/images/insfull.svg"],
  },
  {
    id: "p2",
    title: "Fresh & Blend",
    desc: "Healthy Smoothie Bar in Sri Lanka.",
    category: "real",
    images: ["/images/fr2.png", "/images/FreshBlendC.gif"],
    scroll: ["/images/fresh & blend full.svg"],
  },
  {
    id: "p3",
    title: "ELVYN DENIM",
    desc: "Concept sample screens.",
    category: "samples",
    images: ["/images/elvyn1.png", "/images/ELVYN.gif"],
    scroll: ["/images/elvyn_1440.svg"],
  },
  {
    id: "p4",
    title: "Monument Studios",
    desc: "Concept sample screens.",
    category: "samples",
    images: ["/images/std1.png", "/images/MonumentStudio.gif"],
    scroll: ["/images/full 1920.png", "/images/designsystemtemp.svg"],
  },
  {
    id: "p5",
    title: "Elvyn Dashboard",
    desc: "E-commerce Dashboard",
    category: "samples",
    images: ["/images/Elvyn_Dashboard.png", "/images/Elvyn_Dashboard2.png"],
  },
  {
    id: "p6",
    title: "Health Connect",
    desc: "Healthcare management mobile application",
    category: "samples",
    images: ["/images/HealthConnect1.jpg"],
    scroll: [
      "/images/HealthConnect - wireframes.png",
      "/images/HealthConnect - Design.png",
      "/images/HealthConnect2.svg",
    ],
  },
  {
    id: "p7",
    title: "Auto Track",
    desc: "A clean, responsive dashboard enabling small vehicle service businesses to manage vehicles, track payments, and understand daily operations quickly, easily.",
    category: "samples",
    images: ["/images/AutoTrack_cover (1).png"],
    scroll: ["/images/AutoTrack_Case Study.png"],
  },
  {
    id: "p8",
    title: "Car Care App",
    desc: "“CarCare” - Your Vehicle's Personal Assistant. A simple mobile app that keeps your car healthy and you stress-free. It tracks your vehicle's health, reminds you of upcoming maintenance, instantly decodes warning lights, and stores all your car documents in one place.",
    category: "samples",
    images: ["/images/CarCare_Cover.png"],
    scroll: ["/images/CarCareCase Study Template_ PixelPlay.png"],
  },
  // Graphic Design projects — add your own here
  {
    id: "g1",
    title: "BubblyCrumbs",
    desc: "Social Media Post Graphics",
    category: "graphics",
    images: [
      "/images/Graphic/BubblyCrumbs/Post 1 temp.png",
      "/images/Graphic/BubblyCrumbs/post2.png",
      "/images/Graphic/BubblyCrumbs/Post 3.png",
      "/images/Graphic/BubblyCrumbs/post 4.png",
    ],
  },
  {
    id: "g2",
    title: "TrustPay",
    desc: "Branding and Promotional Graphics",
    category: "graphics",
    images: ["/images/Graphic/TrustPay/Cover.png"],
    scroll: ["/images/Graphic/TrustPay/TrustPayScroll.png"],
  },
];

// Helper function to check if file is a video
function isVideo(src: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
}

type TabType = "uiux" | "graphics";

function Card({
  p,
  onOpen,
  square,
}: {
  p: Project;
  onOpen: (p: Project) => void;
  square?: boolean;
}) {
  const firstMedia = p.images && p.images[0];
  const isFirstVideo = firstMedia ? isVideo(firstMedia) : false;

  return (
    <article
      onClick={() => onOpen(p)}
      className="group cursor-pointer transition flex flex-col"
    >
      <div
        className={`${
          square ? "aspect-square" : "aspect-[16/9]"
        } w-full rounded-lg bg-white/10 mb-4 overflow-hidden`}
      >
        {firstMedia ? (
          isFirstVideo ? (
            <video
              src={firstMedia}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={firstMedia}
              alt={p.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/placeholders/1.jpg";
              }}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
      <p className="text-white/70 mt-1 text-sm line-clamp-2">{p.desc}</p>
    </article>
  );
}

function BottomViewer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const open = !!project;

  const slides = project
    ? [
        ...project.images,
        ...(project.scroll
          ? project.scroll.filter(
              (scrollImg) => !project.images.includes(scrollImg),
            )
          : []),
      ]
    : [];

  const total = slides.length;
  const src = slides[index] ?? "";
  const isScrollableShowcase = project?.scroll?.includes(src) ?? false;
  const isCurrentVideo = isVideo(src);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  function prev() {
    if (!project) return;
    setIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    if (!project) return;
    setIndex((i) => (i + 1) % total);
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[60] ${
        open ? "" : "hidden"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`pointer-events-auto absolute inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        className={`pointer-events-auto absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/10 bg-gradient-to-br from-black/80 to-emerald-900/20 backdrop-blur
        transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        } h-[100vh]`}
      >
        <div className="px-3 sm:px-5 lg:px-6 pt-5 pb-6 h-full flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
                {project?.title}
              </h2>
              <p className="text-white/70 mt-1">{project?.desc}</p>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 mr-20 rounded-full border border-white/20 hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="relative mt-6 flex-1 min-h-0">
            {total > 1 && (
              <button
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <img
                  src="/images/back.svg"
                  alt="Back"
                  className="w-10 h-10 bg-black/40 rounded-full hover:bg-white/10 duration-300"
                  draggable={false}
                />
              </button>
            )}
            <div className="mx-auto flex-1 h-full w-full px-0 sm:px-2 md:px-4 lg:px-6 max-w-none">
              <div
                className="h-full w-full rounded-2xl bg-black/20 flex items-center justify-center p-2 sm:p-3 relative"
                onClick={() =>
                  !isScrollableShowcase &&
                  !isCurrentVideo &&
                  total > 1 &&
                  next()
                }
                role={
                  !isScrollableShowcase && !isCurrentVideo
                    ? "button"
                    : undefined
                }
                aria-label={
                  !isScrollableShowcase && !isCurrentVideo
                    ? "Next image"
                    : undefined
                }
              >
                {src ? (
                  isCurrentVideo ? (
                    <video
                      src={src}
                      className="h-full w-auto object-contain bg-black"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : isScrollableShowcase ? (
                    <div
                      className="h-full w-full overflow-auto rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={src}
                        alt="project image"
                        className="w-full h-auto object-contain bg-black"
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute top-3 right-3 mt-36 mr-4 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs sm:text-sm">
                        Scroll to view
                      </div>
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt="project image"
                      className="h-full w-auto object-contain bg-black"
                      draggable={false}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    No Image
                  </div>
                )}
              </div>
            </div>
            {total > 1 && (
              <button
                aria-label="Next image"
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <img
                  src="/images/next.svg"
                  alt="next"
                  className="w-10 h-10 bg-black/40 rounded-full hover:bg-white/10 duration-300"
                  draggable={false}
                />
              </button>
            )}
            {total > 1 && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm">
                {index + 1} / {total}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SampleWork({ onBackToWork }: SampleWorkProps) {
  const [active, setActive] = useState<Project | null>(null);
  const [tab, setTab] = useState<TabType>("uiux");

  const uiuxProjects = SAMPLE.filter((p) => p.category !== "graphics");
  const graphicsProjects = SAMPLE.filter((p) => p.category === "graphics");
  const visibleProjects = tab === "uiux" ? uiuxProjects : graphicsProjects;

  return (
    <section className="w-full h-screen bg-black text-white relative">
      {/* Back Navigation Button */}
      <button
        onClick={onBackToWork}
        className="absolute top-8 left-8 z-50"
        aria-label="Back to Work"
      >
        <img
          src="/images/arrow-back.png"
          alt="Back"
          className="w-12 h-12 hover:bg-white/10 duration-300 rounded-full"
          draggable={false}
        />
      </button>

      {/* Main Content */}
      <main className="pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-8 h-full overflow-y-auto">
        <section className="w-full">
          {/* Title + Tabs Row */}
          <div className="mb-8">
            <div className="flex items-center gap-8 flex-wrap justify-between">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-afacad font-bold text-white leading-none">
                FEATURED WORK
              </h1>

              {/* Tabs */}
              <div className="flex items-center gap-1 mb-1 md:mb-2 lg:mb-3 bg-white/5 border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setTab("uiux")}
                  className={`px-4 py-1.5 rounded-full text-lg md:text-2xl lg:text-3xl font-medium transition-all duration-200 ${
                    tab === "uiux"
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  UI/UX Design
                </button>
                <button
                  onClick={() => setTab("graphics")}
                  className={`px-4 py-1.5 rounded-full text-lg md:text-2xl lg:text-3xl font-medium transition-all duration-200 ${
                    tab === "graphics"
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Graphic Design
                </button>
              </div>
            </div>
            <div className="h-px w-full bg-white opacity-10 mt-4"></div>
          </div>

          {/* Grid */}
          <div
            className={`mt-6 grid gap-6 ${
              tab === "graphics"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {visibleProjects.map((p) => (
              <Card
                key={p.id}
                p={p}
                onOpen={setActive}
                square={tab === "graphics"}
              />
            ))}
          </div>
        </section>

        {/* Bottom Viewer */}
        <BottomViewer project={active} onClose={() => setActive(null)} />
      </main>
    </section>
  );
}
