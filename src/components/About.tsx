const About = () => {
  return (
    <section id="about" className="py-32 px-4 border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
            Full Stack Developer
            <br />
            <span className="font-normal">Passionate about</span>
            <br />
            building digital solutions
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            I create modern web applications with cutting-edge technologies, specializing in React, Next.js, and AI integration to deliver innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
