"use client";

import React from "react";
import { motion } from "framer-motion";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
  dishes: {
    category: string;
    items: {
      _id: string;
      name: string;
      price: string;
      serves: number;
      isVeg: boolean;
      description: string;
      image: string;
    }[];
  }[];
}

export function MenuPopup({ isOpen, onClose, buttonPosition, dishes }: MenuPopupProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4"
      style={{
        top: buttonPosition.y,
        left: buttonPosition.x,
      }}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        {dishes.map((categoryGroup) => (
          <div key={categoryGroup.category} className="mb-6">
            <h3 className="font-semibold text-lg mb-2">{categoryGroup.category}</h3>
            <div className="space-y-2">
              {categoryGroup.items.map((item) => (
                <div key={item._id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </motion.div>
  );
}