const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', InventorySchema);


