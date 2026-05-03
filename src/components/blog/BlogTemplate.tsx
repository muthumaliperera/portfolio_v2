import type { BlogPost } from "./blogData";
import { posts } from "./blogData";

type BlogTemplateProps = {
  post: BlogPost;
  onBack?: () => void;
  onNavigate?: (post: BlogPost) => void;
};

export default function BlogTemplate({
  post,
  onBack,
  onNavigate,
}: BlogTemplateProps) {
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <section className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between pt-8 pb-4 shrink-0"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <button
          onClick={onBack}
          className="font-agdasima text-white/50 hover:text-white text-lg tracking-widest transition-colors duration-300 flex items-center gap-2"
        >
          ← BACK TO BLOG
        </button>
        <span className="font-agdasima mr-20 text-white/30 text-lg tracking-widest">
          {post.date}
        </span>
      </div>

      <div className="h-px w-full bg-white/10 shrink-0" />

      {/* Scrollable body */}
      <div className="flex justify-center  overflow-y-auto">
        <div
          className="max-w-3xl flex-1 "
          style={{ marginLeft: 20, marginRight: 20 }}
        >
          {/* Title block */}
          <div className="pt-10 pb-6 max-w-full">
            <span className="font-afacad text-white/60 text-base border border-white/20 px-3 py-0.5">
              {post.tag}
            </span>
            <h1
              className="font-afacad font-bold leading-tight tracking-tight mt-4"
              style={{ fontSize: "clamp(36px, 3vw, 72px)" }}
            >
              {post.title}
            </h1>
            <p className="font-afacad text-white/50 text-xl mt-2 ">
              {post.excerpt}
            </p>
          </div>

          {/* Hero image — 4:1 ratio */}
          <div
            className="w-full overflow-hidden mb-10"
            style={{ aspectRatio: "4/2" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Content blocks */}
          <div className="w-full pb-32">
            {post.content.map((block, i) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="font-afacad text-white/80 text-xl leading-relaxed mb-6"
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "subtitle") {
                return (
                  <h2
                    key={i}
                    className="font-afacad text-2xl sm:text-3xl font-semibold text-white mt-10 mb-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "bullets") {
                return (
                  <ul key={i} className="mb-6 space-y-2">
                    {block.items?.map((item, j) => (
                      <li
                        key={j}
                        className="font-afacad text-white/70 text-xl flex items-start gap-3"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}

            {/* Prev / Next */}
            <div className="h-px w-full bg-white/10 mt-10 mb-8" />
            <div className="flex justify-between items-start gap-4 pb-10">
              {prevPost ? (
                <button
                  onClick={() => onNavigate?.(prevPost)}
                  className="group flex flex-col items-start"
                >
                  <span className="font-agdasima text-white/30 text-base tracking-widest mb-1">
                    ← PREVIOUS
                  </span>
                  <span className="font-afacad text-white text-xl font-semibold group-hover:underline underline-offset-4">
                    {prevPost.title}
                  </span>
                </button>
              ) : (
                <div />
              )}
              {nextPost ? (
                <button
                  onClick={() => onNavigate?.(nextPost)}
                  className="group flex flex-col items-end"
                >
                  <span className="font-agdasima text-white/30 text-base tracking-widest mb-1">
                    NEXT →
                  </span>
                  <span className="font-afacad text-white text-xl font-semibold group-hover:underline underline-offset-4">
                    {nextPost.title}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
