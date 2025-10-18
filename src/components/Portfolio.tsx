import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Portfolio</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Showcasing my work and contributions
            </p>
          </div>

          {/* GitHub CTA Card */}
          <Card className="p-12 bg-gradient-to-br from-card to-card/50 border-primary/20 text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Github className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Projects Coming Soon</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                I'm currently working on exciting projects that showcase my skills in Full Stack Development, 
                AI Integration, and Automation. Check out my GitHub to see my latest work and contributions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-primary"
                asChild
              >
                <a
                  href="https://github.com/ChitkulLakshya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  View GitHub Profile
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>

          {/* Placeholder for future projects */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              💡 This section will be updated with detailed project showcases soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
