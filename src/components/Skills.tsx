import { Code2, Cpu, Database, Layers, Palette, Server } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      icon: Palette,
      title: "Frontend Development",
      color: "text-primary",
      skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript"],
    },
    {
      icon: Server,
      title: "Backend Development",
      color: "text-secondary",
      skills: ["Node.js", "Python", "Java", "REST APIs", "Express.js"],
    },
    {
      icon: Cpu,
      title: "AI Integration",
      color: "text-primary",
      skills: ["Machine Learning", "AI Tools", "Prompt Engineering", "AI Automation"],
    },
    {
      icon: Code2,
      title: "Automation Tools",
      color: "text-secondary",
      skills: ["Email Automation", "Certificate Generation", "Workflow Automation", "Scripts"],
    },
    {
      icon: Database,
      title: "Database",
      color: "text-primary",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase"],
    },
    {
      icon: Layers,
      title: "Server Tools",
      color: "text-secondary",
      skills: ["Docker", "Git", "GitHub", "CI/CD", "Cloud Services", "Linux"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Skills & Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive toolkit for building modern applications
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-primary/10 ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-muted hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
