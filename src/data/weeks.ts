export interface WeekTopics {
  groundwork: string;
  mounted: string;
  mentalFitness?: string;
}

export interface Week {
  number: number;
  title: string;
  teaser: string;
  description: string;
  topics: WeekTopics;
}

export const weeks: Week[] = [
  {
    number: 1,
    title: "Foundation & Connection",
    teaser:
      "Learn shoulder-over from the ground and saddle, and start every session with empathy.",
    description:
      "Build respect on the ground with shoulder-over and your \"space bubble.\" Transfer that to the saddle with leg-led initiation (not the rein). Week 1 mental fitness: put yourself in your horse's shoes. Consider their day, comfort, and feelings before you ride.",
    topics: {
      groundwork: "Moving the shoulder over from the ground",
      mounted: "Shoulder over under saddle: leg initiation",
      mentalFitness: "Put yourself in your horse's shoes",
    },
  },
  {
    number: 2,
    title: "Breath & Rhythm",
    teaser:
      "Control your horse's step size using breath, on the lunge and under saddle.",
    description:
      "Open and close the stride from the ground using breath and body size. Under saddle, use rib-cage breath for collection and belly breath for extension, without pulling or kicking for tempo.",
    topics: {
      groundwork: "Lunge: open and close step with breath",
      mounted: "Short and long step via breath",
    },
  },
  {
    number: 3,
    title: "Confidence & Problem-Solving",
    teaser:
      "Reward training over obstacles, solve pole distances, and train your mind.",
    description:
      "Teach self-control over cavaletti on the ground with precise halts and rewards. Under saddle, praise problem-solving over \"looking pretty\" as your horse adjusts stride. Mental fitness: visualization, because 80% of riding is psychology.",
    topics: {
      groundwork: "Reward training over cavaletti",
      mounted: "Equal distance over poles and cavaletti",
      mentalFitness: "Visualization for better riding",
    },
  },
  {
    number: 4,
    title: "Precision & Mental Agility",
    teaser:
      "Halt when you halt, nail a shape pattern, and reframe stress as fuel.",
    description:
      "Groundwork walk/trot beside handler: exact position, loose lead, both sides. Mounted shape pattern: leg yield → circle → straight, prioritizing responsiveness over perfection. Reframe stress and build mental fitness through micro-stresses.",
    topics: {
      groundwork: "Walk/trot transitions beside handler",
      mounted: "Leg yield → circle → straight pattern",
      mentalFitness: "Stress reframing and micro-stresses",
    },
  },
  {
    number: 5,
    title: "Balance & Direction",
    teaser: "Pessoa lunging, grid balance, and goal-setting that sticks.",
    description:
      "Introduce the Pessoa system for balance (solid lunge skills first). Grid work: stack joints, grab mane, then release to core-only balance. Set goals with a why, deadline, and daily actions.",
    topics: {
      groundwork: "Pessoa lunging system for balance",
      mounted: "Grid work and rider balance",
      mentalFitness: "Goal setting for riders",
    },
  },
  {
    number: 6,
    title: "Integration & Celebration",
    teaser:
      "Free jumping, a full jump course, and learning to celebrate your wins.",
    description:
      "Free jumping intro: chute setup, reward attempts, technique before height. Mounted jump course with individualized rewards (walk breaks, flatwork resets). Close the program by celebrating accomplishments, big and small, and building momentum for life and riding.",
    topics: {
      groundwork: "Free jumping introduction",
      mounted: "Jump course with individualized rewards",
      mentalFitness: "Celebrations and self-acknowledgment",
    },
  },
];
