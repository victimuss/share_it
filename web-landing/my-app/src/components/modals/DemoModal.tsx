import { motion } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";
import { X, Mail, Send } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SpotlightCard className="p-8 md:p-10 bg-[#120F17]/95 border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent font-heading">
                Access the Spark MVP
              </h2>
              <p className="text-white/60 mt-4 text-sm font-sans leading-relaxed">
                Ready to experience the future of EdTech? Choose your preferred way to connect and get instant access to the demo environment.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:business@spark-edu.ru?subject=Demo Request: Spark Edu"
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#5227FF]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#5227FF]/20 flex items-center justify-center text-[#5227FF]">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold">Contact via Email</div>
                  <div className="text-xs text-white/40">business@spark-edu.ru</div>
                </div>
              </a>

              <a
                href="https://t.me/p3ychok1lla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#FF9FFC]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF9FFC]/20 flex items-center justify-center text-[#FF9FFC]">
                  <Send size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold">Direct via Telegram</div>
                  <div className="text-xs text-white/40">@p3ychok1lla</div>
                </div>
              </a>
            </div>

            <div className="text-center pt-2">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                Typical response time: &lt; 2 hours
              </p>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
};

export default DemoModal;
