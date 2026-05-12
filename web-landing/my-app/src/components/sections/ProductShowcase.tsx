import Carousel from "../ui/carousel";
import StarBorder from "../ui/StarBorder";
import { slideData } from "../../constants/slides";

interface ProductShowcaseProps {
  onSlideClick: (slide: any) => void;
  onDemoClick: () => void;
}

const ProductShowcase = ({ onSlideClick, onDemoClick }: ProductShowcaseProps) => {
  return (
    <section className="relative w-full flex flex-col items-center px-4 z-20">
      <div className="w-full max-w-7xl mx-auto pointer-events-auto flex flex-col items-center">
        <Carousel
          slides={slideData}
          onButtonClick={onSlideClick}
        />

        <div className="mt-32 mb-32">
          <StarBorder
            as="button"
            className="px-12 py-4 text-xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(82,39,255,0.3)]"
            color="#5227FF"
            speed="4s"
            onClick={onDemoClick}
          >
            Request Demo / Try the MVP
          </StarBorder>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
