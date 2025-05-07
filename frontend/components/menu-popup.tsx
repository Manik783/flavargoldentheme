"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const VegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#A09460" />
    <circle cx="6" cy="6" r="3" fill="#117C3F" />
  </svg>
);

const NonVegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="#000000" stroke="#A09460" />
    <path d="M5.35048 2.625C5.70392 2.0625 6.54608 2.0625 6.89952 2.625L10.0726 8.25C10.4261 8.8125 10.0425 9.5 9.42306 9.5H2.82694C2.20745 9.5 1.82391 8.8125 2.17735 8.25L5.35048 2.625Z" fill="#9A0101" />
  </svg>
);

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
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item._id} className="flex items-start gap-2">
                    <div className="flex items-center gap-2 min-w-[200px]">
                      <div className="w-2 h-2 rounded-[5px] gold-gradient-bg mt-1.5"></div>
                      <div className="flex flex-col">
                        <span className="text-white">{item.name}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {item.isVeg ? (
                            <div className="flex items-center text-xs font-medium">
                              <VegIcon />
                              <span className="gold-gradient-text ml-1">Veg</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-xs font-medium">
                              <NonVegIcon />
                              <span className="gold-gradient-text ml-1">Non-Veg</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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