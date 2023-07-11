const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name:{ type:String, required:true },
    brand:{ type:String, required:true },
    price:{ type:Number, required:true },
    color:{  type:String, required:true  }, 
    image: { type:String, required:true },
    description:{ type:String, required:true  }, 
    category:{ type:String, required:true },
    featured:{ type:Boolean, required:true  },
    shipping:{  type:Boolean, required:true  },
    stock: { type:Number, required: true },
    reviews: { type:Number, required: true },
    stars: { type:Number, required: true },
});

module.exports = mongoose.model('Products', productSchema);
