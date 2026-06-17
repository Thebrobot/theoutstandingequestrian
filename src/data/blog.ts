export type BlogCategory = "Groundwork" | "Mounted" | "Mindset";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: BlogCategory;
  readTime: string;
  image: string;
  imageAlt: string;
  blocks: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shoulder-over-space-bubble",
    title: "Why Your Horse Steps Into Your Space — And How Shoulder-Over Fixes It",
    excerpt:
      "Most groundwork problems start the same way: your horse pushes into you instead of respecting your space. Shoulder-over teaches something deeper than a trick — it builds a language you both understand.",
    publishedAt: "2025-03-10",
    category: "Groundwork",
    readTime: "4 min read",
    image: "/images/blog/blog-shoulder-over.png",
    imageAlt: "Handler teaching shoulder-over groundwork with a horse in an outdoor arena",
    blocks: [
      {
        type: "p",
        text: "You halter up, walk to the arena, and within two minutes your horse is on top of you — nose in your pocket, shoulder drifting into your bubble, energy pushing forward when you haven't asked for anything. It's frustrating, and it feels personal. Usually, it isn't.",
      },
      {
        type: "p",
        text: "Horses step into human space for a handful of predictable reasons: habit, anxiety, playfulness, or because no one has clearly taught them that your bubble is non-negotiable. The fix isn't more yelling or more pulling. It's a simple groundwork exercise that changes how your horse reads your body: moving the shoulder over.",
      },
      {
        type: "h2",
        text: "Your space bubble is the lesson",
      },
      {
        type: "p",
        text: "Before you worry about perfect foot placement or fancy lateral work, the first job is spatial respect. Imagine a bubble around yourself that your horse cannot enter. Every time they push their nose, shoulder, or energy into that bubble, you correct it — calmly, consistently, without moving your own feet.",
      },
      {
        type: "p",
        text: "When they move the shoulder away correctly, you release immediately and reward in the language they actually speak. Some horses want a forehead scratch. Others want a walk break or a quiet voice. The reward isn't the point — the release is. The moment they offer the right answer, the pressure disappears.",
      },
      {
        type: "h2",
        text: "What good looks like (and what doesn't matter yet)",
      },
      {
        type: "ul",
        items: [
          "You stay planted; the horse moves around you, not through you.",
          "Correction is instant; reward is generous.",
          "Early on, any sideward step counts — don't chase perfection.",
          "Encourage the head to come down without walking forward first.",
        ],
      },
      {
        type: "p",
        text: "This groundwork isn't separate from your riding. The same horse who bulldozes you on the ground will lean on the rein and ignore your leg under saddle. Shoulder-over from the ground is where you teach initiation, respect, and release — skills that transfer directly when you get on.",
      },
      {
        type: "p",
        text: "In Renew SOLO, Week 1 walks you through shoulder-over on the ground and under saddle, step by step, with the corrections and rewards built in so you can practice on your own at your barn.",
      },
    ],
  },
  {
    slug: "breath-controls-your-horses-step",
    title: "Control Your Horse's Step Without Pulling or Kicking",
    excerpt:
      "Tempo isn't something you force out of a horse — it's something you invite. Learn how breath and body size on the lunge (and under saddle) open and close the stride without a fight.",
    publishedAt: "2025-03-18",
    category: "Groundwork",
    readTime: "5 min read",
    image: "/images/blog/blog-breath-rhythm.png",
    imageAlt: "Handler lunging a horse, using breath and body language to control stride",
    blocks: [
      {
        type: "p",
        text: "If you've ever tried to slow a horse down by pulling, or speed one up by kicking harder, you already know the ceiling on that approach. The horse either braces, gets dull, or learns to ignore you entirely. There's a quieter tool — one you're carrying with you every ride: your breath.",
      },
      {
        type: "h2",
        text: "Start on the lunge: body size tells the story",
      },
      {
        type: "p",
        text: "On the lunge, your horse can focus on your body without the complication of your seat and hands. As you inhale and open your chest, arms, and presence, the stride opens. As you exhale and draw yourself smaller — narrower chest, arms closer — the stride closes.",
      },
      {
        type: "p",
        text: "Watch where the front foot lands and where the hind foot follows. That footprint pattern is your feedback loop. You're not guessing whether the step changed; you can see it. If your horse is less attentive, make your aids more obvious at first. Side reins or a surcingle can help a distracted horse stay straight while they learn.",
      },
      {
        type: "h2",
        text: "Take it under saddle: two kinds of breath",
      },
      {
        type: "ul",
        items: [
          "Rib-cage breath — a lifted, collected feeling that asks for a shorter, more organized step.",
          "Belly breath — a deeper, expansive breath that invites extension without chasing speed.",
          "Tempo changes come from your body, not from pulling the face or pumping the leg.",
        ],
      },
      {
        type: "p",
        text: "This isn't mystical. It's biomechanics plus attention. When your body gets bigger, your horse's step gets bigger. When you contract, they collect. The skill is sensitivity — noticing the small response and rewarding it before you ask for more.",
      },
      {
        type: "p",
        text: "Week 2 of Renew SOLO dedicates an entire week to breath and rhythm: lunge exercises to build the foundation, then mounted work so you can feel the same open-and-close pattern from the saddle. It's one of the most transferable skills in the whole program.",
      },
    ],
  },
  {
    slug: "put-yourself-in-your-horses-shoes",
    title: "Before You Ride: Put Yourself in Your Horse's Shoes",
    excerpt:
      "The best riders don't start with the exercise — they start with the horse. A two-minute empathy check can save you a frustrating session and deepen your connection.",
    publishedAt: "2025-04-02",
    category: "Mindset",
    readTime: "4 min read",
    image: "/images/blog/blog-horses-shoes.png",
    imageAlt: "Rider connecting calmly with their horse at the barn before a session",
    blocks: [
      {
        type: "p",
        text: "You drove to the barn with a plan. Shoulder-over today, maybe some pole work, definitely working on that left lead. You tack up, mount, and within ten minutes you're annoyed — the horse is \"being difficult,\" you're repeating the same aid, and the session is going nowhere.",
      },
      {
        type: "p",
        text: "What if the problem wasn't the exercise? What if you skipped the step that every great session starts with: asking how your horse is showing up today?",
      },
      {
        type: "h2",
        text: "The empathy check",
      },
      {
        type: "p",
        text: "Before you ask anything of your horse, put yourself in their shoes — literally. Consider their day. Were they just turned out in a windy paddock? Did they stand in a stall for hours? Are they stiff on one side, sore in the back, or fresh from a week off?",
      },
      {
        type: "ul",
        items: [
          "How do they feel about this exercise — confident, confused, or anxious?",
          "What reward do they actually want today — touch, voice, movement, or rest?",
          "What would help them succeed before you add pressure?",
        ],
      },
      {
        type: "h2",
        text: "Intention changes everything",
      },
      {
        type: "p",
        text: "Riding with intention doesn't mean having a rigid agenda. It means arriving present — with a plan flexible enough to meet your horse where they are. Some days that means shortening the session. Some days it means swapping exercises. The goal is always connection first, movement second.",
      },
      {
        type: "p",
        text: "This mindset isn't soft; it's strategic. A horse who feels seen responds faster, stays softer in the body, and trusts you when the work gets harder. That's the foundation Week 1 of Renew SOLO builds before any lateral work or under-saddle progressions.",
      },
    ],
  },
  {
    slug: "visualization-before-you-ride",
    title: "Visualization: Why 80% of Riding Happens Before You Mount",
    excerpt:
      "The riders who look calm in the ring aren't lucky — they've already ridden the course in their head. Visualization is a trainable skill, and it changes how your body shows up for your horse.",
    publishedAt: "2025-04-15",
    category: "Mindset",
    readTime: "5 min read",
    image: "/images/blog/blog-visualization.png",
    imageAlt: "Rider quietly visualizing before mounting, with horse nearby in the arena",
    blocks: [
      {
        type: "p",
        text: "Ask any competitive rider what they do in the ten minutes before they enter the ring, and the good ones will tell you: they've already been there. They've felt the canter transition, seen the distance to the fence, rehearsed the recovery on landing. That isn't daydreaming. It's visualization — and it's one of the most underused tools in everyday riding.",
      },
      {
        type: "h2",
        text: "Your brain doesn't fully distinguish rehearsal from reality",
      },
      {
        type: "p",
        text: "When you vividly imagine a ride — the feel of the saddle, the rhythm of the gait, the timing of your aid — your nervous system begins to respond as if you're already doing it. Muscles activate subtly. Breathing shifts. Anxiety drops because the unknown becomes familiar.",
      },
      {
        type: "p",
        text: "That's why visualization shows up in Week 3 of Renew SOLO alongside confidence-building groundwork and pole work. Riding is psychology. The horse mirrors your tension, your hesitation, your clarity. Train your mind and your body follows.",
      },
      {
        type: "h2",
        text: "A simple pre-ride practice",
      },
      {
        type: "ul",
        items: [
          "Close your eyes for two minutes before you mount.",
          "Walk through the session you planned — not just the highlights, but the transitions between exercises.",
          "Include one thing that might go wrong and how you'll respond calmly.",
          "Open your eyes and ride the plan you just rehearsed.",
        ],
      },
      {
        type: "p",
        text: "You don't need a quiet meditation room. You need consistency. Two minutes before every ride beats a twenty-minute session once a month. Over six weeks, that compounds into a rider who looks prepared — because they are.",
      },
      {
        type: "p",
        text: "Renew SOLO weaves mental fitness into every week — not as an extra homework assignment, but as part of how you're taught to train. Visualization is Week 3's centerpiece, but the habit starts building from day one.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsSorted(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
