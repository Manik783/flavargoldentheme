"use client";
import React from "react";

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  const filters = [
    { id: "veg", label: "Veg" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "recommended", label: "Recommended" },
    { id: "indian", label: "Indian Cuisine" },
  ];

  return (
    <div className="flex gap-3 p-5 overflow-x-auto bg-[#121212] no-scrollbar border-b gold-gradient-border" style={{borderWidth: '0 0 1px 0'}}>
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-[10px] whitespace-nowrap text-sm font-medium transition-all duration-200
          ${activeFilter === "all" 
            ? "gold-gradient-bg text-[#121212] shadow-[0_0_15px_rgba(160,148,96,0.3)]" 
            : "bg-[#000000] border gold-gradient-border hover:shadow-[0_0_10px_rgba(160,148,96,0.2)]"}`}
        style={activeFilter !== "all" ? {borderWidth: '1px'} : {}}
      >
        {activeFilter !== "all" && (
          <span className="gold-gradient-text">All</span>
        )}
        {activeFilter === "all" && "All"}
      </button>
      
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-[10px] whitespace-nowrap text-sm font-medium transition-all duration-200
            ${activeFilter === filter.id 
              ? "gold-gradient-bg text-[#121212] shadow-[0_0_15px_rgba(160,148,96,0.3)]" 
              : "bg-[#000000] border gold-gradient-border hover:shadow-[0_0_10px_rgba(160,148,96,0.2)]"}`}
          style={activeFilter !== filter.id ? {borderWidth: '1px'} : {}}
        >
          {activeFilter !== filter.id && (
            <span className="gold-gradient-text">{filter.label}</span>
          )}
          {activeFilter === filter.id && filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterChips