import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchProjects } from "@/lib/api";

const safeUrl = (url: string) => (url.startsWith("http") ? url : `https://${url}`);

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchInterval: 60000,
    retry: 2,
  });

  if (isError) toast.error("Failed to load projects. Please check your configuration.");

  return (
    <PageLayout className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#D3D3D3' }}>
      <main className="pt-20 pb-20 px-4">
        <div className="mx-auto w-full px-4">

          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <p className="text-black text-lg max-w-2xl mx-auto">
              <br />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group bg-white hover:border-primary/50 transition-all duration-300 overflow-hidden animate-fade-in rounded-2xl shadow-md"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Buttons — Rounded Pebble */}
                    <div className="absolute inset-0 bg-gradient-to-t 
                            from-background/80 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300 
                            flex items-end justify-center pb-4 gap-2">

                      {/* Live Button */}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full px-4 py-1 shadow-md"
                        asChild
                      >
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

                      {/* GitHub Button */}
                      {project.github && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full px-4 py-1 shadow-md"
                          asChild
                        >
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

                    {/* 🔥 Removed GitHub button from bottom */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default Projects;
