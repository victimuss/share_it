import BlurText from "../ui/BlurText";

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-32 pb-0 px-4 z-20 font-sans">
      <div className="pointer-events-none flex flex-col items-center mb-32">
        <BlurText
          text="Welcome to new-era education."
          delay={200}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl text-purple-500 font-bold text-center mb-6 font-heading tracking-tight"
        />
        <BlurText
          text="Imagine learning any topic in the world, instantly, just by speaking into your phone. Welcome to Spark Edu — the next generation of digital education."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-lg md:text-xl text-purple-500/80 font-medium text-center max-w-4xl px-4 !m-0 font-sans"
        />
      </div>
    </section>
  );
};

export default Hero;
