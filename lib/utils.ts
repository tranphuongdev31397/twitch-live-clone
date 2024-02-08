import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToHexColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a 6-digit hexadecimal color code
  const hexColor = (hash & 0x00ffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");

  return `#${hexColor}`;
}

export function generateRandomSymmetricalColorByTheme(
  theme: "dark" | "light" = "dark"
) {
  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  if (theme === "light") {
    // Generate a random dark color
    const color = `#${getRandomInt(0, 50)
      .toString(16)
      .padStart(2, "0")}${getRandomInt(0, 50)
      .toString(16)
      .padStart(2, "0")}${getRandomInt(0, 50).toString(16).padStart(2, "0")}`;
    return color;
  } else {
    // Generate a random light color
    const color = `#${getRandomInt(200, 255)
      .toString(16)
      .padStart(2, "0")}${getRandomInt(200, 255)
      .toString(16)
      .padStart(2, "0")}${getRandomInt(200, 255)
      .toString(16)
      .padStart(2, "0")}`;
    return color;
  }
}
