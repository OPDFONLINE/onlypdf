import type { ToolColor } from "@/lib/tools";

export const toolColorClasses: Record<
  ToolColor,
  { badgeBg: string; badgeText: string; ring: string; solidBg: string; solidHoverBg: string; text: string }
> = {
  accent: {
    badgeBg: "bg-accent-soft",
    badgeText: "text-accent-dark",
    ring: "group-hover:border-accent",
    solidBg: "bg-accent",
    solidHoverBg: "hover:bg-accent-dark",
    text: "text-accent-dark",
  },
  coral: {
    badgeBg: "bg-coral-soft",
    badgeText: "text-coral",
    ring: "group-hover:border-coral",
    solidBg: "bg-coral",
    solidHoverBg: "hover:bg-coral",
    text: "text-coral",
  },
  amber: {
    badgeBg: "bg-amber-soft",
    badgeText: "text-amber",
    ring: "group-hover:border-amber",
    solidBg: "bg-amber",
    solidHoverBg: "hover:bg-amber",
    text: "text-amber",
  },
  teal: {
    badgeBg: "bg-teal-soft",
    badgeText: "text-teal",
    ring: "group-hover:border-teal",
    solidBg: "bg-teal",
    solidHoverBg: "hover:bg-teal",
    text: "text-teal",
  },
  pink: {
    badgeBg: "bg-pink-soft",
    badgeText: "text-pink",
    ring: "group-hover:border-pink",
    solidBg: "bg-pink",
    solidHoverBg: "hover:bg-pink",
    text: "text-pink",
  },
  sky: {
    badgeBg: "bg-sky-soft",
    badgeText: "text-sky",
    ring: "group-hover:border-sky",
    solidBg: "bg-sky",
    solidHoverBg: "hover:bg-sky",
    text: "text-sky",
  },
};
