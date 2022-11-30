// Tailwind css needs to scan hole class to generate css for it
const planetColors = {
  Mercury: "bg-blue-500",
  Venus: "bg-yellow",
  Earth: "bg-violet",
  Mars: "bg-red-600",
  Jupiter: "bg-red-500",
  Saturn: "bg-orange",
  Uranus: "bg-green",
  Neptune: "bg-blue-400",
} as const;

export type PlanetNames = keyof typeof planetColors;
export type colors = typeof planetColors[PlanetNames];

export const getPlanetColor = (planetName: PlanetNames) => {
  const color: colors = planetColors[planetName];

  if (color) {
    return color;
  } else {
    return planetColors.Mercury;
  }
};
