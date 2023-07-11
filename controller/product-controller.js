const Product = require('../models/product');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const getProducts = async(req, res, next) =>{
    let products;
    try{
        products = await Product.find({}, '')
    } catch (err) {
        const error = new HttpError(
            'Fetching product failed',
            500
        );
        return next(error);
    }
    res.json({products: products.map(product => product.toObject({ getters: true}))});
};

const createProduct = async(req, res, next) => {
    const addingProduct = new Product(req.body);   

    try{
        await addingProduct.save();
        res.status(201).json({ product: addingProduct.toObject({ getters: true }) });
        } 
     catch(e){
        console.log(e);
        res.status(400).json({ error: e });
        return next(e);
    }
};

const updateProduct = async(req, res, next) => {
    try{
        const productId = req.params.pid;          
        const getProduct = await Product.findByIdAndUpdate(productId,req.body, {new:true});
        res.status(202).send(getProduct);
    } catch(e){
        res.status(500).send(e);     
    }
}

const deleteProduct = async(req, res, next) => {
    const productId = req.params.pid;
    
    let product;
    try{
        product = await Product.findById(productId);
    } catch (e){
        res.status(500).send(e); 
    }

    if(!product){
        const error = new HttpError('Could not find product for this id.', 404);
        return next(error);    
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await product.deleteOne({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'Something went wrong, could not delete place.2222',
          500
        );
        return next(error);
      }

      res.status(200).json({ message: 'Deleted place.' });
}

exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
