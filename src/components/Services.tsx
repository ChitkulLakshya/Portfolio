const Services = () => {
  return (
    <section id="services" className="py-32 px-4 border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
            What I Do
          </h2>
          <div className="grid md:grid-cols-3 gap-12 pt-12 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-light text-white">Web Development</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Building robust, scalable web applications with React, Next.js, and modern frameworks.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-light text-white">AI Integration</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Implementing intelligent automation and AI solutions to enhance productivity and creativity.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-light text-white">Full Stack Solutions</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                End-to-end development from intuitive interfaces to robust backend systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
