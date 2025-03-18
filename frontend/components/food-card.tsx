import { ShoppingCart } from "lucide-react";
import React from "react";

interface FoodCardProps {
  id: number;
  name: string;
  price: number;
  serves: number;
  image: string;
  isVeg: boolean;
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
  id,
  name,
  price,
  serves,
  image,
  isVeg,
  quantity,
  onQuantityChange,
  onAdd,
  onViewAR,
}: FoodCardProps) {
  return (
    <div className="flex justify-between p-4" style={{ backgroundColor: "#FFFAF7" }}>
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {isVeg ? <VegIcon /> : <NonVegIcon />}
        </div>
        <div>
            {<h3 className="font-bold">{name}</h3>}
            <p className="font-medium">₹{price}   <br/> 
         <p className="text-xs text-gray-500">Serves {serves}</p>
         </p>
          </div>
         <br/>
        <div>
          {quantity > 0 ? (
            <div className="flex items-center border border-[#E05D3A] text-[#E05D3A] px-3 py-1 rounded-[9px] font-semibold text-sm w-fit">
              <button className="text-[#E05D3A] font-bold px-2" onClick={() => onQuantityChange(-1)}>
                -
              </button>
              <span className="text-[#E05D3A] font-semibold px-2">{quantity}</span>
              <button className="text-[#E05D3A] font-bold px-2" onClick={() => onQuantityChange(1)}>
                +
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 border border-[#E05D3A] text-[#E05D3A] px-3 py-1 rounded-[9px] font-semibold"
            >
              ADD
              <ShoppingCart className="stroke-[#E05D3A]" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[174px] h-[131px]">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-[174px] h-[131px] object-cover rounded-[15px]"
        />
        <button
          className="absolute bottom-[-15px] right-11 z-10 bg-white text-[#E05D3A] border border-[#E05D3A] text-xs px-3 py-1 rounded-[10px] shadow-sm font-medium w-[85px] h-[30px]"
          onClick={onViewAR}
        >
          View in AR
        </button>
      </div>
    </div>
  );
}
