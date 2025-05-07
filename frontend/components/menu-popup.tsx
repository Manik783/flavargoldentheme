"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
  dishes: {
    category: string;
    items: {
      _id: string;
      name: string;
      price: string | number;
      serves: number;
      isVeg: boolean;
      description: string;
      image: string;
    }[];
  }[];
}

export function MenuPopup({ isOpen, onClose, buttonPosition, dishes }: MenuPopupProps) {
  const [popupPosition, setPopupPosition] = useState({ top: 0, right: 0 });
  
  useEffect(() => {
    if (isOpen) {
      // Calculate position to ensure it stays on screen
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Position popup above the button if there's enough space, otherwise below
      const popupHeight = Math.min(windowHeight * 0.6, 400); // Max height of 400px or 60% of window
      
      let top = buttonPosition.y - popupHeight / 2; // Center vertically to button
      // Keep popup within vertical bounds
      top = Math.max(20, Math.min(windowHeight - popupHeight - 20, top));
      
      // Position popup to the left of the button
      let right = windowWidth - buttonPosition.x + 20;
      // Ensure it doesn't go off-screen horizontally
      right = Math.max(20, Math.min(windowWidth - 300, right));
      
      setPopupPosition({ top, right });
    }
  }, [isOpen, buttonPosition]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/0" onClick={onClose}>
      <div 
        className="absolute bg-black rounded-[10px] shadow-xl w-max max-w-[90vw] max-h-[80vh] overflow-auto gold-gradient-border"
        style={{
          top: popupPosition.top,
          right: popupPosition.right,
          transform: 'translate(0, -50%)',
          borderWidth: '1px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b gold-gradient-border" style={{borderWidth: '0 0 1px 0'}}>
          <h3 className="text-xl font-semibold gold-gradient-text">Menu</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-[10px] hover:bg-[#0a0a0a]"
            style={{color: '#A09460'}}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="divide-y gold-gradient-border" style={{borderWidth: '0'}}>
          {dishes.map((category) => (
            <div key={category.category} className="p-4">
              <h4 className="gold-gradient-text font-semibold mb-2">{category.category}</h4>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item._id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-[5px] gold-gradient-bg"></div>
                    <span className="text-white">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}