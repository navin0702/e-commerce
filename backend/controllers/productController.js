const Product = require('../models/Product');

// @desc    Add new product
// @route   POST /api/products
// @access  Private (admin)
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    // simple validation
    if (!name || !price) {
      res.status(400);
      throw new Error('Name and price are required');
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (admin)
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.images = images || product.images;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};