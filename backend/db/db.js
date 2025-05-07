const mongoose = require("mongoose");
const RestaurantModel = require("../models/restaurant.model");

function connectToDb() {
  // Check if MONGO_DB_URL is available or if we're in development mode without MongoDB
  if (!process.env.MONGO_DB_URL || process.env.SKIP_MONGO === 'true') {
    console.log("MongoDB connection skipped - running in development mode without database");
    return;
  }

  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(async () => {
      console.log("Connected to MongoDB successfully!");
      // const result = await RestaurantModel.updateMany(
      //   {},
      //   { $set: { visibility_3D: false } }
      // );

      //console.log(`Updated ${result.modifiedCount} documents`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToDb;
