import Papa from "papaparse";

export const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBmzSsSKZVU9PIdlTUsaeB63RDOOESI3ekrf-argndAUBT39kUeJDy_J6Mt4tQv96iCcDXLBPl8g99/pub?output=csv";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  url: string;
  github: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    const projects: Project[] = parsed.data.map((row: any, index: number) => ({
      id: index + 1,
      title: row.title || "",
      description: row.description || "",
      image: row.image || "/placeholder.svg",
      tech: row.tech ? row.tech.split(",").map((t: string) => t.trim()) : [],
      url: row.url || "#",
      github: row.github || "",
    }));

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
