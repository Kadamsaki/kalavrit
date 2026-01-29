import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 8, filter: "blur(10px)" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="min-h-screen"
      data-testid="page-transition"
    >
      {children}
    </motion.div>
  );
}
