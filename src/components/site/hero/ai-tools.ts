import {
  siGooglegemini,
  siClaude,
  siElevenlabs,
  siPerplexity,
  siCursor,
  siReplit,
  siNotion,
  siSuno,
  siZapier,
  siN8n,
  siGoogle,
  siDeepseek,
  type SimpleIcon,
} from "simple-icons";

export type AiTool = {
  name: string;
  /** simple-icons SimpleIcon (path + hex). If omitted, `initials` is rendered instead. */
  icon?: SimpleIcon;
  /** Fallback monogram when no brand icon is available. */
  initials?: string;
  /** Brand-ish hex (no leading #). Used for glow + monogram color. */
  color: string;
  featured?: boolean;
};

/** 4 layered orbit rings — outer ring is dropped on mobile. */
export const RINGS: AiTool[][] = [
  // Ring 1 — inner (4)
  [
    { name: "ChatGPT", initials: "GP", color: "10A37F", featured: true },
    { name: "Claude", icon: siClaude, color: "D97757", featured: true },
    { name: "Gemini", icon: siGooglegemini, color: "4796E3" },
    { name: "Lovable", initials: "LV", color: "FF4D8D", featured: true },
  ],
  // Ring 2 (6)
  [
    { name: "Midjourney", initials: "MJ", color: "C7C7C7" },
    { name: "Runway", initials: "RW", color: "9AE600" },
    { name: "ElevenLabs", icon: siElevenlabs, color: "F0F0F0" },
    { name: "HeyGen", initials: "HG", color: "7559FF" },
    { name: "Cursor", icon: siCursor, color: "DDDDDD" },
    { name: "Grok", initials: "Gk", color: "F2F2F2" },
  ],
  // Ring 3 (7)
  [
    { name: "Perplexity", icon: siPerplexity, color: "20B8CD" },
    { name: "Replit", icon: siReplit, color: "F26207" },
    { name: "Bolt.new", initials: "Bl", color: "FFD166" },
    { name: "Leonardo AI", initials: "Le", color: "9D6BFF" },
    { name: "Notion AI", icon: siNotion, color: "EFEFEF" },
    { name: "Suno AI", icon: siSuno, color: "F0F0F0" },
    { name: "Canva AI", initials: "Cv", color: "00C4CC" },
  ],
  // Ring 4 — outer (8)
  [
    { name: "Flow", initials: "Fl", color: "60A5FA" },
    { name: "Nano Banana", initials: "Nb", color: "FFD166" },
    { name: "Google AI Studio", icon: siGoogle, color: "4796E3" },
    { name: "Synthesia", initials: "Sy", color: "0096FF" },
    { name: "Pika Labs", initials: "Pk", color: "FF6BCB" },
    { name: "Stability AI", initials: "Sd", color: "E0529C" },
    { name: "N8N", icon: siN8n, color: "EA4B71" },
    { name: "Zapier AI", icon: siZapier, color: "FF4F00" },
    { name: "DeepSeek", icon: siDeepseek, color: "4D6BFE" },
  ],
];
