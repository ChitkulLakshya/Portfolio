import { Briefcase, GraduationCap, Users } from "lucide-react";
import { Card } from "./ui/card";

const About = () => {
  const experiences = [
    {
      icon: Briefcase,
      title: "Tech Lead",
      organization: "Vishwam AI",
      description: "Leading technical development and AI integration projects",
    },
    {
      icon: Users,
      title: "Active Member",
      organization: "Cloud Community Club",
      description: "Contributing to open-source networks and AI/automation projects",
    },
    {
      icon: GraduationCap,
      title: "B.Tech Student",
      organization: "Sreenidhi Institute of Science and Technology",
      description: "3rd Year - Computer Science & Engineering",
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A passionate developer dedicated to creating impactful solutions through code
            </p>
          </div>

          {/* Bio */}
          <Card className="p-8 bg-card border-border space-y-4">
            <div className="space-y-4 text-lg">
              <p className="flex items-start gap-3">
                <span className="text-2xl">💻</span>
                <span>
                  Passionate Full Stack Developer skilled in building modern web and mobile apps.
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <span>
                  Interested in AI tools and automation to enhance productivity and creativity.
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <span>
                  Proficient in HTML, React, Next.js, Java, JavaScript, and Python for end-to-end development.
                </span>
              </p>
            </div>
          </Card>

          {/* Experience & Education */}
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <exp.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-primary text-sm">{exp.organization}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Hackathons Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-2xl">🏆</span>
              <span className="text-primary font-medium">Multiple Hackathon Participant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
