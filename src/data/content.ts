// ─────────────────────────────────────────────────────────────────────────
// STUDIO CONTENT CONFIG
// This is the single file you need to edit to update the whole website.
// Anything wrapped in [BRACKETS] is a placeholder — replace with real info.
// Leave a field as an empty string "" to hide it (e.g. optional socials).
//
// IMAGES — drop files into public/images/... then reference them here:
//   ✅ "/images/team/kirovz-new.jpeg"
//   ❌ "public/images/team/kirovz-new.jpeg"  (no "public/" prefix)
//   ❌ "images/team/kirovz-new.jpeg"          (must start with "/")
// ─────────────────────────────────────────────────────────────────────────

export const studio = {
  name: "PenumbraStudio",
  tagline: "WE JUST HAVING 'FUN' .",
  supportingText:
    "An independent game studio creating atmospheric and ambitious experiences.",
  founded: "2026",
  location: "Yekaterinburg, Sverdlovsk Oblast, Russia",
  teamSize: 3,
  story: [
    "PenumbraStudio started as a small group, a shared obsession with worlds that feel alive, and not much else.",
    "We're not trying to be a big studio. We're trying to make games that stay with people long after the credits roll — atmosphere first, everything else in service of it.",
  ],
  philosophy: [
    "SMALL TEAM.",
    "BIG IDEAS.",
    "NO COMPROMISE.",
  ],
};

export type GameStatus =
  | "Concept"
  | "In Review"
  | "In Development"
  | "Early Access"
  | "Released";

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: string;
  status: GameStatus;
  platform: string;
  coverImage: string; 
  featuredImage?: string; 
  featured?: boolean;
  wishlistUrl?: string;
  learnMoreUrl?: string;
}

export const games: Game[] = [
  {
    slug: "black-silo",
    title: "Black Silo",
    tagline: "Something is still alive down there.",
    description:
      "Black Silo is an atmospheric shooter set inside the buried remains of an abandoned missile silo. Descend through collapsed control rooms and flooded blast tunnels, fight for every corridor, and piece together what really happened to the crew that never made it back to the surface.",
    genre: "Shooter",
    status: "Concept",
    platform: "PC",
    coverImage: "/images/games/black-silo-cover.png",
    featuredImage: "/images/games/black-silo-cover.jpg",
    featured: true,
    wishlistUrl: "",
    learnMoreUrl: "",
  },
  {
    slug: "untitled-horror-project",
    title: "Untitled Project — Coming Soon",
    tagline: "A new horror game, currently under review.",
    description:
      "Our second project is a horror game currently under internal review before we commit to full production. Details are being kept close for now — more will be shared as the concept solidifies.",
    genre: "Horror",
    status: "In Review",
    platform: "TBA",
    coverImage: "/images/games/placeholder-02.jpg",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials?: { label: string; url: string }[];
}

export const team: TeamMember[] = [
   {
    name: "kirovz",
    role: "[Major]", // no role provided yet
    bio: "[Responsible for the core gameplay systems, including player movement, weapons, AI, interactions, and gameplay mechanics.]",
    photo: "/images/team/kirovz-new.jpeg",
    socials: [],
  },
  {
    name: "Awadivsky",
    role: "[General]",
    bio: "[Builds the core systems that keep the game running. Works on gameplay architecture, inventory, progression, save systems, UI logic, and performance, creating reliable foundations for the rest of the team.]",
    photo: "/images/team/Awadivsky-new.jpeg",
    socials: [],
  },
 
  {
    name: "Yekaterina",
    role: "[Colonel]", // no role provided yet
    bio: "[Bridges the gap between creative ideas and technical execution. Develops tools, pipelines, optimization solutions, and technical systems that help artists and designers work efficiently and bring complex ideas into the game.]",
    photo: "/images/team/yekaterina-new.jpeg",
    socials: [],
  },
];
// Note: a photo submitted for "Awadivsky" contained a swastika / SS insignia
// and was not used. Drop a replacement image into /public/images/team/
// and update the `photo` path above whenever you have one.

export interface GalleryItem {
  image: string;
  caption: string;
}

export const gallery: GalleryItem[] = [
  {
    image: "/images/gallery/concept-art-handgun-desk.png",
    caption: "Detail pass on a sci-fi sidearm — concept art in progress",
  },
  {
    image: "/images/gallery/concept-art-pistol-texturing.png",
    caption: "Material and weathering passes in Substance 3D Painter",
  },
  {
    image: "/images/gallery/environment-greybox-city.png",
    caption: "Early environment blockout — layout before detail",
  },
  {
    image: "/images/gallery/character-design-exploration.png",
    caption: "Character exploration — color passes and orthographic studies",
  },
  {
    image: "/images/gallery/character-rigging-pass.png",
    caption: "Rigging pass on a tactical character model",
  },
];

export const contact = {
  email: "penumbrahiring@gmail.com", // ⚠️ assumed — same address used for hiring; replace with a general contact email if you'd rather keep them separate
  discord: "",
  twitter: "",
  youtube: "",
  steam: "",
};

export const nav = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Studio", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];
