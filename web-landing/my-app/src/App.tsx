import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Layers, Package, Mail, CreditCard } from "lucide-react";

// UI Components
import Dock from './components/ui/Dock';

// Sections
import Background from "./components/sections/Background";
import Hero from "./components/sections/Hero";
import ProductShowcase from "./components/sections/ProductShowcase";
import CTASection from "./components/sections/CTASection";
import Branding from "./components/sections/Branding";

// Modals
import StackModal from "./components/modals/StackModal";
import ProductModal from "./components/modals/ProductModal";
import ContactModal from "./components/modals/ContactModal";
import BuyModal from "./components/modals/BuyModal";
import DemoModal from "./components/modals/DemoModal";
import ImagePreviewModal from "./components/modals/ImagePreviewModal";

function App() {
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<any>(null);

  const dockItems = [
    {
      icon: <Layers size={18} color="white" />,
      label: 'Stack',
      onClick: () => setIsStackModalOpen(true)
    },
    {
      icon: <Package size={18} color="white" />,
      label: 'Product',
      onClick: () => setIsProductModalOpen(true)
    },
    {
      icon: <Mail size={18} color="white" />,
      label: 'Contact',
      onClick: () => setIsContactModalOpen(true)
    },
    {
      icon: <CreditCard size={18} color="white" />,
      label: 'Buy',
      onClick: () => setIsBuyModalOpen(true)
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden scroll-smooth">
      {/* Visual Foundation */}
      <Background />
      <Branding />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        
        <ProductShowcase 
          onSlideClick={setSelectedSlide}
          onDemoClick={() => setIsDemoModalOpen(true)}
        />
        
        <CTASection />
      </main>

      {/* Navigation Layer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      {/* Modals & Overlays */}
      <AnimatePresence>
        <StackModal 
          isOpen={isStackModalOpen} 
          onClose={() => setIsStackModalOpen(false)} 
        />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
        <ProductModal 
          isOpen={isProductModalOpen} 
          onClose={() => setIsProductModalOpen(false)} 
        />
        <BuyModal 
          isOpen={isBuyModalOpen} 
          onClose={() => setIsBuyModalOpen(false)} 
        />
        <DemoModal 
          isOpen={isDemoModalOpen} 
          onClose={() => setIsDemoModalOpen(false)} 
        />
        <ImagePreviewModal 
          selectedSlide={selectedSlide} 
          onClose={() => setSelectedSlide(null)} 
        />
      </AnimatePresence>
    </div>
  );
}

export default App;