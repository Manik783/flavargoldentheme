"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FilterChips } from "@/components/filter-chips"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { MenuPopup } from "@/components/menu-popup"
import { motion, AnimatePresence } from "framer-motion";
import { CartBar } from "@/components/cart-bar"
import { CartScreen } from "@/components/cart-screen"
import { useSearchParams } from "next/navigation"
import React from "react"

interface FoodItem {
  _id: string
  name: string
  price: number
  serves: number
  isVeg: boolean
  description: string
  image: string
  glb_url: string
  usdz_url: string
}

interface CartItem extends Omit<FoodItem, '_id'> {
  id: string
}

export default function MenuPage({ params }) {
  const searchParams = useSearchParams()
  const { rest_id } = params
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuButtonPosition, setMenuButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/dishes/${rest_id}`)
        const data = await response.json()
        setFoodItems(data.dishes)
      } catch (err) {
        setError("Failed to load menu.")
        console.error("Error fetching menu:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [rest_id])

  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null)
  const [isAROpen, setIsAROpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  // Handle menu button click
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget.getBoundingClientRect()
    setMenuButtonPosition({
      x: button.right,
      y: button.top + (button.height / 2)
    })
    setIsMenuOpen(!isMenuOpen) // Toggle menu state
  }

  // Filter items based on search and category
  const filteredItems = foodItems
    .filter((item) => {
      if (filter === "veg") return item.isVeg
      if (filter === "non-veg") return !item.isVeg
      return true
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const cartItemsCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) + delta
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: newQty }
    })
  }

  const cartItems: CartItem[] = foodItems
    .filter((item) => cart[item._id])
    .map((item) => ({
      ...item,
      id: item._id
    }))

  if (loading) return <div className="text-center py-10">Loading menu...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  return (
    <main className="min-h-screen pb-20">
      <Header onSearch={setSearchTerm} />
      <FilterChips activeFilter={filter} onFilterChange={setFilter} />

      <div className="divide-y">
        {filteredItems.map((item) => (
          <FoodCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={parseFloat(item.price.toString())}
            serves={item.serves}
            isVeg={item.isVeg}
            description={item.description}
            image={item.image}
            modelSrc={item.glb_url}
            iosSrc={item.usdz_url}
            quantity={cart[item._id] || 0}
            onQuantityChange={(delta) => updateQuantity(item._id, delta)}
            onAdd={() => addToCart(item._id)}
            onViewAR={() => {
              setSelectedDish(item)
              setIsAROpen(true)
            }}
          />
        ))}
      </div>

      {/* Menu Button */}
<AnimatePresence mode="wait">
  {!isMenuOpen && (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{
        opacity: { duration: 0.2, ease: "easeInOut" },
        scale: { duration: 0.3 },
        y: { duration: 0.3 }
      }}
      className="fixed w-[65px] h-[65px] bottom-6 right-6 bg-[#E05D3A] border border-[#E05D3A] rounded-[50px] flex flex-col items-center justify-center gap-1 shadow-lg z-40 transition-transform hover:scale-105"
      onClick={handleMenuClick}
    >
      <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20.25V11.25C20 9.12825 20 8.06737 19.414 7.40925C18.828 6.75 17.886 6.75 16 6.75H4V20.25C4 22.3706 4 23.4315 4.586 24.0907C5.172 24.75 6.114 24.75 8 24.75H16C17.886 24.75 18.828 24.75 19.414 24.0907C20 23.4315 20 22.3706 20 20.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12.6874C12.7956 12.6874 13.5587 13.0627 14.1213 13.7309C14.6839 14.399 15 15.3051 15 16.2499M12 12.6874C11.2044 12.6874 10.4413 13.0627 9.87868 13.7309C9.31607 14.399 9 15.3051 9 16.2499M12 12.6874V11.4999M15 16.2499H16M15 16.2499H12H9M9 16.2499H8M8 21H16M4 6.74985L11.385 3.07568C13.034 2.25511 13.858 1.84423 14.515 2.05442C14.941 2.19036 15.3172 2.4897 15.585 2.90587C16 3.5495 16 4.61589 16 6.74985" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        <rect width="10" height="13" transform="translate(7 10)" fill="#E05D3A"/>
      </svg>
      <span className="text-white text-xs font-medium">MENU</span>
    </motion.button>
  )}
</AnimatePresence>

<MenuPopup 
  isOpen={isMenuOpen} 
  onClose={() => setIsMenuOpen(false)} 
  buttonPosition={menuButtonPosition}
/>

      {cartItemsCount > 0 && (
        <CartBar 
          itemCount={cartItemsCount} 
          onViewCart={() => setIsCartOpen(true)} 
        />
      )}

      {selectedDish && <ARScreen isOpen={isAROpen} onClose={() => setIsAROpen(false)} dish={selectedDish} />}

      <MenuPopup 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        buttonPosition={menuButtonPosition}
      />

      <CartScreen
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        quantities={cart}
        onUpdateQuantity={(itemId, delta) => {
          updateQuantity(itemId, delta)
        }}
      />
    </main>
  )
}