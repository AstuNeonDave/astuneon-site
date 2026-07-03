/* The Houses of Astu Neon — single source of truth.
   Add a new venture here and every version of the site picks it up. */
export type Branch = {
  domain: string;
  href: string;
  label: string;
  note?: string;
};

export const BRANCHES: Branch[] = [
  { domain: "myastuneon.com", href: "https://myastuneon.com", label: "Oil" },
  {
    domain: "astuneon.ai",
    href: "https://astuneon.ai",
    label: "Software Platform",
  },
  {
    domain: "astuneon.space",
    href: "https://astuneon.space",
    label: "Space Program",
    note: "with Brown University",
  },
  {
    domain: "astuneon.film",
    href: "https://astuneon.film",
    label: "Documentary",
  },
  {
    domain: "astuneon.org",
    href: "https://astuneon.org",
    label: "Philanthropy",
  },
  {
    domain: "astuneon.tech",
    href: "https://astuneon.tech",
    label: "AI Value Realization",
  },
  {
    domain: "astuneon.fun",
    href: "https://astuneon.fun",
    label: "Exploration",
  },
];
