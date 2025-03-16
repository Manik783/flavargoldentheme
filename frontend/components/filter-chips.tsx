import { AlertTriangle } from "lucide-react"
import React, { useState, useRef } from "react"

interface FilterChipsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter)
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleFilter = (filter: string) => {
    const newFilter = selectedFilter === filter ? "" : filter
    setSelectedFilter(newFilter)
    onFilterChange(newFilter)
  }

  // Base class for the pill container with added border color
  const toggleBaseClass = "relative flex items-center w-[59px] h-8 rounded-[20px] transition-all duration-300 border border-[#80808066]"

  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide whitespace-nowrap w-full" ref={scrollRef}>
      <div className="flex space-x-2 items-center">
        {/* Veg Toggle */}
        <button
          className={`${toggleBaseClass} ${selectedFilter === "veg" ? "bg-white" : "bg-white"}`}
          onClick={() => toggleFilter("veg")}
        >
          {/* Background color strip */}
          <div
            className={`absolute h-[9px] rounded-[20px] transition-all duration-300 left-3
              ${selectedFilter === "veg" ? "w-[33px] bg-green-600" : "w-[16px] bg-white"}`}
          />
          {/* Square indicator that slides */}
          <div
            className={`absolute h-4 w-4 rounded-[2px] bg-white border border-green-600 transition-all duration-300 flex items-center justify-center
              ${selectedFilter === "veg" ? "translate-x-8" : "translate-x-3"}`}
          >
            <div className="w-2 h-2 rounded-full bg-green-600" />
          </div>
        </button>

        {/* Non-Veg Toggle */}
        <button
          className={`${toggleBaseClass} ${selectedFilter === "non-veg" ? "bg-white" : "bg-white"}`}
          onClick={() => toggleFilter("non-veg")}
        >
          {/* Background color strip */}
          <div
            className={`absolute h-[9px] rounded-[20px] transition-all duration-300 left-3
              ${selectedFilter === "non-veg" ? "w-[33px] bg-red-500" : "w-[16px] bg-white"}`}
          />
          {/* Square indicator that slides */}
          <div
            className={`absolute h-4 w-4 rounded-[2px] bg-white border border-red-500 transition-all duration-300 flex items-center justify-center
              ${selectedFilter === "non-veg" ? "translate-x-8" : "translate-x-3"}`}
          >
            <AlertTriangle className="w-[10px] h-[10px] text-red-500 fill-red-500" />
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
  )
}

export default FilterChips