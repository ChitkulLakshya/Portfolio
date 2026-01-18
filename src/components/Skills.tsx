const Skills = () => {
  // Simple list of skills to display horizontally
  const skills = [
    "React",
    "Next.js",
    "Express",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "Firebase",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "AI Integration",
    "Google console",
    "Docker",
    "Git",
  ];

  return (
    <section id="stack" className="py-16 px-4 border-t border-black/10" style={{ backgroundColor: '#D3D3D3' }}>
      <div className="container mx-auto max-w-7xl">
        {/* Infinite Marquee Skills List */}
        <div className="relative overflow-hidden whitespace-nowrap w-full mask-gradient">
          <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: scroll 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

          <div className="animate-marquee inline-block">
            {/* Original List */}
            {skills.map((skill, index) => (
              <span
                key={`original-${index}`}
                className="text-black text-lg md:text-xl font-light inline-block mx-8 md:mx-12 hover:opacity-60 transition-opacity cursor-default"
              >
                {skill}
              </span>
            ))}

            {/* Duplicate List for Seamless Loop */}
            {skills.map((skill, index) => (
              <span
                key={`duplicate-${index}`}
                className="text-black text-lg md:text-xl font-light inline-block mx-8 md:mx-12 hover:opacity-60 transition-opacity cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
