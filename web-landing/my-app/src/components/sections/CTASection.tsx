const CTASection = () => {
  return (
    <section className="relative w-full py-32 px-4 z-10 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-[#120F17]/50 border border-white/10 rounded-[3.5rem] p-10 md:p-20 backdrop-blur-3xl text-center space-y-10 shadow-2xl">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent font-heading tracking-tight leading-tight">
            Secure Your Global EdTech Opportunity
          </h2>
          <p className="text-white/60 text-lg md:text-2xl font-sans leading-relaxed max-w-4xl mx-auto font-light">
            Spark Edu is a proven, scalable engine, ready to bypass months of R&D. Capture the nascent trustless learning market with a turnkey architectural asset. All source code transfers and payments are handled through a trusted escrow service for complete security.
          </p>
        </div>

        <div className="pt-8 space-y-6">
          <a
            href="https://indiemaker.com/listings/spark-ai-powered-trustless-edtech-with-zkp-authentication"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-14 py-6 rounded-full font-bold text-xl md:text-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(255,255,255,0.2)] active:scale-95"
          >
            Acquire Full IP on Indiemaker →
          </a>
          <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-bold font-sans">
            (Secure escrow transaction supported.)
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
