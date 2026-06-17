export type CourseCategory = "renew" | "membership" | "specialized";

export interface Course {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  format: string;
  thumbnail: string;
  category: CourseCategory;
  price?: string;
  priceNote?: string;
  highlight?: string;
  features: string[];
  bestFor: string;
  cta: {
    label: string;
    href: string;
  };
}

export const renewProgram = {
  title: "Renew Your Ride",
  description:
    "A 6-week training reset for riders who want clarity, consistency, and real progress.",
  benefits: [
    "Create a ride plan that works",
    "Build confidence & momentum",
    "Respond to your horse with purpose",
    "Shift from stuck to clear minded",
  ],
};

export const courses: Course[] = [
  {
    slug: "renew-solo",
    title: "Renew SOLO",
    description:
      "Self-paced, lifetime access. A six-week training reset with downloadable ride plans. Reset and refocus at your own pace.",
    format: "6 Modules • Self-Paced",
    thumbnail: "/images/course-renew-solo-placeholder.jpg",
    category: "renew",
    price: "$430",
    priceNote: "Self-paced, lifetime access",
    features: ["6 modules", "Downloadable ride plans", "Upgrade anytime"],
    bestFor: "Independent riders ready to reset and refocus at their own pace.",
    cta: { label: "Buy Now", href: "/enroll" },
  },
  {
    slug: "renew-hybrid",
    title: "Renew HYBRID",
    subtitle: "Structure + flexibility",
    description:
      "The same 6-week reset with coaching checkpoints, bi-weekly group calls, and community support.",
    format: "6 Modules • Hybrid Coaching",
    thumbnail: "/images/course-renew-hybrid-placeholder.jpg",
    category: "renew",
    price: "$995",
    highlight: "Structure + flexibility",
    features: [
      "6 modules",
      "3 coaching calls",
      "Bi-weekly group coaching",
      "12 months access",
      "Community support",
    ],
    bestFor: "Self-motivated riders who want feedback checkpoints and community.",
    cta: {
      label: "Apply Now",
      href: `mailto:hello@theoutstandingequestrian.com?subject=Renew%20HYBRID%20Application`,
    },
  },
  {
    slug: "renew-elite",
    title: "Renew ELITE",
    subtitle: "Total transformation + full support",
    description:
      "The complete Renew Your Ride experience with private coaching, personalized ride plans, and daily messaging.",
    format: "6 Modules • Elite Coaching",
    thumbnail: "/images/course-renew-elite-placeholder.jpg",
    category: "renew",
    highlight: "Total transformation + full support",
    features: [
      "6 modules",
      "6 private coaching calls",
      "Group coaching access",
      "Lifetime access",
      "Personalized ride plans + daily messaging",
    ],
    bestFor:
      "Riders who want expert eyes on them weekly and fast, customized progress.",
    cta: {
      label: "Book a Call",
      href: `mailto:hello@theoutstandingequestrian.com?subject=Renew%20ELITE%20Consultation`,
    },
  },
  {
    slug: "momentum",
    title: "Momentum",
    subtitle: "Group Coaching Membership for Dedicated Riders",
    description:
      "Keep the momentum going after Renew Your Ride with live group coaching and community support.",
    format: "Monthly Membership",
    thumbnail: "/images/course-momentum.jpg",
    category: "membership",
    price: "$147",
    priceNote: "/ Month",
    features: [
      "2 live group calls with coach",
      "Access to exercise of the week",
      "Community access",
    ],
    bestFor: "Dedicated riders who want ongoing group coaching and community.",
    cta: {
      label: "Become A Member",
      href: `mailto:hello@theoutstandingequestrian.com?subject=Momentum%20Membership`,
    },
  },
  {
    slug: "on-track",
    title: "On Track",
    subtitle: "1:1 Coaching Membership for Serious Riders",
    description:
      "Premium monthly coaching with Davina: group calls, private sessions, and priority community support.",
    format: "Monthly Membership",
    thumbnail: "/images/course-on-track.jpg",
    category: "membership",
    price: "$499",
    priceNote: "/ Month. 3, 6, 12 month commitment bonuses",
    features: [
      "2 group coaching calls / month with Live Q & A",
      "8x 1:1 calls with Davina",
      "Community access with priority response time for questions",
    ],
    bestFor: "Serious riders committed to accelerated, personalized progress.",
    cta: {
      label: "Become A Member",
      href: `mailto:hello@theoutstandingequestrian.com?subject=On%20Track%20Membership`,
    },
  },
  {
    slug: "your-first-fei",
    title: "Your First FEI",
    subtitle: "Video Mini Course",
    description:
      "A solo video series that walks you through everything you need to know in the months leading up to your FEI debut.",
    format: "Video Mini Course",
    thumbnail: "/images/course-fei-placeholder.jpg",
    category: "specialized",
    features: [
      "Paperwork + passports",
      "Jog prep + packing",
      "Travel + mindset",
    ],
    bestFor:
      "Riders who want to feel prepared, confident, and in control every step of the way.",
    cta: {
      label: "Prepare Now",
      href: `mailto:hello@theoutstandingequestrian.com?subject=Your%20First%20FEI%20Course`,
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((c) => c.category === category);
}
