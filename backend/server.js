const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product"); // your Product model

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));