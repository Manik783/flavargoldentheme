"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FilterChips } from "@/components/filter-chips"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { MenuPopup } from "@/components/menu-popup"
import { CartBar } from "@/components/cart-bar"
import { CartScreen } from "@/components/cart-screen"
import { Menu } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function MenuPage({params }) {
  const searchParams = useSearchParams()
  const { rest_id } = params; // Extracting the param// 
  const [foodItems, setFoodItems] = useState([]) // Store API data
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/dishes/${rest_id}`)
        const data = await response.json()
        setFoodItems(data.dishes) // ✅ Store API response
      } catch (err) {
        setError("Failed to load menu.")
        console.error("Error fetching menu:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [rest_id]) // Refetch when restaurant ID changes

  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDish, setSelectedDish] = useState(null)
  const [isAROpen, setIsAROpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  // Filter items based on search and category
  const filteredItems = foodItems
    .filter((item) => {
      if (filter === "veg") return item.isVeg
      if (filter === "non-veg") return !item.isVeg
      return true
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0)

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
            price={parseFloat(item.price)}
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

      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-5 h-5" />
        MENU
      </button>

      {cartItemsCount > 0 && <CartBar itemCount={cartItemsCount} onViewCart={() => setIsCartOpen(true)} />}

      {selectedDish && <ARScreen isOpen={isAROpen} onClose={() => setIsAROpen(false)} dish={selectedDish} />}

      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <CartScreen
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={foodItems.filter((item) => cart[item._id])}
        quantities={cart}
        onUpdateQuantity={updateQuantity}
      />
    </main>
  )
}
