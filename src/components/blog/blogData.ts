export type BlogPost = {
  id: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  content: {
    type: 'paragraph' | 'subtitle' | 'bullets';
    text?: string;
    items?: string[];
  }[];
};

export const posts: BlogPost[] = [
  {
    id: "blog-001",
    date: "26 APR 2026",
    tag: "AI & Interface Design",
    title: "The Quiet Shift — What AI Is Really Doing to the Design Profession",
    excerpt: "AI isn't here to replace your creativity — it's here to expose whether you had any to begin with.",
    image: "/images/blog/blog 001.png",
    content: [
  { type: "paragraph", text: "There's a conversation happening in every design team right now, mostly in whispers. 'Will AI take my job?' Figma adds AI. Adobe adds AI. Midjourney spits out UI mockups in seconds. The timeline feels real. The threat feels closer than ever." },
  { type: "paragraph", text: "Here's the truth nobody wants to say out loud: yes, AI is replacing a version of the designer. The one who just pushes pixels. The one who takes a brief and executes without questioning it. That version is already on borrowed time." },
  { type: "subtitle", text: "But Here's What AI Cannot Do" },
  { type: "bullets", items: [
    "Walk into a room and feel the tension between what a client says and what they actually mean.",
    "Decide that the real problem isn't the checkout flow, it's that users don't trust the brand yet.",
    "Push back on a bad idea with enough conviction to change the direction of a product.",
    "Take responsibility when a design decision fails, and learn something human from it."
  ]},
  { type: "paragraph", text: "AI is a tool that executes. You are the one who decides what's worth executing. That gap between execution and judgment is where your entire career lives." },
  { type: "subtitle", text: "So What Do You Do Next?" },
  { type: "paragraph", text: "Learn AI tools, not to compete with AI, but to make yourself 10x more productive with it. Go deeper on strategy, research, and systems thinking. These are the skills that don't compress into a prompt. Build a point of view. Write, share, teach. Designers with a perspective are not replaceable, they are sought after."
  },
  { type: "paragraph", text: "The designers who will thrive aren't the ones who ignore AI or fear it. They're the ones who pick it up, figure it out, and use it to do work that wasn't possible before. The era isn't ending. It's just finally getting interesting." },
]
  },
 
];