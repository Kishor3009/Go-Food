const mongoose = require('mongoose');
// Import dotenv and configure it
require('dotenv').config();

// Use process.env to access environment variables
const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    // Handle the deprecation warning
    mongoose.set('strictQuery', false);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Fetch data from MongoDB
    const data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    return { data, catData };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Rethrow the error to be caught by the caller
  }
};

module.exports = connectToDB;
