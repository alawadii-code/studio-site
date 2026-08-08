// ─────────────────────────────────────────────────────────────────────────
// CAREERS CONTENT CONFIG
// Add, remove, or edit departments/positions here — the Careers section
// renders from this file automatically. Job detail fields (responsibilities,
// requirements, etc.) are optional for now; fill them in whenever ready.
// ─────────────────────────────────────────────────────────────────────────

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance";

export interface Position {
  slug: string;
  title: string;
  employmentType?: EmploymentType;
  location?: string; // e.g. "Remote" or "Yekaterinburg, Russia"
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
}

export interface Department {
  slug: string;
  name: string;
  positions: Position[];
}

const defaults = {
  employmentType: "Full-time" as EmploymentType,
  location: "Remote",
};

export const departments: Department[] = [
  {
    slug: "art",
    name: "Art",
    positions: [
      { slug: "3d-character-artist", title: "3D Character Artist", ...defaults },
      { slug: "3d-environment-artist", title: "3D Environment Artist", ...defaults },
      { slug: "animator", title: "Animator", ...defaults },
      { slug: "technical-artist", title: "Technical Artist", ...defaults },
      { slug: "concept-artist", title: "Concept Artist", ...defaults },
      { slug: "ui-ux-artist", title: "UI/UX Artist", ...defaults },
      { slug: "writer", title: "Writer", ...defaults },
    ],
  },
  {
    slug: "audio",
    name: "Audio",
    positions: [
      { slug: "sound-designer", title: "Sound Designer", ...defaults },
      { slug: "composer-music-producer", title: "Composer / Music Producer", ...defaults },
      { slug: "audio-engineer", title: "Audio Engineer", ...defaults },
    ],
  },
  {
    slug: "game-design",
    name: "Game Design",
    positions: [
      { slug: "game-designer", title: "Game Designer", ...defaults },
      { slug: "level-designer", title: "Level Designer", ...defaults },
      { slug: "narrative-designer", title: "Narrative Designer", ...defaults },
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    positions: [
      { slug: "gameplay-programmer", title: "Gameplay Programmer", ...defaults },
      { slug: "backend-server-side-engineer", title: "Backend / Server-Side Engineer", ...defaults },
      { slug: "engine-systems-programmer", title: "Engine / Systems Programmer", ...defaults },
      { slug: "ai-engineer", title: "AI Engineer", ...defaults },
      { slug: "automation-engineer", title: "Automation Engineer", ...defaults },
      { slug: "tools-pipeline-programmer", title: "Tools / Pipeline Programmer", ...defaults },
      { slug: "technical-director", title: "Technical Director", ...defaults },
    ],
  },
  {
    slug: "business-development",
    name: "Business Development",
    positions: [
      { slug: "marketing-specialist", title: "Marketing Specialist", ...defaults },
      { slug: "community-manager", title: "Community Manager", ...defaults },
      { slug: "business-development-specialist", title: "Business Development Specialist", ...defaults },
      { slug: "hr-recruiter", title: "HR / Recruiter", ...defaults },
      { slug: "producer-project-manager", title: "Producer / Project Manager", ...defaults },
    ],
  },
];

export const careersClosing =
  "Did we miss something? Either way, we would love to hear how you can help us.";
