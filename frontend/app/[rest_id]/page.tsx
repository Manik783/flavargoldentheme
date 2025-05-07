"use client";

import Link from "next/link";
import { ArrowLeft, Star, Map } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Define the Restaurant type
interface Restaurant {
  name: string;
  rest_id: string;
  images?: string[];
  description?: string;
  cuisine?: string;
  rating?: number;
  address?: string;
}

// Add this to the top of the file
const mockRestaurant = {
  "3": {
    name: "Spice Garden",
    rest_id: "3",
    description: "Traditional Indian cuisine with a modern twist",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2"
    ]
  }
};

export default function Home() {
  const { rest_id } = useParams(); // Extracting rest_id from dynamic route
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!rest_id) return; // Ensure rest_id is valid before calling API

      try {
        // Check if the restaurant ID is 3, then use mock data
        if (rest_id === "3") {
          setRestaurant(mockRestaurant["3"]);
          localStorage.setItem("restaurantName", JSON.stringify(mockRestaurant["3"].name));
          localStorage.setItem("rest_id", JSON.stringify(mockRestaurant["3"].rest_id));
          return;
        }

        // For other IDs, try the API
        console.log(`Fetching from http://localhost:3005/menu/restaurantinfo/${rest_id}`);
        
        // Using hardcoded URL instead of environment variable
        const response = await fetch(
          `http://localhost:3005/menu/restaurantinfo/${rest_id}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // Ensuring cache doesn't interfere
            cache: 'no-store'
          }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch restaurant details: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Data received:", data);
        
        if (!data.restaurant) {
          throw new Error("No restaurant data in response");
        }
        
        setRestaurant(data.restaurant);
        localStorage.setItem("restaurantName", JSON.stringify(data.restaurant.name));
        localStorage.setItem("rest_id", JSON.stringify(data.restaurant.rest_id));

      } catch (err: unknown) {
        console.error("Fetch error:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [rest_id]);

  if (loading) return <p className="text-center text-lg text-white bg-black h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500 bg-black h-screen flex items-center justify-center">{error}</p>;

  return (
    <main className="bg-black min-h-screen pb-32">
      <section className="h-[250px] relative">
        <img
          src={restaurant?.images && restaurant.images.length > 0 ? restaurant.images[0] : "https://images.unsplash.com/photo-1565557623262-b51c2513a641"}
          alt={restaurant?.name || "Restaurant"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <button 
          onClick={() => router.back()} 
          className="absolute top-4 left-4 z-10 bg-black/50 rounded-full p-2"
          style={{color: '#A09460'}}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 p-4 z-10">
          <div className="flex gap-2 items-center mb-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${restaurant?.rating && star <= restaurant.rating 
                    ? "gold-gradient-text fill-current" 
                    : "text-gray-400"}`}
                  style={restaurant?.rating && star <= restaurant.rating ? {fill: '#A09460', color: '#A09460'} : {}}
                />
              ))}
            </div>
            <span className="text-white text-sm">{restaurant?.rating?.toFixed(1) || "4.5"}</span>
          </div>
          <h1 className="text-2xl font-bold gold-gradient-text">{restaurant?.name || "Spice Garden"}</h1>
          <p className="text-white text-sm">{restaurant?.cuisine || "Indian, Chinese, Thai"}</p>
        </div>
      </section>

      <section className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-semibold gold-gradient-text mb-2">About</h2>
          <p className="text-gray-300 text-sm">
            {restaurant?.description || "Welcome to our restaurant! We serve authentic cuisine with the freshest ingredients. Our chefs prepare each dish with care, ensuring a delightful dining experience for you and your loved ones."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold gold-gradient-text mb-2">Location</h2>
          <p className="text-gray-300 text-sm mb-3">
            {restaurant?.address || "123 Main Street, City, Country"}
          </p>
          <div className="h-[150px] bg-[#222222] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Map className="w-8 h-8 opacity-50" style={{color: '#A09460'}} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold gold-gradient-text mb-2">Hours</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-white">Monday - Friday</span>
              <span className="gold-gradient-text">11:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Saturday - Sunday</span>
              <span className="gold-gradient-text">10:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-black/90">
        <Link href={`/menu/${rest_id}`}>
          <button className="w-full gold-gradient-bg text-black py-3 font-semibold rounded-full">
            View Menu
          </button>
        </Link>
      </section>
    </main>
  );
}
