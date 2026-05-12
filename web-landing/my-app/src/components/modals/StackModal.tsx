import { motion } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";
import { X } from "lucide-react";

interface StackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StackModal = ({ isOpen, onClose }: StackModalProps) => {
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
        className="relative w-full max-w-3xl pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SpotlightCard className="p-8 md:p-12 bg-[#120F17]/90 border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent">
                Spark Edu: Architecture & Tech Stack
              </h2>
              <p className="text-white/60 mt-3 text-lg italic font-light">
                Built for scale, speed, and absolute privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF9FFC]">Generative AI Core</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  An advanced LLM pipeline integrated with voice recognition. Converts audio prompts into structured, interactive micro-courses in seconds. Protected by dual-layer automated AI moderation to ensure uncompromising content safety and brand protection.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#B497CF]">Cryptographic Security</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Powered by Zero-Knowledge Proof (ZKP) protocols. Users authenticate and learn with absolute anonymity. No passwords stored, zero data harvesting, eliminating the risk of personal data breaches.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#5227FF]">High-Load Backend</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Asynchronous, enterprise-grade microservices optimized for 10,000+ concurrent users. Driven by FastAPI, PostgreSQL, RabbitMQ, and Redis. Fully containerized and White-Label ready for instant global deployment.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Offline-First Mobile Client</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  A seamless cross-platform experience built on React Native. Leveraging Zustand and MMKV for intelligent local caching, allowing users to generate, store, and consume lessons flawlessly, even without an internet connection.
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
};

export default StackModal;
