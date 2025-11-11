const Skills = () => {
  // Simple list of skills to display horizontally
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "AI Integration",
    "Docker",
    "Git",
  ];

  return (
    <section id="skills" className="py-16 px-4 border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-7xl">
        {/* Horizontal scrolling skills list */}
        <div className="flex items-center justify-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="text-white text-lg md:text-xl font-light whitespace-nowrap hover:opacity-60 transition-opacity cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
