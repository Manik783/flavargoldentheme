"use client";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onSearch: (term: string) => void; // Callback for search functionality
}

export function Header({ onSearch }: HeaderProps) {
  // Use state to store values from localStorage
  const [restaurantName, setRestaurantName] = useState<string>("Restaurant");
  const [restId, setRestId] = useState<string>("1");
  
  // Only access localStorage on the client side using useEffect
  useEffect(() => {
    // Get values from localStorage safely on client-side only
    const storedName = localStorage.getItem("restaurantName");
    const storedId = localStorage.getItem("rest_id");
    
    if (storedName) {
      try {
        setRestaurantName(JSON.parse(storedName));
      } catch (e) {
        console.error("Error parsing restaurantName from localStorage:", e);
      }
    }
    
    if (storedId) {
      try {
        setRestId(JSON.parse(storedId));
      } catch (e) {
        console.error("Error parsing rest_id from localStorage:", e);
      }
    }
  }, []);

  return (
    <div className="px-5 pt-3 pb-5 space-y-5 bg-[#121212] border-b border-[#A09460]/20 shadow-md">
      {/* Location Section */}
      <div className="flex items-center gap-3">
        {/* Clickable Icon */}
        <Link href={`/${restId}`}> {/* Use restId in the link */}
          <button className="p-2 bg-[#232323] border border-[#A09460] rounded-full shadow-[0_0_10px_rgba(160,148,96,0.1)] hover:shadow-[0_0_15px_rgba(160,148,96,0.2)] transition-all duration-200">
            <MapPin className="w-5 h-5 text-[#A09460]" />
          </button>
        </Link>
        {/* Location Text */}
        <div>
          <p className="text-xs text-[#A09460] font-medium">You&apos;re at</p>
          <p className="text-base font-playfair font-semibold text-white">{restaurantName}</p> {/* Use restaurantName state */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A09460]" />
        <input
          type="text"
          placeholder="Search menu, restaurant or etc"
          className="w-full pl-12 pr-12 py-3 bg-[#232323] border border-[#A09460]/30 rounded-full text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#A09460] shadow-[0_0_10px_rgba(160,148,96,0.05)] hover:shadow-[0_0_15px_rgba(160,148,96,0.1)] transition-all duration-200"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:rotate-12 transition-transform duration-200">
          <SlidersHorizontal className="w-5 h-5 text-[#A09460]" />
        </button>
      </div>
    </div>
  );
}
