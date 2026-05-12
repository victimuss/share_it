import { motion } from "motion/react";
import { X } from "lucide-react";

interface ImagePreviewModalProps {
  selectedSlide: any;
  onClose: () => void;
}

const ImagePreviewModal = ({ selectedSlide, onClose }: ImagePreviewModalProps) => {
  if (!selectedSlide) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
        <img
          src={selectedSlide.src}
          alt={selectedSlide.title}
          className="w-full h-full object-contain rounded-xl shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center">
          <h3 className="text-2xl font-bold text-white">{selectedSlide.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImagePreviewModal;
