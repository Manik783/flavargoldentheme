"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";

interface CartBarProps {
  itemCount: number;
  onViewCart: () => void;
}

export function CartBar({ itemCount, onViewCart }: CartBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 px-4 py-3 bg-gradient-to-t from-[#121212] to-[#121212]/95">
      <button
        onClick={onViewCart}
        className="w-full flex items-center justify-between bg-[#000000] py-3 px-5 rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] font-semibold transition-all duration-200 hover:shadow-[0_4px_25px_rgba(160,148,96,0.2)] hover:scale-[1.01] gold-gradient-border"
        style={{borderWidth: '1px'}}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" style={{color: '#A09460'}} />
            <span className="absolute -top-1 -right-1 flex items-center justify-center bg-[#121212] w-5 h-5 rounded-[5px] text-xs gold-gradient-border" style={{borderWidth: '1px'}}>
              <span className="gold-gradient-text">{itemCount}</span>
            </span>
          </div>
          <span className="font-playfair gold-gradient-text">View Cart</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="gold-gradient-text">Proceed</span>
          <span className="transform transition-transform group-hover:translate-x-1 gold-gradient-text">→</span>
        </div>
      </button>
    </div>
  );
}
