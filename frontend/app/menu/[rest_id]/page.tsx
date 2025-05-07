"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FilterChips } from "@/components/filter-chips"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { MenuPopup } from "@/components/menu-popup"
import { CartBar } from "@/components/cart-bar"
import { CartScreen } from "@/components/cart-screen"
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
  category1?: string
  category2?: string
  category3?: string
  availability: boolean
}

interface CartItem extends Omit<FoodItem, '_id'> {
  id: string
}

// Add mock dishes for restaurant 3
const mockDishes = {
  "3": [
    {
      _id: "dish7",
      name: "Butter Chicken",
      price: 14.99,
      serves: 2,
      isVeg: false,
      description: "Tender chicken pieces in a rich, creamy tomato sauce",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
      glb_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-40-11_Paneer_Paratha.glb",
      usdz_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-40-11_Paneer_Paratha.usdz",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish8",
      name: "Vegetable Biryani",
      price: 12.99,
      serves: 2,
      isVeg: true,
      description: "Fragrant rice cooked with mixed vegetables and aromatic spices",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      glb_url: "",
      usdz_url: "",
      category1: "Rice",
      availability: true
    },
    {
      _id: "dish9",
      name: "Chicken Tikka Masala",
      price: 15.99,
      serves: 2,
      isVeg: false,
      description: "Grilled chicken chunks in a spiced curry sauce",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish10",
      name: "Paneer Tikka",
      price: 10.99,
      serves: 1,
      isVeg: true,
      description: "Cubes of cottage cheese marinated and grilled to perfection",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
      glb_url: "",
      usdz_url: "",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish11",
      name: "Lamb Rogan Josh",
      price: 16.99,
      serves: 2,
      isVeg: false,
      description: "Aromatic curry with tender pieces of lamb cooked in Kashmiri spices",
      image: "https://images.unsplash.com/photo-1545247181-516773cae754",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish12",
      name: "Vegetable Samosas",
      price: 6.99,
      serves: 2,
      isVeg: true,
      description: "Crispy pastry filled with spiced potatoes and peas",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      glb_url: "",
      usdz_url: "",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish13",
      name: "Chicken Biryani",
      price: 14.99,
      serves: 1,
      isVeg: false,
      description: "Fragrant basmati rice cooked with chicken and aromatic spices",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      glb_url: "",
      usdz_url: "",
      category1: "Rice",
      availability: true
    },
    {
      _id: "dish14",
      name: "Palak Paneer",
      price: 11.99,
      serves: 1,
      isVeg: true,
      description: "Cottage cheese cubes in a creamy spinach sauce",
      image: "https://images.unsplash.com/photo-1613292443284-8d11715fc04a",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish15",
      name: "Garlic Naan",
      price: 3.99,
      serves: 1,
      isVeg: true,
      description: "Soft bread with a garlic butter topping baked in tandoor",
      image: "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976",
      glb_url: "",
      usdz_url: "",
      category1: "Bread",
      availability: true
    },
    {
      _id: "dish16",
      name: "Tandoori Chicken",
      price: 13.99,
      serves: 2,
      isVeg: false,
      description: "Chicken marinated in yogurt and spices, cooked in a clay oven",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
      glb_url: "",
      usdz_url: "",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish17",
      name: "Chana Masala",
      price: 9.99,
      serves: 1,
      isVeg: true,
      description: "Chickpeas cooked in a spicy tomato gravy",
      image: "https://images.unsplash.com/photo-1604320359736-25247cd7d84d",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish18",
      name: "Mango Lassi",
      price: 4.99,
      serves: 1,
      isVeg: true,
      description: "Refreshing yogurt drink with sweet mango pulp",
      image: "https://images.unsplash.com/photo-1624454002302-4db0782d589a",
      glb_url: "",
      usdz_url: "",
      category1: "Beverage",
      availability: true
    },
    {
      _id: "dish19",
      name: "Gulab Jamun",
      price: 5.99,
      serves: 2,
      isVeg: true,
      description: "Sweet milk solids balls soaked in rose-flavored sugar syrup",
      image: "https://images.unsplash.com/photo-1601303041231-2d3bd997fbac",
      glb_url: "",
      usdz_url: "",
      category1: "Dessert",
      availability: true
    },
    {
      _id: "dish20",
      name: "Fish Curry",
      price: 15.99,
      serves: 1,
      isVeg: false,
      description: "Tender fish pieces cooked in a tangy coconut-based curry",
      image: "https://images.unsplash.com/photo-1626407937533-d3df47530d10",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish21",
      name: "Masala Dosa",
      price: 8.99,
      serves: 1,
      isVeg: true,
      description: "Crispy rice crepe filled with spiced potato filling",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      glb_url: "",
      usdz_url: "",
      category1: "Breakfast",
      availability: true
    },
    {
      _id: "dish22",
      name: "Chicken Korma",
      price: 14.99,
      serves: 1,
      isVeg: false,
      description: "Chicken pieces in a mild, creamy cashew and yogurt sauce",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    }
  ]
};

