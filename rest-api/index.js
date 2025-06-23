  const express = require('express');
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  const productRoutes = require('./routes/productRoutes');

  dotenv.config();

  const app = express();
  app.use(express.json()); // parse JSON body

  const PORT = process.env.PORT || 5000;

  // Routing
  app.use('/api/products', productRoutes);

  // Connect to MongoDB Atlas
  mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });
