#!/usr/bin/env python3
"""Clean Renew SOLO transcripts, merge by week, and build search index."""

import re
from pathlib import Path

BASE = Path("/Users/kyleartman/Desktop/Outstanding Equestrian")
TRANSCRIPTS = BASE / "transcripts"
CLEANED = TRANSCRIPTS / "cleaned"
MERGED = TRANSCRIPTS / "merged"

# Order within each week: (file suffix, title, type, duration_note)
WEEK_META = {
    1: [
        ("video-01", "Moving the Shoulder Over — Groundwork", "Groundwork", "~5 min"),
        ("video-02", "Moving the Shoulder Over — Under Saddle", "Mounted", "~3 min"),
        ("video-03", "Mindset: Put Yourself in Your Horse's Shoes", "Mental fitness", "~5 min"),
        ("video-04", "Week 1 Check-In / Tech Setup", "Mental fitness", "~7 min"),
    ],
    2: [
        ("video-01", "Lunge: Controlling Step Size with Your Breath", "Groundwork", "~5 min"),
        ("video-02", "Mounted: Short & Long Step via Breath", "Mounted", "~6 min"),
    ],
    3: [
        ("video-01", "Groundwork: Reward Training Over Obstacles", "Groundwork", "~7 min"),
        ("video-02", "Poles & Cavaletti: Equal Distance Landing", "Mounted", "~6 min"),
        ("video-03", "Visualization for Better Riding", "Mental fitness", "~7 min"),
    ],
    4: [
        ("video-01", "Groundwork: Walk/Trot Transitions Beside Handler", "Groundwork", "~5 min"),
        ("video-02", "Shape Pattern: Leg Yield, Circle, Straight Line", "Mounted", "~4 min"),
        ("video-03", "Stress, Beliefs & Micro-Stresses", "Mental fitness", "~9 min"),
    ],
    5: [
        ("video-01", "Pessoa Lunging System for Balance", "Groundwork", "~7 min"),
        ("video-02", "Grid Work: Balance & Mane Grab", "Mounted", "~3 min"),
        ("video-03", "Goal Setting for Riders", "Mental fitness", "~4 min"),
    ],
    6: [
        ("video-01", "Free Jumping Introduction", "Groundwork", "~10 min"),
        ("video-02", "Jump Course with Strategic Rewards", "Mounted", "~11 min"),
        ("video-03", "Celebrations & Self-Acknowledgment", "Mental fitness", "~11 min"),
    ],
}

SUMMARIES = {
    "renew-solo-week-01-video-01": (
        "Groundwork shoulder-over from the ground: maintain your space bubble, reward the horse, "
        "squat to encourage the head down, and release immediately when the horse moves correctly."
    ),
    "renew-solo-week-01-video-02": (
        "Under-saddle shoulder-over at walk and trot: initiation must come from the leg, not the rein. "
        "Shoulder leads; haunches stay on the correct side. Advanced version in canter on same lead."
    ),
    "renew-solo-week-01-video-03": (
        "Mindset week: enter each session with intention. Put yourself in the horse's shoes—consider "
        "their day, physical comfort, and feelings about the exercise before offering solutions."
    ),
    "renew-solo-week-01-video-04": (
        "Audio check / connection test only. Transcript quality is poor (repeated phrases); refer to video directly."
    ),
    "renew-solo-week-02-video-01": (
        "Lunge exercise: open and close the horse's step using breath and body size. Watch where front "
        "and hind feet land. Use bridle, side reins, or surcingle if the horse needs more focus."
    ),
    "renew-solo-week-02-video-02": (
        "Mounted breath control: short step by holding air in the rib cage; long step by sending breath "
        "through the belly. Works on green horses. Maintain straightness and avoid pulling/kicking for tempo."
    ),
    "renew-solo-week-03-video-01": (
        "Reward training over cavaletti: lead horse over poles, halt precisely, then pet. Progress to "
        "horse working independently. Goal is self-control and confidence, not handler control."
    ),
    "renew-solo-week-03-video-02": (
        "Pole/cavaletti work: equal takeoff and landing distance. Praise problem-solving over looking pretty. "
        "Support young horses when they trot, mix gaits, or adjust stride to solve distances."
    ),
    "renew-solo-week-03-video-03": (
        "Visualization: 80% psychology, 20% skill. Practice simple ride-throughs with eyes closed; add "
        "body movement to rehearse position before fences, lateral work, and tests."
    ),
    "renew-solo-week-04-video-01": (
        "Groundwork walk/trot beside handler: horse halts when you halt, stays in exact position on loose "
        "lead. Correct to the millimeter; work both sides; praise clearly when correct."
    ),
    "renew-solo-week-04-video-02": (
        "Mental agility pattern: leg yield to center line, circle 10–15 m, straight down long side, repeat. "
        "Prioritize responsiveness and connection before movement quality."
    ),
    "renew-solo-week-04-video-03": (
        "Reframe stress as useful process, not enemy. Write current beliefs vs desired riding outcomes; "
        "practice micro-stresses (cold shower, social stretch, personal ritual) to build mental fitness."
    ),
    "renew-solo-week-05-video-01": (
        "Pessoa lunging system setup and teaching: horse needs solid lunge skills first. Common reactions "
        "include pulling on bit, feeling stuck, or scooting from the hind fleece. Keep sessions short."
    ),
    "renew-solo-week-05-video-02": (
        "Grid work for rider balance: stack joints, grab mane through grid, then release to core-only balance "
        "without relying on reins."
    ),
    "renew-solo-week-05-video-03": (
        "Goal setting: define why, envision outcome, set a firm deadline, and plan daily actions with specific "
        "time, money, energy, and people involved."
    ),
    "renew-solo-week-06-video-01": (
        "Intro to free jumping: chute setup, lead over rails, progress to sending horse independently. "
        "Never chase through chute; reward attempts; lower expectations early; technique before height."
    ),
    "renew-solo-week-06-video-02": (
        "Final mounted exercise: jump course with rewards timed to each horse's needs—walk breaks, canter "
        "breaks, or flatwork resets between fences depending on temperament and balance."
    ),
    "renew-solo-week-06-video-03": (
        "Celebrate wins big and small. Write proud moments (lifetime, this year, today), feel them again, "
        "and speak them aloud to reinforce belief and momentum—for riding and life."
    ),
}

KEYWORDS = {
    "renew-solo-week-01-video-01": [
        "shoulder over", "groundwork", "space bubble", "reward", "halter", "bridle", "young horse",
    ],
    "renew-solo-week-01-video-02": [
        "shoulder over", "leg aid", "loose rein", "leg yield", "canter", "initiation",
    ],
    "renew-solo-week-01-video-03": [
        "mindset", "intention", "empathy", "observation", "physical comfort", "connection",
    ],
    "renew-solo-week-01-video-04": ["check-in", "tech setup"],
    "renew-solo-week-02-video-01": [
        "lunge", "breath", "step size", "walk trot canter", "side reins", "surcingle",
    ],
    "renew-solo-week-02-video-02": [
        "breath", "collection", "extension", "short step", "long step", "straightness", "lateral",
    ],
    "renew-solo-week-03-video-01": [
        "reward", "cavaletti", "obstacle", "halt", "self-control", "groundwork",
    ],
    "renew-solo-week-03-video-02": [
        "poles", "cavaletti", "distance", "stride", "problem solving", "grid", "bounce",
    ],
    "renew-solo-week-03-video-03": [
        "visualization", "mental fitness", "confidence", "competition prep", "psychology",
    ],
    "renew-solo-week-04-video-01": [
        "groundwork", "halt", "walk trot", "attention", "loose lead", "both sides",
    ],
    "renew-solo-week-04-video-02": [
        "leg yield", "circle", "pattern", "responsiveness", "center line", "mental agility",
    ],
    "renew-solo-week-04-video-03": [
        "stress", "beliefs", "micro-stress", "mental fitness", "cold shower", "mindset",
    ],
    "renew-solo-week-05-video-01": [
        "Pessoa", "lunging", "balance", "transitions", "side reins", "loins", "lumbar",
    ],
    "renew-solo-week-05-video-02": [
        "grid", "balance", "mane grab", "core", "jumping", "rider position",
    ],
    "renew-solo-week-05-video-03": [
        "goal setting", "deadline", "planning", "motivation", "vision",
    ],
    "renew-solo-week-06-video-01": [
        "free jump", "chute", "liberty", "poles", "cross rails", "reward training",
    ],
    "renew-solo-week-06-video-02": [
        "jump course", "reward", "breaks", "haunches-in", "outside flexion", "communication",
    ],
    "renew-solo-week-06-video-03": [
        "celebration", "confidence", "habits", "mental fitness", "self-talk", "accomplishment",
    ],
}

