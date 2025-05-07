// Test script for our mock API
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Test data
const restaurant = {
  name: "Test Restaurant",
  rest_id: "1",
  description: "This is a test restaurant",
  images: [
    "https://images.unsplash.com/photo-1550317138-10000687a72b",
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5"
  ]
};

// Mock dishes data
const dishes = {
  "1": [
    {
      _id: "dish1",
      name: "Margherita Pizza",
      price: 12.99,
      serves: 2,
      isVeg: true,
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      glb_url: "",
      usdz_url: "",
      category1: "Pizza",
      availability: true
    },
    {
      _id: "dish2",
      name: "Pasta Carbonara",
      price: 14.99,
      serves: 1,
      isVeg: false,
      description: "Creamy pasta with bacon and parmesan",
      image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9",
      glb_url: "",
      usdz_url: "",
      category1: "Pasta",
      availability: true
    }
  ],
  "2": [
    {
      _id: "dish3",
      name: "Pad Thai",
      price: 13.99,
      serves: 1,
      isVeg: false,
      description: "Rice noodles stir-fried with eggs, tofu, bean sprouts and peanuts",
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
      glb_url: "",
      usdz_url: "",
      category1: "Noodles",
      availability: true
    },
    {
      _id: "dish4",
      name: "Green Curry",
      price: 15.99,
      serves: 1,
      isVeg: true,
      description: "Thai green curry with vegetables and coconut milk",
      image: "https://images.unsplash.com/photo-1604147110595-d3e9f8590c21",
      glb_url: "",
      usdz_url: "",
      category1: "Curry",
      availability: true
    }
  ],
  "123": [
    {
      _id: "dish5",
      name: "Classic Cheeseburger",
      price: 10.99,
      serves: 1,
      isVeg: false,
      description: "Beef patty with cheddar cheese, lettuce, tomato and special sauce",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      glb_url: "",
      usdz_url: "",
      category1: "Burgers",
      availability: true
    },
    {
      _id: "dish6",
      name: "Loaded Fries",
      price: 7.99,
      serves: 2,
      isVeg: true,
      description: "French fries topped with cheese, jalapeños, and sour cream",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713",
      glb_url: "",
      usdz_url: "",
      category1: "Sides",
      availability: true
    }
  ]
};

// Add restaurant with ID 3
const restaurant3 = {
  name: "Spice Garden",
  rest_id: "3",
  description: "Traditional Indian cuisine with a modern twist",
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
  ]
};

// Add dishes for restaurant 3
const dishes3 = [
  {
    _id: "dish7",
    name: "Butter Chicken",
    price: 14.99,
    serves: 2,
    isVeg: false,
    description: "Tender chicken pieces in a rich, creamy tomato sauce",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    glb_url: "",
    usdz_url: "",
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
  },
  {
    _id: "dish23",
    name: "Pani Puri",
    price: 7.99,
    serves: 2,
    isVeg: true,
    description: "Crispy hollow shells filled with spiced water, tamarind chutney and potato",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    glb_url: "",
    usdz_url: "",
    category1: "Appetizer",
    availability: true
  },
  {
    _id: "dish24",
    name: "Malai Kofta",
    price: 12.99,
    serves: 1,
    isVeg: true,
    description: "Fried vegetable and cheese dumplings in a rich, creamy sauce",
    image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e",
    glb_url: "",
    usdz_url: "",
    category1: "Curry",
    availability: true
  },
  {
    _id: "dish25",
    name: "Aloo Gobi",
    price: 9.99,
    serves: 1,
    isVeg: true,
    description: "Potatoes and cauliflower cooked with Indian spices",
    image: "https://images.unsplash.com/photo-1576916848720-565536290c14",
    glb_url: "",
    usdz_url: "",
    category1: "Curry",
    availability: true
  },
  {
    _id: "dish26",
    name: "Chicken Vindaloo",
    price: 15.99,
    serves: 1,
    isVeg: false,
    description: "Spicy curry with tender chicken pieces in a tangy sauce",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    glb_url: "",
    usdz_url: "",
    category1: "Curry",
    availability: true
  },
  {
    _id: "dish27",
    name: "Kheer",
    price: 6.99,
    serves: 1,
    isVeg: true,
    description: "Sweet rice pudding flavored with cardamom and garnished with nuts",
    image: "https://images.unsplash.com/photo-1614518921956-0d7c21a9c8b5",
    glb_url: "",
    usdz_url: "",
    category1: "Dessert",
    availability: true
  },
  {
    _id: "dish28",
    name: "Vegetable Pakora",
    price: 7.99,
    serves: 2,
    isVeg: true,
    description: "Assorted vegetables dipped in spiced chickpea flour batter and deep-fried",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f7a4c6e9",
    glb_url: "",
    usdz_url: "",
    category1: "Appetizer",
    availability: true
  }
];

// Update dishes object to include the new restaurant
dishes["3"] = dishes3;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Test API is running!');
});

// Get restaurant info
app.get('/menu/restaurantinfo/:rest_id', (req, res) => {
  const { rest_id } = req.params;
  console.log(`Received request for restaurant ${rest_id}`);
  
  // Return appropriate restaurant based on ID
  if (rest_id === "3") {
    res.json({ restaurant: restaurant3 });
  } else {
    res.json({ restaurant });
  }
});

// Get dishes for a restaurant
app.get('/menu/dishes/:rest_id', (req, res) => {
  const { rest_id } = req.params;
  console.log(`Received request for dishes of restaurant ${rest_id}`);
  
  const restaurantDishes = dishes[rest_id] || [];
  res.json({ dishes: restaurantDishes });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Test API running on http://localhost:${PORT}`);
}); 