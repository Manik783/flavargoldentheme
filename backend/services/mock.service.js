// Mock data for development without MongoDB
const mockRestaurants = {
  "1": {
    name: "Italian Delight",
    rest_id: "1",
    description: "Authentic Italian cuisine in a cozy setting.",
    images: [
      "https://images.unsplash.com/photo-1481833761820-0509d3217039",
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
    ]
  },
  "2": {
    name: "Thai Spice",
    rest_id: "2",
    description: "Spicy Thai food with authentic flavors.",
    images: [
      "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91",
      "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4"
    ]
  },
  "123": {
    name: "Burger Palace",
    rest_id: "123",
    description: "Best burgers in town with premium ingredients.",
    images: [
      "https://images.unsplash.com/photo-1550317138-10000687a72b",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
      "https://images.unsplash.com/photo-1595698251245-879f5cf220e9"
    ]
  }
};

const mockDishes = {
  "1": [
    {
      item_id: "101",
      rest_id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      category: "Pizza",
      availability: true
    },
    {
      item_id: "102",
      rest_id: "1",
      name: "Spaghetti Carbonara",
      description: "Spaghetti with egg, cheese, pancetta, and black pepper",
      price: 14.99,
      category: "Pasta",
      availability: true
    }
  ],
  "2": [
    {
      item_id: "201",
      rest_id: "2",
      name: "Pad Thai",
      description: "Stir-fried rice noodles with eggs, vegetables, and peanuts",
      price: 13.99,
      category: "Noodles",
      availability: true
    },
    {
      item_id: "202",
      rest_id: "2",
      name: "Green Curry",
      description: "Thai green curry with coconut milk, vegetables, and your choice of protein",
      price: 15.99,
      category: "Curry",
      availability: true
    }
  ],
  "123": [
    {
      item_id: "301",
      rest_id: "123",
      name: "Classic Cheeseburger",
      description: "Beef patty with cheddar cheese, lettuce, tomato, and special sauce",
      price: 9.99,
      category: "Burgers",
      availability: true
    },
    {
      item_id: "302",
      rest_id: "123",
      name: "Loaded Fries",
      description: "French fries topped with cheese, bacon, and sour cream",
      price: 7.99,
      category: "Sides",
      availability: true
    }
  ]
};

function getRestaurantInfo(rest_id) {
  return { restaurant: mockRestaurants[rest_id] || null };
}

function getDishes(rest_id) {
  return mockDishes[rest_id] || [];
}

function getAllRestaurants() {
  return Object.values(mockRestaurants);
}

module.exports = {
  getRestaurantInfo,
  getDishes,
  getAllRestaurants
}; 