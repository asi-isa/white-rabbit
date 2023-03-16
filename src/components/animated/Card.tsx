import { motion } from "framer-motion";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

import Divider from "../Divider";

interface CardProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

const Card = ({ title, onClose, children }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className="absolute border w-72 border-white/10 rounded-md p-4 bg-[var(--bg)] drop-shadow-[0_1px_4px_rgba(255,255,255,0.16)]"
    >
      <div className="mb-6">
        <div className="flex justify-between">
          <p className="text-lg">{title}</p>
          <IoIosClose
            onClick={onClose}
            className="text-2xl cursor-pointer transition-colors text-white/60 hover:text-white"
          />
        </div>

        <Divider direction="horizontal" />
      </div>
      {children}
    </motion.div>
  );
};

export default Card;
