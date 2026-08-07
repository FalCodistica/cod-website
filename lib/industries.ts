export type Industry = {
  slug: string;
  /** lowercase label used in the hero heading pill */
  label: string;
  /** menu / footer label */
  name: string;
  hero: string;
  /**
   * Alternate hero image used on narrow (mobile) viewports instead of `hero`,
   * for a photo composed for a tall aspect ratio — full-bleed and shrunk-card
   * alike — instead of cropping a landscape shot. Chosen by breakpoint only
   * (not scroll state), so there's no swap mid-scroll. Omit to always use `hero`.
   */
  heroPortrait?: string;
  /** CSS object-position for the hero image, e.g. "50% 30%" — defaults to centered */
  heroFocus?: string;
  /**
   * On narrow (mobile) viewports, caps the full-bleed hero band to `width * this ratio`
   * instead of the full device height, letterboxing it against the dark background.
   * Use for images whose important content spans wider than object-cover leaves visible
   * in a tall viewport. Omit to keep the plain edge-to-edge full-bleed crop.
   */
  heroMobileMaxAspect?: number;
  sphere: { from: string; to: string };
};

export const industries: Industry[] = [
  {
    slug: "vertical-mobility",
    label: "vertical mobility",
    name: "Vertical mobility",
    hero: "/images/hero-vertical-mobility.jpg",
    heroFocus: "40%",
    heroPortrait: "/images/hero-vertical-mobility-portrait.png",
    sphere: { from: "#b2c8e8", to: "#334863" },
  },
  {
    slug: "waste-treatment",
    label: "waste treatment",
    name: "Waste treatment",
    hero: "/images/hero-waste-treatment.jpg",
    heroPortrait: "/images/hero-waste-treatment-portrait.png",
    sphere: { from: "#c9b2e8", to: "#463363" },
  },
  {
    slug: "telecommunications",
    label: "telecommunications",
    name: "Telecommunications",
    hero: "/images/hero-telecommunications.png",
    heroPortrait: "/images/hero-telecommunications-portrait.png",
    sphere: { from: "#e8b2da", to: "#633358" },
  },
  {
    slug: "fashion",
    label: "fashion",
    name: "Fashion",
    hero: "/images/hero-fashion.jpg",
    heroPortrait: "/images/hero-fashion-portrait.png",
    sphere: { from: "#e8b8b2", to: "#633633" },
  },
  {
    slug: "food-beverage",
    label: "food & beverage",
    name: "Food & beverage",
    hero: "/images/hero-food-beverage.jpg",
    heroFocus: "60%",
    heroPortrait: "/images/hero-food-beverage-portrait.png",
    sphere: { from: "#e8e5b2", to: "#635e33" },
  },
  {
    slug: "household-appliances",
    label: "household appliances",
    name: "Household appliances",
    hero: "/images/hero-household-appliances.png",
    heroPortrait: "/images/hero-household-appliances-portrait.png",
    sphere: { from: "#bee8b2", to: "#406333" },
  },
  {
    slug: "building-automation",
    label: "building automation",
    name: "Building automation",
    hero: "/images/hero-building-automation.jpg",
    heroPortrait: "/images/hero-building-automation-portrait.png",
    sphere: { from: "#b2e8d3", to: "#33634e" },
  },
];

export const codisticaSphere = { from: "#80d5d2", to: "#00504f" };

export function industryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
