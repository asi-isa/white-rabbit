import { motion } from "framer-motion";

interface RevealTxtProps {
  txt: string;
}

const RevealTxt = ({ txt }: RevealTxtProps) => {
  return (
    <p>
      {txt.split("").map((char, i) => {
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i / 8 }}
          >
            {char}
          </motion.span>
        );
      })}
    </p>
  );
};

export default RevealTxt;
