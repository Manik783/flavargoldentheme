const RestaurantModel = require("../models/restaurant.model");
const mockService = require("../services/mock.service");

//get restaurant info
module.exports.getRestaurantInfo = async (req, res, next) => {
  try {
    const { rest_id } = req.params;
    
    // Use mock service if MongoDB is skipped
    if (process.env.SKIP_MONGO === 'true') {
      const result = mockService.getRestaurantInfo(rest_id);
      return res.json(result);
    }
    
    // Otherwise use MongoDB
    const restaurant = await RestaurantModel.findOne(
      { rest_id: rest_id },
      "images email description name phone_number rating reviewers"
    );
    res.json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    res.status(500).json({ error: "Failed to fetch restaurant information" });
  }
};
