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
}: FoodCardProps) {
  return (
    <div className="flex justify-between p-4" style={{ backgroundColor: "#FFFAF7" }}>
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 ${isVeg ? "bg-green-500" : "bg-red-500"} rounded-full`} />
          <h3 className="font-medium">{name}</h3>
        </div>
        <p className="text-[#E05D3A] font-medium">₹{price}</p>
        <p className="text-xs text-gray-500">Serves {serves}</p>
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
        {/* Image with correct dimensions */}
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-[174px] h-[131px] object-cover rounded-[15px]"
        />

        {/* "View in AR" button with exact size & placement */}
        <button
          className="absolute bottom-0 right-11 z-10 bg-white text-[#E05D3A] border border-[#E05D3A] text-xs px-3 py-1 rounded-[10px] shadow-sm font-medium w-[85px] h-[30px]"
          onClick={onViewAR}
        >
          View in AR
        </button>
      </div>
    </div>
  );
}
