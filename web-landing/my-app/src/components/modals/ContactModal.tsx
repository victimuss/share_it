import { motion } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
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
        className="relative w-full max-w-xl pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SpotlightCard className="p-8 md:p-10 bg-[#120F17]/90 border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] bg-clip-text text-transparent">
                Initiate a Partnership
              </h2>
              <p className="text-white/60 mt-4 text-base leading-relaxed font-light">
                Ready to integrate next-generation EdTech into your ecosystem? We are currently open for white-label licensing, technical audits, and strategic acquisition inquiries.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 group hover:border-[#FF9FFC]/30 transition-colors">
                <h3 className="text-sm uppercase tracking-widest text-[#FF9FFC] font-bold">Business & Licensing</h3>
                <a href="mailto:business@spark-edu.ru" className="text-xl md:text-2xl font-medium block hover:text-[#FF9FFC] transition-colors">
                  business@spark-edu.ru
                </a>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 group hover:border-[#B497CF]/30 transition-colors">
                <h3 className="text-sm uppercase tracking-widest text-[#B497CF] font-bold">Direct Communication</h3>
                <a href="https://t.me/p3ychok1lla" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-medium block hover:text-[#B497CF] transition-colors">
                  @p3ychok1lla <span className="text-sm text-white/40 font-normal ml-2">(Telegram)</span>
                </a>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
