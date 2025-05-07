import { ShoppingCart, Sparkles } from "lucide-react";
import React from "react";

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  serves: number;
  image: string;
  isVeg: boolean;
  description: string;
  modelSrc: string;
  iosSrc: string;
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onAdd: () => void;
  onViewAR: () => void;
}

const VegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#117C3F" />
    <circle cx="6" cy="6" r="3" fill="#117C3F" />
  </svg>
);

const NonVegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="white" stroke="#FF0000" />
    <path d="M5.35048 2.625C5.70392 2.0625 6.54608 2.0625 6.89952 2.625L10.0726 8.25C10.4261 8.8125 10.0425 9.5 9.42306 9.5H2.82694C2.20745 9.5 1.82391 8.8125 2.17735 8.25L5.35048 2.625Z" fill="#FF0000" />
  </svg>
);

export function FoodCard({
  name,
  price,
  serves,
  image,
  isVeg,
  quantity,
  onQuantityChange,
  onAdd,
  onViewAR,
}: Omit<FoodCardProps, 'id' | 'modelSrc' | 'iosSrc' | 'description'>) {
  // Get a pseudo-random value based on the dish name to determine if it's recommended
  const isRecommended = name.charCodeAt(0) % 5 === 0;
  
  return (
    <div className="premium-card p-5 mb-4">
      <div className="flex justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {isVeg ? <VegIcon /> : <NonVegIcon />}
            </div>
            {isRecommended && (
              <div className="flex items-center text-xs font-medium">
                <Sparkles size={14} className="mr-1" style={{color: '#A09460'}} />
                <span className="gold-gradient-text">Chef&apos;s Special</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-bold gold-gradient-text text-lg font-playfair">{name}</h3>
            <p className="font-medium gold-gradient-text">₹{price}</p>
            <p className="text-xs text-gray-400">Serves {serves}</p>
          </div>
          
          <div>
            {quantity > 0 ? (
              <div className="flex items-center px-3 py-1 rounded-[10px] font-semibold text-sm w-fit bg-[#000000] shadow-[0_0_10px_rgba(160,148,96,0.1)] gold-gradient-border" style={{borderWidth: '1px'}}>
                <button 
                  className="font-bold px-2 hover:scale-110 transition-transform" 
                  onClick={() => onQuantityChange(-1)}
                  style={{color: '#A09460'}}
                >
                  -
                </button>
                <span className="gold-gradient-text font-semibold px-3">{quantity}</span>
                <button 
                  className="font-bold px-2 hover:scale-110 transition-transform" 
                  onClick={() => onQuantityChange(1)}
                  style={{color: '#A09460'}}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="flex items-center gap-2 px-4 py-1.5 rounded-[10px] font-semibold bg-[#000000] hover:bg-[#0a0a0a] hover:shadow-[0_0_15px_rgba(160,148,96,0.2)] transition-all duration-200 gold-gradient-border"
                style={{borderWidth: '1px'}}
              >
                <span className="gold-gradient-text">ADD</span>
                <ShoppingCart className="w-4 h-4" style={{stroke: '#A09460'}} />
              </button>
            )}
          </div>
        </div>

        <div className="relative w-[174px] h-[131px]">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-[174px] h-[131px] object-cover rounded-[10px] shadow-md"
          />
          <div className="absolute bottom-[-12px] right-0 left-0 flex justify-center">
            <button
              className="luxury-button text-xs px-3 py-1 rounded-[10px] transform transition-all duration-200 hover:scale-105"
              onClick={onViewAR}
            >
              View in AR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
