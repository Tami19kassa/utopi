import { MediaItem, SocialAccount } from "../types";

export interface TiDBConfigKeys {
  host: string;
  port: number;
  user: string;
  database: string;
  useTiDB: boolean;
  isConnected: boolean;
}

// ---------------- DATABASE CONFIG API (TiDB Cloud) -----------------

export async function fetchTiDBConfig(): Promise<TiDBConfigKeys> {
  try {
    const res = await fetch("/api/db-config");
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch TiDB configuration from backend node:", e);
  }
  return {
    host: "",
    port: 4000,
    user: "",
    database: "",
    useTiDB: false,
    isConnected: false,
  };
}

export async function saveTiDBConfig(config: Partial<TiDBConfigKeys> & { password?: string }): Promise<any> {
  try {
    const res = await fetch("/api/db-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to save TiDB configuration to backend:", e);
  }
  return { success: false, isConnected: false };
}

// Keep legacy signatures so we don't break simple components if any
export function getSavedConfig() {
  return { url: "", anonKey: "" };
}
export function saveConfigKeys(_url: string, _key: string) {}
export function isSupabaseConnected(): boolean { return false; }
export function getSupabaseClient() { return null; }

// ---------------- FALLBACKS FOR ROBUST CLIENT-SIDE RESILIENCY -----------------

const FALLBACK_MEDIA_ITEMS: MediaItem[] = [
  {
    id: "1",
    type: "blog",
    title: "The Theoretical Mechanics of Modern High-Stakes Trivia",
    author: "Alazar Tekle",
    date: "June 8, 2026",
    duration: "5 min read",
    category: "TRIVIA METRICS",
    excerpt: "How structured, rapid-fire questioning across Science, History, and Sports serves as a robust metric of cognitive agility and decision speed.",
    content: "For centuries, humans have used testing protocols as standard frameworks of logical calibration. On the modern Enqoq Cash platform, this is revolutionized. Trivia is no longer just home entertainment; it is an optimized transaction of cognitive agility. By scaling challenges across four core domains—General Knowledge, Sports, Science, and History—we empower players to convert rapid factual recall into immediate digital credit. \n\nHistorically, intellectual agility was verbal. Today, our synchronized digital platform, Enqoq Cash, maps this competitive transaction onto modern web architecture, where high-speed correct answers trigger instant micro-reward validations.",
    tags: ["Aesthetics", "Agility", "Game Theory"],
    likes: 142,
    gradientTheme: "from-red-950 via-neutral-900 to-black"
  },
  {
    id: "2",
    type: "vlog",
    title: "YUTOBIA v4.0: Modernizing Ge'ez Typography inside Addis Ababa",
    author: "Selam Kassahun",
    date: "June 5, 2026",
    duration: "8 min watch",
    category: "VLOGS / DESIGN",
    excerpt: "A mini-documentary following YouTobia's design team through the streets of Addis Ababa, transforming urban Ge'ez signage into high-contrast digital layouts.",
    content: "In this vlog, our design director Selam is sharing our vision of bringing Ge'ez typography into 2026 high-contrast digital layouts. We visit old printers around Piazza, study historical manuscripts, and translate these physical ink artifacts into responsive CSS elements, absolute vector illustrations, and digital interface frames.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Typography", "Addis Ababa", "Ge'ez"],
    likes: 219,
    gradientTheme: "from-neutral-900 via-red-950 to-neutral-900"
  },
  {
    id: "3",
    type: "blog",
    title: "Designing for Focus: Why We Banned Purple Gradients & AI Slop",
    author: "Tewodros Yohannes",
    date: "May 28, 2026",
    duration: "4 min read",
    category: "CREATIVE POLICY",
    excerpt: "An exploration of YouTobia Multimedia's strict branding: why high-octane red, deep black, and absolute white demand user focus over standard automated web styling.",
    content: "Web design in the mid-2020s has fallen prey to a passive uniformity. The ubiquity of generic purple-to-blue gradients, rounded glassy card templates, and unrequested mock terminal logs has desensitized our eyes. \n\nAt YouTobia, we adhere to a policy of Architectural Honesty. \n\nWe choose absolute red (#FF1E27) because it triggers high visual alerts, paired with razor-sharp corners, strong structural grids, and expansive pitch-black backgrounds. We construct layouts where content is the singular hero. If an element cannot be targeted, debugged, and interactively justified, it is deleted. By designing with high-contrast conviction, we demand the user's absolute visual presence.",
    tags: ["Branding", "UI/UX", "Art Direction"],
    likes: 98,
    gradientTheme: "from-neutral-900 via-neutral-900 to-neutral-950"
  },
  {
    id: "4",
    type: "vlog",
    title: "Walkthrough: Conquering the 'Hard' Trivia Tier in Enqoq Cash",
    author: "Robel Melaku",
    date: "May 15, 2026",
    duration: "12 min watch",
    category: "VLOGS / LEADERBOARD",
    excerpt: "Our top gamer Robel breaks down the highest-tier factual questions featured in the active platform and shows how to maximize response times.",
    content: "Robel walks you through how to master advanced trivia parameters in science, astrophysics, and world History on the active Enqoq Cash dashboard. He highlights historical literature roots of the questions, tells you how to spot fast semantic traps, and shows how players can optimize their virtualization speed to cache prizes.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Walkthrough", "Enqoq Cash", "Gaming"],
    likes: 312,
    gradientTheme: "from-black via-red-950/40 to-neutral-900"
  }
];