REPLACEMENTS = [
    (r"\bPsoa\b", "Pessoa"),
    (r"\bpsoa\b", "Pessoa"),
    (r"\bcavalettes\b", "cavaletti"),
    (r"\bcavalette\b", "cavaletti"),
    (r"\bCavalettes\b", "Cavaletti"),
    (r"\bCavalette\b", "Cavaletti"),
    (r"\bgrab(?:bing)? main\b", lambda m: m.group(0).replace("main", "mane")),
    (r"\bGrab(?:bing)? main\b", lambda m: m.group(0).replace("main", "Mane")),
    (r"\bmain as you approach\b", "mane as you approach"),
    (r"\buse the main for balance\b", "use the mane for balance"),
    (r"\bEtsy sketch\b", "a simple sketch"),
    (r"\bvertebrates\b", "vertebrae"),
    (r"\baides and cues\b", "aids and cues"),
    (r"\baides\b", "aids"),
    (r"\bhawk\b", "hock"),
    (r"\bHawk\b", "Hock"),
    (r"\bcandoring\b", "cantering"),
    (r"\bcanner break\b", "canter break"),
    (r"\btranter\b", "trot–canter mix"),
    (r"\bhaunches in\b", "haunches-in"),
    (r"\bflat work\b", "flatwork"),
    (r"\bflat test\b", "flat test"),
    (r"\bgive over\b", "jump over"),
    (r"\bSix Week Renew\b", "Six-Week Renew"),
    (r"\bsix week renew\b", "Six-Week Renew"),
    (r"\brenew groundwork\b", "Renew groundwork"),
    (r"\bwriting and your goals in writing\b", "riding and your goals in riding"),
    (r"\byour writing and your goals in writing\b", "your riding and your goals in riding"),
    (r"\byour writing in the area of stress\b", "your riding in the area of stress"),
    (r"\bwhat you want to see in your writing\b", "what you want to see in your riding"),
    (r"\bwhat you want as a result in your writing\b", "what you want as a result in your riding"),
    (r"\bcausing harm or causing benefit to your writing\b", "causing harm or causing benefit to your riding"),
    (r"\bmaking your writing tense\b", "making your riding tense"),
    (r"\bany activity has a certain stress on it\b", "any activity has a certain stress on it"),
    (r"\bstress in writing\b", "stress in riding"),
    (r"\bavenue of stress in writing\b", "avenue of stress in riding"),
    (r"\bnot just writing\b", "not just riding"),
    (r"\bour writing\b", "our riding"),
    (r"\byour writing\b", "your riding"),
    (r"\bin writing\b", "in riding"),
    (r"\bgrab the main\b", "grab the mane"),
    (r"\bthe main for balance\b", "the mane for balance"),
    (r"\bmy writing and my goals in riding\b", "my riding and my goals in riding"),
    (r"\bbecause writing just like any activity\b", "because riding just like any activity"),
    (r"\bI went out in road\b", "I went out and rode"),
    (r"\bpulls on the ground\b", "poles on the ground"),
    (r"\bcourse of pulls\b", "course of poles"),
    (r"\bdecollarbones\b", "collarbones"),
    (r"\bloombar\b", "lumbar"),
    (r"\bbum fleece\b", "hind fleece"),
    (r"\bscoot away from that bum fleece\b", "scoot away from that hind fleece"),
]

