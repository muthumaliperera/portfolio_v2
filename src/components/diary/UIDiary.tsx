import type { DiaryEntry } from "./diaryData";
import { diaryEntries } from "./diaryData";

type UIDiaryProps = {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onOpenEntry?: (entry: DiaryEntry) => void;
};

export default function UIDiary({
  onScrollUp,
  onScrollDown,
  onOpenEntry,
}: UIDiaryProps) {
  return (
    <section className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="pt-10 sm:pt-14 lg:pt-8 shrink-0"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <div className="flex items-end justify-between">
          <h1
            className="font-afacad font-bold leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(72px, 11vw, 160px)" }}
          >
            Incoming..
          </h1>
          <p className="font-agdasima text-white/40 text-xl tracking-widest mb-3"></p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10 shrink-0" />

      {/* Entry list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        {diaryEntries.map((entry, i) => (
          <div key={i}>
            <div
              className="py-8 sm:py-10 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 group cursor-pointer"
              onClick={() => onOpenEntry?.(entry)}
            >
              {/* Date */}
              <div className="flex sm:flex-col gap-4 sm:gap-2 sm:w-48 shrink-0">
                <span className="font-agdasima text-white/40 text-lg tracking-widest">
                  {entry.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-afacad text-3xl sm:text-4xl font-semibold leading-tight mb-2 group-hover:underline underline-offset-4 transition-all">
                  {entry.title}
                </h2>
                <p className="font-agdasima text-white/50 text-xl leading-relaxed">
                  {entry.subtitle}
                </p>
              </div>

              {/* Arrow */}
              <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                <span className="text-3xl">↗</span>
              </div>
            </div>
            <div className="h-px w-full bg-white/10" />
          </div>
        ))}
      </div>

      {/* Bottom nav arrows */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex justify-between items-end mx-5"
        style={{ marginBottom: "55px", pointerEvents: "none" }}
      >
        <div className="w-1/2" />
        <div className="flex gap-6" style={{ pointerEvents: "auto" }}>
          <button
            type="button"
            onClick={onScrollUp}
            className="text-white transition-transform hover:translate-y-1 outline-none"
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
            className="text-white transition-transform hover:translate-y-1 outline-none opacity-80 hover:opacity-100"
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
