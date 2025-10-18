import { Bot, Code, Paintbrush } from "lucide-react";
import { Card } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Paintbrush,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive, and user-centered designs that provide excellent user experiences across all devices and platforms.",
      features: ["Responsive Design", "Modern Aesthetics", "User Research", "Prototyping"],
    },
    {
      icon: Code,
      title: "Web Development",
      description:
        "Building robust, scalable web applications using cutting-edge technologies like React, Next.js, and modern backend frameworks.",
      features: ["Full Stack Development", "API Integration", "Performance Optimization", "SEO"],
    },
    {
      icon: Bot,
      title: "AI Automation",
      description:
        "Implementing intelligent automation solutions to streamline workflows, from email automation to certificate generation and beyond.",
      features: ["Email Automation", "Certificate Generation", "Process Automation", "AI Integration"],
    },
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive solutions for your digital needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-background" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