HALLUCINATION_PATTERNS = [
    re.compile(r"^,\s*</p>", re.I),
    re.compile(r"^</?\s*p\b", re.I),
    re.compile(r"begin=\"", re.I),
    re.compile(r"變態"),
    re.compile(r"readbase", re.I),
    re.compile(r"bosal", re.I),
    re.compile(r"^On screen text,", re.I),
    re.compile(r"fusion of both worlds", re.I),
    re.compile(r"^Crazy\.$"),
    re.compile(r"^Did you notice\?$"),
    re.compile(r"^Let's go!$"),
    re.compile(r"^you$"),
    re.compile(r"^This$"),
    re.compile(r"^Welcome\.$"),
    re.compile(r"^Congratulations! Congratulations!"),
]

MUSIC_LINE = re.compile(r"^(🎵?\s*)?(Music|MUSIC)(\s+play)?(\s*🎵)?$", re.I)


def apply_replacements(text: str) -> str:
    for pattern, repl in REPLACEMENTS:
        if callable(repl):
            text = re.sub(pattern, repl, text)
        else:
            text = re.sub(pattern, repl, text)
    return text


def is_bad_line(line: str) -> bool:
    stripped = line.strip()
    if not stripped:
        return False
    if MUSIC_LINE.match(stripped):
        return True
    if stripped == "I can hear you.":
        return True
    for pat in HALLUCINATION_PATTERNS:
        if pat.search(stripped):
            return True
    if len(stripped) > 80 and re.search(r"[<{]|\\u|codes update", stripped, re.I):
        return True
    return False


def clean_text(raw: str, stem: str) -> str:
    lines = raw.splitlines()
    cleaned_lines = []
    for line in lines:
        if is_bad_line(line):
            continue
        cleaned_lines.append(line.strip())

    # Collapse excessive blank lines
    text = "\n".join(cleaned_lines)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    text = apply_replacements(text)

    if stem == "renew-solo-week-01-video-04" and "I can hear you" in raw:
        text = (
            "[Note: This video appears to be a live check-in or tech setup session. "
            "The automatic transcript did not capture usable lesson content. "
            "Watch the video directly for this session.]"
        )
    elif stem == "renew-solo-week-01-video-02" and not text.startswith("Here we have"):
        # Ensure cleaned file starts at real content if garbage was removed
        idx = text.find("Here we have our first exercise")
        if idx > 0:
            text = text[idx:]

    return text


def load_raw(stem: str) -> str:
    path = TRANSCRIPTS / f"{stem}.txt"
    return path.read_text(encoding="utf-8")


def build_merged_week(week: int) -> str:
    parts = [
        f"# Renew SOLO — Week {week} Full Transcript",
        "",
        f"Cleaned transcripts merged from all Week {week} videos.",
        "",
        "---",
        "",
    ]
    for suffix, title, vtype, duration in WEEK_META[week]:
        stem = f"renew-solo-week-{week:02d}-{suffix}"
        cleaned_path = CLEANED / f"{stem}.txt"
        body = cleaned_path.read_text(encoding="utf-8")
        parts.extend([
            f"## {title}",
            "",
            f"**Type:** {vtype} | **Duration:** {duration} | **File:** `{stem}.mp4`",
            "",
            body,
            "",
            "---",
            "",
        ])
    return "\n".join(parts).rstrip() + "\n"


