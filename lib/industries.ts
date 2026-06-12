export type Industry = {
  slug: string;
  /** lowercase label used in the hero heading pill */
  label: string;
  /** menu / footer label */
  name: string;
  hero: string;
  sphere: { from: string; to: string };
};

export const industries: Industry[] = [
  {
    slug: "vertical-mobility",
    label: "vertical mobility",
    name: "Vertical mobility",
    hero: "/images/hero-vertical-mobility.jpg",
    sphere: { from: "#b2c8e8", to: "#334863" },
  },
  {
    slug: "waste-treatment",
    label: "waste treatment",
    name: "Waste treatment",
    hero: "/images/hero-waste-treatment.jpg",
    sphere: { from: "#c9b2e8", to: "#463363" },
  },
  {
    slug: "telecommunications",
    label: "telecommunications",
    name: "Telecommunications",
    hero: "/images/hero-telecommunications.jpg",
    sphere: { from: "#e8b2da", to: "#633358" },
  },
  {
    slug: "fashion",
    label: "fashion",
    name: "Fashion",
    hero: "/images/hero-fashion.jpg",
    sphere: { from: "#e8b8b2", to: "#633633" },
  },
  {
    slug: "food-beverage",
    label: "food & beverage",
    name: "Food & beverage",
    hero: "/images/hero-food-beverage.jpg",
    sphere: { from: "#e8e5b2", to: "#635e33" },
  },
  {
    slug: "household-appliances",
    label: "household appliances",
    name: "Household appliances",
    hero: "/images/hero-household-appliances.jpg",
    sphere: { from: "#bee8b2", to: "#406333" },
  },
  {
    slug: "building-automation",
    label: "building automation",
    name: "Building automation",
    hero: "/images/hero-building-automation.jpg",
    sphere: { from: "#b2e8d3", to: "#33634e" },
  },
];

export const codisticaSphere = { from: "#80d5d2", to: "#00504f" };

export function industryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
