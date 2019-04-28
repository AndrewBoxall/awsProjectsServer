var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {type: String, required: true},
  brand: {type: String},
  color: {type: String, required: true},
  link: {type: String, required: true},
  description: {type: String, required: true},
  features: [{type: String, required: true}],
  category: {type: String, required: true},
  subcategory: {type: String, required: true},
  stock: [{
    size: {type: String, required: true},
    quantity: {type: Number, required: true}
  }],
  images: [{type: String, required: true}],
  price: {type: Number, required: true},
  salePrice: {type: Number},
  currency: {type: String, required: true},
  dateAdded: {type: Date, required: true}
});

module.exports = mongoose.model('Product', productSchema);