def build_index() -> str:
    lines = [
        "# Renew SOLO — Transcript Index",
        "",
        "Searchable guide to all 18 Renew SOLO videos across 6 weeks.",
        "Use Cmd+F to find topics, exercises, or keywords.",
        "",
        "## Quick Reference",
        "",
        "| Week | Videos | Groundwork | Mounted | Mental Fitness |",
        "|------|--------|------------|---------|----------------|",
        "| 1 | 4 | Shoulder over (ground) | Shoulder over (ride) | Horse's-shoes mindset |",
        "| 2 | 2 | Lunge + breath/step | Breath + step under saddle | — |",
        "| 3 | 3 | Reward over obstacles | Pole/cavaletti distances | Visualization |",
        "| 4 | 3 | Walk/trot beside handler | Shape pattern | Stress & beliefs |",
        "| 5 | 3 | Pessoa lunging | Grid balance | Goal setting |",
        "| 6 | 3 | Free jumping intro | Jump course + rewards | Celebrations |",
        "",
        "## File Locations",
        "",
        "- **Videos:** `videos/week-XX/`",
        "- **Raw transcripts:** `transcripts/*.txt`",
        "- **Cleaned transcripts:** `transcripts/cleaned/`",
        "- **Merged weekly docs:** `transcripts/merged/week-XX-renew-solo-transcript.md`",
        "",
        "---",
        "",
    ]

    for week in range(1, 7):
        lines.append(f"## Week {week}")
        lines.append("")
        for suffix, title, vtype, duration in WEEK_META[week]:
            stem = f"renew-solo-week-{week:02d}-{suffix}"
            summary = SUMMARIES[stem]
            keys = ", ".join(f"`{k}`" for k in KEYWORDS[stem])
            lines.extend([
                f"### {title}",
                "",
                f"- **Stem:** `{stem}`",
                f"- **Type:** {vtype} | **Duration:** {duration}",
                f"- **Video:** `videos/week-{week:02d}/{stem}.mp4`",
                f"- **Cleaned transcript:** `transcripts/cleaned/{stem}.txt`",
                f"- **Summary:** {summary}",
                f"- **Keywords:** {keys}",
                "",
            ])
        lines.append("---")
        lines.append("")

    lines.extend([
        "## Topic Index",
        "",
        "Jump to videos by subject:",
        "",
        "### Groundwork",
        "- Week 1: Shoulder over from the ground",
        "- Week 2: Lunge — open/close step with breath",
        "- Week 3: Reward training over cavaletti",
        "- Week 4: Walk/trot transitions beside handler",
        "- Week 5: Pessoa lunging system",
        "- Week 6: Free jumping introduction",
        "",
        "### Mounted / Riding",
        "- Week 1: Shoulder over under saddle (leg initiation)",
        "- Week 2: Short and long step via breath",
        "- Week 3: Equal distance over poles and cavaletti",
        "- Week 4: Leg yield → circle → straight pattern",
        "- Week 5: Grid work and rider balance",
        "- Week 6: Jump course with individualized rewards",
        "",
        "### Mental Fitness",
        "- Week 1: Empathy and intention (horse's shoes)",
        "- Week 3: Visualization",
        "- Week 4: Stress reframing and micro-stresses",
        "- Week 5: Goal setting",
        "- Week 6: Celebrations and self-talk",
        "",
        "### Equipment & Terms (corrected in cleaned transcripts)",
        "",
        "| Raw / error | Corrected |",
        "|-------------|-----------|",
        "| Psoa | Pessoa (lunging system) |",
        "| cavalettes | cavaletti |",
        "| grabbing main | grabbing mane |",
        "| hawk | hock |",
        "| tranter | trot–canter mix |",
        "| writing (mental fitness) | riding |",
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    CLEANED.mkdir(parents=True, exist_ok=True)
    MERGED.mkdir(parents=True, exist_ok=True)

    for week in range(1, 7):
        for suffix, _, _, _ in WEEK_META[week]:
            stem = f"renew-solo-week-{week:02d}-{suffix}"
            raw = load_raw(stem)
            cleaned = clean_text(raw, stem)
            (CLEANED / f"{stem}.txt").write_text(cleaned + "\n", encoding="utf-8")

    for week in range(1, 7):
        merged = build_merged_week(week)
        out = MERGED / f"week-{week:02d}-renew-solo-transcript.md"
        out.write_text(merged, encoding="utf-8")

    (TRANSCRIPTS / "INDEX.md").write_text(build_index(), encoding="utf-8")
    print("Done: cleaned/, merged/, INDEX.md")


if __name__ == "__main__":
    main()
