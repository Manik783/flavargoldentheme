import { AlertTriangle } from "lucide-react";
import React, { useState, useRef } from "react";

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filter: string) => {
    const newFilter = selectedFilter === filter ? "" : filter;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  const toggleBaseClass = "relative flex items-center w-14 h-7 rounded-full transition-all duration-300";

  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide whitespace-nowrap w-full" ref={scrollRef}>
      <div className="flex space-x-2 items-center">
        {/* Veg Toggle */}
        <button
          className={`${toggleBaseClass} ${selectedFilter === "veg" ? "bg-white" : "bg-gray-100"}`}
          onClick={() => toggleFilter("veg")}
        >
          <div
            className={`absolute flex items-center transition-all duration-300
              ${selectedFilter === "veg" ? "translate-x-1" : "translate-x-7"}`}
          >
            <div className="relative flex items-center">
              {/* Green stripe that extends horizontally */}
              <div className={`absolute left-0 h-5 rounded-sm transition-all duration-300 flex items-center justify-center
                ${selectedFilter === "veg" ? "w-10 bg-green-600" : "w-5 bg-white border border-gray-300"}`}>
                {/* Maintaining original green dot */}
                <div className="w-2 h-2 rounded-full bg-green-600" />
              </div>
            </div>
          </div>
        </button>

        {/* Non-Veg Toggle */}
        <button
          className={`${toggleBaseClass} ${selectedFilter === "non-veg" ? "bg-white" : "bg-gray-100"}`}
          onClick={() => toggleFilter("non-veg")}
        >
          <div
            className={`absolute flex items-center transition-all duration-300
              ${selectedFilter === "non-veg" ? "translate-x-1" : "translate-x-7"}`}
          >
            <div className="relative flex items-center">
              {/* Red stripe that extends horizontally */}
              <div className={`absolute left-0 h-5 rounded-sm transition-all duration-300 flex items-center justify-center
                ${selectedFilter === "non-veg" ? "w-10 bg-red-500" : "w-5 bg-white border border-gray-300"}`}>
                {/* Maintaining original red triangle */}
                <AlertTriangle className="w-3 h-3 text-red-500 fill-red-500" />
              </div>
            </div>
          </div>
        </button>

        {/* Category Buttons */}
        {["Recommended", "Indian Cuisine", "Indian Starters", "Chinese", "Desserts"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
              ${selectedFilter === category.toLowerCase().replace(/\s+/g, "-")
                ? "bg-orange-100 text-black border-orange-300"
                : "bg-white text-black border-gray-300"}`}
            onClick={() => toggleFilter(category.toLowerCase().replace(/\s+/g, "-"))}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterChips;