import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Papa from "papaparse";

// CSV URL from Google Sheets (Published)
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBmzSsSKZVU9PIdlTUsaeB63RDOOESI3ekrf-argndAUBT39kUeJDy_J6Mt4tQv96iCcDXLBPl8g99/pub?output=csv";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  url: string;
  github: string;
}

// Ensure URLs start with http/https
const safeUrl = (url: string) => (url.startsWith("http") ? url : `https://${url}`);

const fetchProjects = async (): Promise<Project[]> => {
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

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchInterval: 60000,
    retry: 2,
  });

  if (isError) toast.error("Failed to load projects. Please check your configuration.");

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#D3D3D3' }}>
      <Navbar />
      <main className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-black">Live Projects</h1>
            <p className="text-black text-lg max-w-2xl mx-auto">
              Explore interactive previews of my work in web development, AI integration, and automation.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-black">Loading projects...</p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-black text-lg">
                No projects found. Add projects to your Google Sheet to get started.
              </p>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group hover:border-primary/50 transition-all duration-300 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <a
                          href={safeUrl(project.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          View Live
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      {project.github && (
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={safeUrl(project.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.github && (
                      <div className="flex items-center gap-2 pt-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={safeUrl(project.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
