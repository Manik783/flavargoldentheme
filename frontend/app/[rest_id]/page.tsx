"use client";

import Link from "next/link";
import { ShoppingBag, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Home() {
  const { rest_id } = useParams(); // Extracting rest_id from dynamic route
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/restaurantinfo/${rest_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details.");
        }
        const data = await response.json();
        setRestaurant(data.restaurant);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [rest_id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="h-screen bg-[#FAF9F6] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-xs">You're at</span>
        </div>
        <p className="text-lg font-semibold text-black">{restaurant?.name}</p>
      </div>

      {/* Image Grid - Dynamic Images */}
      <div className="px-6 py-4 h-[40vh] flex-grow-0">
        <div className="h-full grid grid-cols-2 gap-2">
          {restaurant?.images?.length > 0 ? (
            <>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={restaurant.images[0]}
                  alt="Restaurant"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid gap-2">
                {restaurant.images.slice(1, 3).map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`Restaurant Image ${index + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      {/* Options Section */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <Link href="/order" legacyBehavior>
          <a className="flex items-center gap-4 p-4 bg-white rounded-xl border border-orange-300 shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-black">Online Food Ordering</h3>
              <p className="text-sm text-gray-500">Order food online for delivery</p>
            </div>
          </a>
        </Link>

        <Link href={`/menu/${rest_id}`} legacyBehavior>
          <a className="flex items-center gap-4 p-4 bg-white rounded-xl border border-orange-300 shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-black">Dine In Experience</h3>
              <p className="text-sm text-gray-500">Browse menu and dine in</p>
            </div>
          </a>
        </Link>
      </div>
    </main>
  );
}
