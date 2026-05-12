import LiquidEther from "../ui/LiquidEther";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0">
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B497CF']}
        mouseForce={20}
        cursorSize={100}
        isViscous
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
      />
    </div>
  );
};

export default Background;
