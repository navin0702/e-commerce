const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// import product data from backend/data/products.js file
const { products } = require('./data/products');

// convert products to DB-friendly format (rename image->images, add stock)
const sampleProducts = products.map((p) => ({
  name: p.name,
  description: p.description,
  price: p.price,
  category: p.category,
  stock: p.stock || 100,
  images: p.image ? [p.image] : [],
}));

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`${existing} products already exist. Skipping seed.`);
      process.exit();
    }

    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products seeded successfully!`);
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedProducts();