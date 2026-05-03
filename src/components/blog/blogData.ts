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
    id: "blog-002",
    date: "3 May 2026",
    tag: "Growth & Real Work",
    title: "Stop Jumping to UI — I Learned This the Hard Way",
    excerpt: "I rushed into high-fidelity design without validating the direction. Here’s what that mistake taught me about process and alignment.",
    image: "/images/blog/blog 002.png",
    content: [
  { type: "paragraph", text: "I went straight into UI. Skipped wireframes. Skipped validation.Focused on making things look clean and complete. Two weeks later, I had to start over." },
  { type: "subtitle", text: "What I Thought I Was Doing" },
  { type: "paragraph", text: "At the time, it felt like progress. I was moving fast, exploring screens, refining layouts, and making everything look polished. From the outside, it looked like solid design work. But I was designing based on assumptions, not clarity. Some requirements weren’t fully explained. And instead of slowing down to ask, I filled the gaps myself." },
  { type: "subtitle", text: "Where It Actually Broke" },
  { type: "paragraph", text: "The issue wasn’t the UI quality. It was the direction. I presented a fully designed solution without ever confirming if the approach itself made sense. So when feedback came in, it wasn’t about improving the design — it was about rethinking it completely. That’s what made it hard. Not iteration. A reset." },
  

  { type: "subtitle", text: "Taking a Step Back" },
  { type: "paragraph", text: "I paused for a couple of days after that. Not out of frustration — but because I needed to rethink how I was approaching the work. I realized I had been focused on designing screens, instead of understanding the problem I was supposed to solve." },
  
  

  { type: "subtitle", text: "What I Changed" },
{ type: "paragraph", text: "When I restarted, I didn’t begin with UI. I started with structure. Rough wireframes. No colours. No polish. Just enough to communicate ideas clearly." },
{ type: "paragraph", text: "This time, I:" },
  { type: "bullets", items: [
    "Asked more questions upfront",
    "Clarified missing details before designing",
    "Shared early concepts instead of finished screens",
    "Explored multiple directions instead of locking into one"
  ]},
  { type: "paragraph", text: "Instead of trying to get it “right” in one go, I focused on getting it aligned early." },

 { type: "subtitle", text: "What Made the Real Difference" },
  { type: "paragraph", text: "The biggest shift wasn’t just in my workflow — it was in collaboration. There were more conversations at every stage. The BA team helped define requirements clearly. The dev team stayed involved while decisions were being made. Design was no longer something I worked on alone and handed off. It became something we shaped together. And because of that, every decision held up better — not just visually, but practically." },

 { type: "subtitle", text: "What I Took From This" },
  { type: "paragraph", text: "This experience changed how I approach every project now:" },
  { type: "bullets", items: [
    "Jumping to UI too early creates more rework later",
    "Wireframes aren’t optional — they create alignment",
    "Assumptions are risky, even when they feel small",
    "Early feedback is more valuable than polished screens",
    "Good design comes from shared understanding, not individual execution"
  ]},

 { type: "subtitle", text: "Why This Still Stays With Me" },
  { type: "paragraph", text: "This wasn’t the smoothest project I’ve worked on. But it was the one that forced me to fix how I think and work as a designer. Now, I don’t measure progress by how polished something looks ,I measure it by how clearly the problem is understood." },
  { type: "paragraph", text: "Because a clean UI built on the wrong foundation will always fail." },
  
  
]
,
  },
  
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