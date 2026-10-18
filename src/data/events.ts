export type EventCategory =
  | "Technology"
  | "Music"
  | "Sport"
  | "Creative";

export interface EventItem {
  readonly id: number;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  seats: number;
  description: string;
  emoji: string;
  accentColor: string;
  softColor: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    title: "Future Tech Seminar",
    category: "Technology",
    date: "12 October 2026",
    time: "09:00",
    location: "GKB IV - Auditorium",
    seats: 120,
    description:
      "Discover AI, mobile development, and digital innovation with inspiring campus speakers.",
    emoji: "💻",
    accentColor: "#7C3AED",
    softColor: "#EDE9FE",
  },
  {
    id: 2,
    title: "UMM Music Night",
    category: "Music",
    date: "16 October 2026",
    time: "18:30",
    location: "UMM Dome",
    seats: 350,
    description:
      "Enjoy student bands, acoustic performances, and a lively night with the campus community.",
    emoji: "🎵",
    accentColor: "#EC4899",
    softColor: "#FCE7F3",
  },
  {
    id: 3,
    title: "Campus Sport Festival",
    category: "Sport",
    date: "22 October 2026",
    time: "07:00",
    location: "UMM Stadium",
    seats: 200,
    description:
      "Join basketball, mini soccer, badminton, and fun competitions between students.",
    emoji: "🏀",
    accentColor: "#F97316",
    softColor: "#FFEDD5",
  },
  {
    id: 4,
    title: "Design & Creative Expo",
    category: "Creative",
    date: "27 October 2026",
    time: "10:00",
    location: "Student Center",
    seats: 90,
    description:
      "Explore UI design, posters, photography, and visual projects created by talented students.",
    emoji: "🎨",
    accentColor: "#0891B2",
    softColor: "#CFFAFE",
  },
];
