import { motion } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";
import { X } from "lucide-react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ isOpen, onClose }: ProductModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl pointer-events-auto max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <SpotlightCard className="p-8 md:p-12 bg-[#120F17]/95 border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent">
                The Product Ecosystem
              </h2>
              <p className="text-white/60 mt-4 text-lg font-light leading-relaxed">
                A fully autonomous environment for creating, moderating, and consuming educational content. Designed for zero-friction learning.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold border-b border-white/5 pb-4">User Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="text-[#5227FF] font-mono text-xs font-bold uppercase tracking-widest">Step 1</div>
                  <h4 className="text-xl font-bold">Voice Input</h4>
                  <p className="text-sm text-white/60 leading-relaxed">Users request a topic using natural voice commands. The platform completely eliminates the need for manual typing or complex catalog navigation.</p>
                </div>
                <div className="space-y-3">
                  <div className="text-[#FF9FFC] font-mono text-xs font-bold uppercase tracking-widest">Step 2</div>
                  <h4 className="text-xl font-bold">Generation & Moderation</h4>
                  <p className="text-sm text-white/60 leading-relaxed">The internal LLM synthesizes the audio request into a structured micro-course. A secondary AI layer instantly verifies the materials for accuracy and brand safety.</p>
                </div>
                <div className="space-y-3">
                  <div className="text-[#B497CF] font-mono text-xs font-bold uppercase tracking-widest">Step 3</div>
                  <h4 className="text-xl font-bold">Interactive Output</h4>
                  <p className="text-sm text-white/60 leading-relaxed">Within seconds, the system delivers a complete educational module: algorithmically generated flashcards, retention quizzes, and integrated media.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold border-b border-white/5 pb-4">Core Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex gap-4">
                  <div className="mt-1"><div className="w-2 h-2 rounded-full bg-[#5227FF]" /></div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white/90">Cryptographic Privacy (ZKP)</h4>
                    <p className="text-sm text-white/50">Authentication and sessions rely exclusively on Zero-Knowledge Proof protocols. Guaranteeing absolute user anonymity.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><div className="w-2 h-2 rounded-full bg-[#FF9FFC]" /></div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white/90">Offline-First Architecture</h4>
                    <p className="text-sm text-white/50">Lessons are intelligently cached on the device, ensuring full application functionality even in airplane mode.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><div className="w-2 h-2 rounded-full bg-[#B497CF]" /></div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white/90">Content Management (CRUD)</h4>
                    <p className="text-sm text-white/50">The platform provides a complete data lifecycle. Users can generate private materials, as well as create, edit, and manage public libraries.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white/90">Global Localization</h4>
                    <p className="text-sm text-white/50">Built for international scalability. Features native support for 4 languages with dynamic switching and adaptive UI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
