import { motion } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";
import { X } from "lucide-react";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuyModal = ({ isOpen, onClose }: BuyModalProps) => {
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
        className="relative w-full max-w-3xl pointer-events-auto max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <SpotlightCard className="p-8 md:p-12 bg-[#120F17]/95 border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent">
                Acquisition & Licensing
              </h2>
              <p className="text-white/60 mt-4 text-base leading-relaxed font-light">
                Spark Edu is currently available for full intellectual property (IP) acquisition. This offering is designed for EdTech startups, corporate universities, and investment portfolios looking to bypass months of R&D and instantly deploy a market-ready AI ecosystem.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold border-b border-white/5 pb-4">The Asset Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Complete Source Code", desc: "React Native mobile frontend & FastAPI backend." },
                  { title: "AI Pipeline & Prompts", desc: "Proprietary LLM logic & dual-layer moderation." },
                  { title: "Cryptographic Modules", desc: "Full access to ZKP authentication architecture." },
                  { title: "Infrastructure Configuration", desc: "Docker, RabbitMQ, and database schemas." },
                  { title: "Documentation & Handoff", desc: "Comprehensive technical guides for scaling." }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="font-bold text-sm text-white/90">{item.title}</div>
                    <div className="text-xs text-white/50 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold">Transaction & Transfer</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We utilize a standardized and secure acquisition process. All code transfers and payments are handled through a trusted escrow service to guarantee maximum security for both parties.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#5227FF]/10 to-[#B497CF]/10 border border-white/10 rounded-3xl text-center space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Full IP Acquisition</h4>
                  <p className="text-sm text-white/60 max-w-md mx-auto">Transfer of 100% ownership, codebase, and exclusive commercial rights to the Spark Edu architecture.</p>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://indiemaker.com/listings/spark-ai-powered-trustless-edtech-with-zkp-authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
                  >
                    Acquire on Indiemaker
                  </a>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Secure escrow transaction supported</p>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
};

export default BuyModal;
