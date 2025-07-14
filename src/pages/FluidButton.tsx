// src/components/FluidButton.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FluidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function FluidButton({
  children,
  className,
  onClick,
}: FluidButtonProps) {
  return (
    <motion.button
      type="submit"
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      initial={{ backgroundColor: "#475569", color: "#fff" }}
      whileHover={{
        backgroundColor: "#cbd5e1",
        color: "#000",
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ border: "none" }}
    >
      <motion.span
        className="absolute rounded-full bg-white opacity-20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          top: "50%",
          left: "50%",
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
