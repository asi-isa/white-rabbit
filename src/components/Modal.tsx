import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onBlur: () => void;
  children: ReactNode;
}

const Modal = ({ show, onBlur, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="absolute h-screen w-screen flex justify-center items-center"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur"
            onClick={onBlur}
          />

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
