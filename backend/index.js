const express = require('express');
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://go-food-umbf.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const connectToDB = require('./db');

// Wrap the server startup in an async function
const startServer = async () => {
  try {
    // Connect to MongoDB and wait for data
    const {
      data,
      catData
    } = await connectToDB();

    // Set global.foodData and global.foodCategory
    global.foodData = data;
    global.foodCategory = catData;

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Call the async function to start the server
startServer();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));

module.exports = app; // Export the app for testing