export default function MenuPage({ params }: { params: { rest_id: string } }) {
  const { rest_id } = params
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuButtonPosition, setMenuButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(`Fetching menu for restaurant ${rest_id}`);
        
        // Use mock data for restaurant ID 3
        if (rest_id === "3") {
          setFoodItems(mockDishes["3"]);
          setLoading(false);
          return;
        }
        
        // Otherwise try the API
        const response = await fetch(`http://localhost:3005/menu/dishes/${rest_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Menu data received:", data);
        
        if (!data.dishes || !Array.isArray(data.dishes)) {
          console.error("Invalid dishes data:", data);
          setError("Menu data format is invalid");
          return;
        }
        
        setFoodItems(data.dishes);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [rest_id])

  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null)
  const [isAROpen, setIsAROpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [itemId]: removed, ...rest } = prev
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

  function groupDishesByCategory(foodItems: FoodItem[]) {
    const categoryMap: Record<string, FoodItem[]> = {};
  
    foodItems.forEach((item) => {
      // Add to category1
      if (item.category1) {
        if (!categoryMap[item.category1]) {
          categoryMap[item.category1] = [];
        }
        categoryMap[item.category1].push(item);
      }
  
      // Add to category2
      if (item.category2) {
        if (!categoryMap[item.category2]) {
          categoryMap[item.category2] = [];
        }
        categoryMap[item.category2].push(item);
      }
  
      // Add to category3
      if (item.category3) {
        if (!categoryMap[item.category3]) {
          categoryMap[item.category3] = [];
        }
        categoryMap[item.category3].push(item);
      }
    });
  
    // Convert the map to an array of category groups
    return Object.keys(categoryMap).map((category) => ({
      category,
      items: categoryMap[category],
    }));
  }

  // Create the categories needed for MenuPopup
  const categorizedDishes = groupDishesByCategory(foodItems);

  return (
    <main className="min-h-screen pb-20 bg-[#121212]">
      <Header onSearch={setSearchTerm} />
      <FilterChips activeFilter={filter} onFilterChange={setFilter} />

      <div className="p-4">
        {filteredItems.map((item) => (
          <FoodCard
            key={item._id}
            name={item.name}
            price={parseFloat(item.price.toString())}
            serves={item.serves}
            isVeg={item.isVeg}
            image={item.image}
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

      {/* Fixed Menu Button */}
      <button
        className="fixed w-[65px] h-[65px] bottom-6 right-6 gold-gradient-bg rounded-full flex flex-col items-center justify-center gap-1 shadow-lg z-40"
        onClick={(e) => {
          const button = e.currentTarget.getBoundingClientRect();
          setMenuButtonPosition({
            x: button.right,
            y: button.top + (button.height / 2)
          });
          setIsMenuOpen(true);
        }}
      >
        <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20.25V11.25C20 9.12825 20 8.06737 19.414 7.40925C18.828 6.75 17.886 6.75 16 6.75H4V20.25C4 22.3706 4 23.4315 4.586 24.0907C5.172 24.75 6.114 24.75 8 24.75H16C17.886 24.75 18.828 24.75 19.414 24.0907C20 23.4315 20 22.3706 20 20.25Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12.6874C12.7956 12.6874 13.5587 13.0627 14.1213 13.7309C14.6839 14.399 15 15.3051 15 16.2499M12 12.6874C11.2044 12.6874 10.4413 13.0627 9.87868 13.7309C9.31607 14.399 9 15.3051 9 16.2499M12 12.6874V11.4999M15 16.2499H16M15 16.2499H12H9M9 16.2499H8M8 21H16M4 6.74985L11.385 3.07568C13.034 2.25511 13.858 1.84423 14.515 2.05442C14.941 2.19036 15.3172 2.4897 15.585 2.90587C16 3.5495 16 4.61589 16 6.74985" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
          <rect width="10" height="13" transform="translate(7 10)" fill="#A09460"/>
        </svg>
        <span className="text-black text-xs font-medium">MENU</span>
      </button>

      {selectedDish && (
        <ARScreen 
          isOpen={isAROpen} 
          onClose={() => setIsAROpen(false)} 
          dish={selectedDish} 
        />
      )}
      
      <MenuPopup 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        buttonPosition={menuButtonPosition}
        dishes={categorizedDishes}
      />

      {cartItemsCount > 0 && (
        <CartBar 
          itemCount={cartItemsCount} 
          onViewCart={() => setIsCartOpen(true)} 
        />
      )}

      <CartScreen
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        quantities={cart}
        onUpdateQuantity={(itemId, delta) => {
          updateQuantity(itemId, delta);
        }}
      />
    </main>
  )
}