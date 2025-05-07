// Simple Express server with mock data
const express = require('express');
const cors = require('cors');
const mockService = require('./services/mock.service');

const app = express();
const PORT = 3005;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Get restaurant info
app.get('/menu/restaurantinfo/:rest_id', (req, res) => {
  const { rest_id } = req.params;
  console.log(`Received request for restaurant ${rest_id}`);
  const result = mockService.getRestaurantInfo(rest_id);
  res.json(result);
});

// Get dishes for a restaurant
app.get('/menu/dishes/:rest_id', (req, res) => {
  const { rest_id } = req.params;
  const dishes = mockService.getDishes(rest_id);
  res.json({ dishes });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
}); 