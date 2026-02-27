const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, default: '' },
    price: { type: Number, required: [true, 'Price is required'] },
    category: { type: String, default: '' },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);