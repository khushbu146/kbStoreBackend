const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subCateSchema = new Schema({
    categoryId: { type: mongoose.Types.ObjectId, required: true, ref: 'Categories' },
    name: { type:String, required:true },
});

module.exports = mongoose.model('SubCategory', subCateSchema);