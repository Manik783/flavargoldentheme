"use client";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import Link from "next/link";

interface HeaderProps {
  onSearch: (term: string) => void; // Callback for search functionality
 
}
const restaurantName = localStorage.getItem("restaurantName"); // Restaurant Name
const rest_id = localStorage.getItem("rest_id"); // Restaurant ID
export function Header({ onSearch }: HeaderProps) {
  return (
    <div className="px-4 pt-2 space-y-4 bg-white">
      {/* Location Section */}
      <div className="flex items-center gap-3">
        {/* Clickable Icon */}
        <Link href={`/${rest_id}`}> {/* Use restId in the link */}
          <button className="p-2 bg-[#FEF3EF] border border-[#E89F8E] rounded-full">
            <MapPin className="w-5 h-5 text-[#E05D3A]" />
          </button>
        </Link>
        {/* Location Text */}
        <div>
          <p className="text-xs text-[#E08972] font-medium">You're at</p>
          <p className="text-sm font-semibold text-black">{restaurantName}</p> {/* Use restaurantName prop */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search menu, restaurant or etc"
          className="w-full pl-12 pr-12 py-3 bg-[#FEF3EF] border border-[#E89F8E] rounded-full text-sm text-gray-700 focus:outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <SlidersHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}