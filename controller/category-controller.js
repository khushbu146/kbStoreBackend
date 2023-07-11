const Category = require('../models/category');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const getCategory = async(req, res, next)=>{
    let category;
    try{
        category = await Category.find({},'')
    } catch (err) {
        const error = new HttpError(
            'Fetching category failed',
            500
        );
        return next(error);
    }
    res.json({category: category.map(category => category.toObject({ getters: true}))});
};

const createCategory = async(req, res, next) => {
    const addingCategory = new Category(req.body);
    
    try{
        await addingCategory.save();
        res.status(201).json({ category: addingCategory.toObject({ getters: true }) });
    } catch(e){
        console.log(e);
        res.status(400).json({ error:e });
        return next(e);
    }
};

const deleteCategory = async(req, res, next) => {
    const categoryId = req.params.cid;

    let category;
    try{
        category = await Category.findById(categoryId);
    } catch(e){
        return res.status(500).send(e);
    }
    if(!category){
        const error = new HttpError('Could not find product for this id.', 404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await category.deleteOne({ session: sess });
        await sess.commitTransaction();
    } catch(err){
        console.log(err);
        const error = new HttpError(
            'Something went wrong, could not delete category',
            500
        );
        return next(error);
    }
    res.status(200).json({ message: 'Deleted category.' });
}


exports.getCategory = getCategory;
exports.createCategory = createCategory;
exports.deleteCategory = deleteCategory;