import { useRef } from "react";
import type { DiaryEntry } from "./diaryData";
import { diaryEntries } from "./diaryData";

type DiaryTemplateProps = {
  entry: DiaryEntry;
  onBack?: () => void;
};

export default function DiaryTemplate({ entry, onBack }: DiaryTemplateProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentIndex = diaryEntries.findIndex((e) => e.id === entry.id);
  const prevEntry = currentIndex > 0 ? diaryEntries[currentIndex - 1] : null;
  const nextEntry =
    currentIndex < diaryEntries.length - 1
      ? diaryEntries[currentIndex + 1]
      : null;

  return (
    <section className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="shrink-0 pt-8 pb-0"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="font-agdasima text-white/50 hover:text-white text-lg tracking-widest transition-colors duration-300"
          >
            ← BACK TO DIARY
          </button>
          <span className="font-agdasima text-white/30 text-lg tracking-widest">
            {entry.date}
          </span>
        </div>
        <div className="mt-4">
          <h1
            className="font-afacad font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
          >
            {entry.title}
          </h1>
          <p className="font-agdasima text-white/50 text-xl tracking-wide mt-1">
            {entry.subtitle}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10 mt-3 shrink-0" />

      {/* Photo gallery — 4:3, horizontal scroll */}
      <div
        ref={galleryRef}
        className="flex gap-4 overflow-x-auto no-scrollbar shrink-0 py-4"
        style={{
          marginLeft: 20,
          marginRight: 20,
          scrollSnapType: "x mandatory",
        }}
      >
        {entry.photos.map((src, i) => (
          <div
            key={i}
            className="shrink-0 rounded-xl overflow-hidden snap-start"
            style={{
              aspectRatio: "4/3",
              height: "clamp(120px, 18vh, 220px)",
              width: "auto",
            }}
          >
            <img
              src={src}
              alt={`${entry.title} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                (
                  e.currentTarget.parentElement as HTMLElement
                ).style.background = "rgba(255,255,255,0.05)";
              }}
            />
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-white/10 shrink-0" />

      {/* Paragraph + Quote */}
      <div
        className="flex-1 flex flex-col justify-between py-4 min-h-0"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <p className="font-agdasima text-white/70 text-xl leading-relaxed">
          {entry.paragraph}
        </p>
        <div className="border-l-2 border-white/20 pl-6 py-2 mb-2">
          <p
            className="font-buljirya text-white/60 leading-snug"
            style={{ fontSize: "clamp(16px, 2vw, 26px)" }}
          >
            "{entry.quote}"
          </p>
        </div>
      </div>

      {/* Prev / Next diary entries */}
      <div className="h-px w-full bg-white/10 shrink-0" />
      <div
        className="shrink-0 flex justify-between items-center py-4"
        style={{ marginLeft: 20, marginRight: 20, marginBottom: "20px" }}
      >
        {prevEntry ? (
          <button
            onClick={() => {
              /* handled by parent via onNavigate */
            }}
            className="group flex flex-col items-start opacity-50 cursor-not-allowed"
          >
            <span className="font-agdasima text-white/30 text-sm tracking-widest">
              ← PREVIOUS
            </span>
            <span className="font-afacad text-white text-lg font-semibold">
              {prevEntry.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex gap-2 items-center">
          {diaryEntries.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-white w-6 h-1.5"
                  : "bg-white/30 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>

        {nextEntry ? (
          <button
            onClick={() => {}}
            className="group flex flex-col items-end opacity-50 cursor-not-allowed"
          >
            <span className="font-agdasima text-white/30 text-sm tracking-widest">
              NEXT →
            </span>
            <span className="font-afacad text-white text-lg font-semibold">
              {nextEntry.title}
            </span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
