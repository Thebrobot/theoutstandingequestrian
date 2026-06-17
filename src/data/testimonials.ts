export interface Testimonial {
  quote: string;
  name: string;
  discipline: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I finally stopped fighting my horse and started listening. The shoulder-over groundwork changed everything about how we show up for each other.",
    name: "Sarah M.",
    discipline: "Dressage",
  },
  {
    quote:
      "The mental fitness weeks were a surprise highlight. Visualization before my rides has made me calmer and more effective in the saddle.",
    name: "Jessica T.",
    discipline: "Eventing",
  },
  {
    quote:
      "Six weeks of structure I could actually follow on my own. The reward-based approach fits my horse perfectly — we're both enjoying riding again.",
    name: "Amanda K.",
    discipline: "Hunter/Jumper",
  },
];
