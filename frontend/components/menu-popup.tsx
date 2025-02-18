import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
}

const menuCategories = [
  { name: "Quick Bites", count: 2 },
  { name: "Main Course", count: 10 },
  { name: "Momo's", count: 12 },
  { name: "Rolls", count: 7 },
  { name: "Tandoor Breads", count: 4 },
  { name: "Sizzlers", count: 6 },
  { name: "Indian Starters", count: 8 },
];

export function MenuPopup({ isOpen, onClose }: MenuPopupProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Menu Popup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.3,
              y: 30,
              transformOrigin: "center center"
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transformOrigin: "center center"
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
              y: 30,
              transformOrigin: "center center"
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }}
            className="fixed bottom-6 right-6 z-50 w-52 flex justify-center"
          >
            <div className="bg-[#E05D3A] rounded-[12px] shadow-lg overflow-hidden w-full">
              {menuCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="flex justify-between items-center px-4 py-2 hover:bg-[#d44d2a] transition-colors cursor-pointer"
                >
                  <span className="text-white text-sm font-medium">
                    {category.name}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {category.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}