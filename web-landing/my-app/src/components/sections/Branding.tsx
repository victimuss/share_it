import GradientText from "../ui/GradientText";

const Branding = () => {
  return (
    <div className="fixed top-0 right-0 flex flex-col items-end pt-[120px] md:pt-12 pr-4 md:pr-[10vw] z-20 pointer-events-none">
      <div className="flex flex-col items-center">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B497CF"]}
          animationSpeed={8}
          showBorder={false}
          className="text-4xl md:text-5xl font-bold !m-0 font-heading tracking-tighter"
        >
          Spark
        </GradientText>

        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: '#B497CF' }}
        >
          <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default Branding;
