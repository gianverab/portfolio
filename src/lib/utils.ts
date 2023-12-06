import { Experience } from "./types";

export function sortbyYear(a: Experience, b: Experience): number {
  if (a.year === "Present") return -1;
  if (b.year === "Present") return 1;

  // Extract the start year from range or the single year
  const parseYear = (entry: string): number => parseInt(entry.split(" ")[0]);

  const aYears = a.year.split(" - ");
  const bYears = b.year.split(" - ");

  const aStartYear = parseYear(aYears[0]);
  const bStartYear = parseYear(bYears[0]);

  // Sort by start year in descending order
  if (bStartYear !== aStartYear) {
    return bStartYear - aStartYear;
  }

  // If start years are the same, sort by end year in descending order
  const aEndYear = aYears.length > 1 ? parseYear(aYears[1]) : aStartYear;
  const bEndYear = bYears.length > 1 ? parseYear(bYears[1]) : bStartYear;

  return bEndYear - aEndYear;
}
