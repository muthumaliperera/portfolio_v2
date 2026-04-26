import { posts } from "../blog/blogData";
import { diaryEntries } from "../diary/diaryData";
import type { UpdateItem, UpdateType } from "./updateTypes";

type ItemRecord = { id: string; title: string; image: string; date: string };

const projectItems: ItemRecord[] = [
  { id: "LanguageBee.ai", title: "LanguageBee.ai", image: "/images/LB.gif", date: "2025" },
  { id: "SinChin.lk", title: "SinChin.lk", image: "/images/SinChin.gif", date: "2025" },
  { id: "SOS Studio", title: "SOS Studio", image: "/images/studioProjectss.svg", date: "2025" },
  { id: "get-jobai.com", title: "get-jobai.com", image: "/images/GetAJob_ProjectSS.svg", date: "2025" },
];

const featuredUIItems: ItemRecord[] = [];
const featuredGraphicItems: ItemRecord[] = [];

export type ResolvedUpdate = {
  type: UpdateType;
  typeLabel: string;
  title: string;
  image: string;
  date: string;
  navigateTo: string;
  entryId: string;
};

const typeLabels: Record<string, string> = {
  "project": "PROJECT",
  "featured-ui": "FEATURED UI",
  "featured-graphic": "FEATURED GRAPHIC",
  "blog": "BLOG",
  "ui-diary": "UI DIARY",
};

const typeNavigation: Record<string, string> = {
  "project": "work",
  "featured-ui": "sampleWork",
  "featured-graphic": "sampleWork",
  "blog": "blogPost",
  "ui-diary": "diaryEntry",
};

export function resolveUpdates(items: UpdateItem[]): ResolvedUpdate[] {
  return items.slice(0, 3).map((item) => {
    let title = "";
    let image = "";
    let date = "";

    if (item.type === "blog") {
      const post = posts.find((p) => p.id === item.id);
      title = post?.title ?? item.id;
      image = post?.image ?? "";
      date = post?.date ?? "";
    } else if (item.type === "ui-diary") {
      const entry = diaryEntries.find((e) => e.id === item.id);
      title = entry?.title ?? item.id;
      image = entry?.photos?.[0] ?? "";
      date = entry?.date ?? "";
    } else if (item.type === "project") {
      const project = projectItems.find((p) => p.id === item.id);
      title = project?.title ?? item.id;
      image = project?.image ?? "";
      date = project?.date ?? "";
    } else {
      const featured = featuredUIItems.find((p) => p.id === item.id)
        ?? featuredGraphicItems.find((p) => p.id === item.id);
      title = featured?.title ?? item.id;
      image = featured?.image ?? "";
      date = featured?.date ?? "";
    }

    return {
      type: item.type,
      typeLabel: typeLabels[item.type] ?? item.type.toUpperCase(),
      title,
      image,
      date,
      navigateTo: typeNavigation[item.type] ?? "hero",
      entryId: item.id,
    };
  });
}