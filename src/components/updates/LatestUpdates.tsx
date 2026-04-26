import { latestUpdates } from "./updateData";
import { resolveUpdates } from "./updateResolver";

type LatestUpdatesProps = {
  onNavigate: (view: string, id?: string) => void;
};

export default function LatestUpdates({ onNavigate }: LatestUpdatesProps) {
  const resolved = resolveUpdates(latestUpdates);

  return (
    <div
      className="fixed top-6 left-1/2 max-w-8xl z-[100] flex flex-col sm:flex-row gap-3 justify-center  "
      style={{ transform: "translateX(-50%)", pointerEvents: "auto" }}
    >
      {resolved.map((item, i) => (
        <button
          key={i}
          onClick={() => onNavigate(item.navigateTo, item.entryId)}
          className="group flex items-center gap-3 bg-black/80 border border-white/10 backdrop-blur-md px-3 py-2 hover:border-white/30 transition-all duration-300 sm:w-1/2 w-full "
        >
          <div
            className="shrink-0 overflow-hidden bg-white/5"
            style={{ width: 100, height: 64 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col items-start text-left overflow-hidden">
            <span className="font-agdasima text-white/60 text-s tracking-widest">
              {item.typeLabel}
            </span>
            <span className="font-afacad text-white text-s font-semibold leading-tight truncate w-full group-hover:underline underline-offset-2">
              {item.title}
            </span>
            <span className="font-agdasima text-white/60 text-s mt-0.5">
              {item.date}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