const FALLBACK_SOCIALS: SocialAccount[] = [
  { id: "s1", platform: "Youtube", label: "YouTobia TV", url: "https://youtube.com/@youtobia-multimedia", isActive: true },
  { id: "s2", platform: "Telegram", label: "YouTobia Creative Lab", url: "https://t.me/youtobia_multimedia", isActive: true },
  { id: "s3", platform: "Twitter", label: "YouTobiaX", url: "https://twitter.com/youtobia_tech", isActive: true },
  { id: "s4", platform: "Instagram", label: "youtobia.art", url: "https://instagram.com/youtobia.multimedia", isActive: true }
];

const FALLBACK_HERO_VIDEO = "https://cdn.pixabay.com/video/2021/04/12/70860-537333552_large.mp4";

// ---------------- MEDIA ITEMS API -----------------

export async function fetchMediaItems(): Promise<MediaItem[]> {
  try {
    const res = await fetch("/api/media-items");
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Using fallback local media elements due to connection latency:", e);
  }
  return FALLBACK_MEDIA_ITEMS;
}

export async function submitMediaItem(item: MediaItem): Promise<boolean> {
  try {
    const res = await fetch("/api/media-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return res.ok;
  } catch (e) {
    console.error("Failed to publish media item:", e);
    return false;
  }
}

export async function removeMediaItem(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/media-items/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (e) {
    console.error("Failed to delete media item:", e);
    return false;
  }
}

export async function addLikeToItem(id: string): Promise<number> {
  try {
    const res = await fetch(`/api/media-items/${id}/like`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      return data.likes || 0;
    }
  } catch (e) {
    console.error("Failed to like item:", e);
  }
  return 0;
}

// ---------------- SOCIAL ACCOUNTS API -----------------

export async function fetchSocialAccounts(): Promise<SocialAccount[]> {
  try {
    const res = await fetch("/api/social-accounts");
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Using fallback local social credentials due to connection latency:", e);
  }
  return FALLBACK_SOCIALS;
}

export async function updateSocialAccountList(accounts: SocialAccount[]): Promise<boolean> {
  try {
    const res = await fetch("/api/social-accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accounts),
    });
    return res.ok;
  } catch (e) {
    console.error("Failed to save socials list:", e);
    return false;
  }
}

// ---------------- HERO VIDEO URL API -----------------

export async function fetchHeroVideoUrl(): Promise<string> {
  try {
    const res = await fetch("/api/hero-video");
    if (res.ok) {
      const data = await res.json();
      return data.url || FALLBACK_HERO_VIDEO;
    }
  } catch (e) {
    console.warn("Using fallback local hero video source due to connection latency:", e);
  }
  return FALLBACK_HERO_VIDEO;
}

export async function saveHeroVideoUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch("/api/hero-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return res.ok;
  } catch (e) {
    console.error("Failed to upload hero clip:", e);
    return false;
  }
}
