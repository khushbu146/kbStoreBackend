const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const categoryRoutes = require('./routes/category-routes');
const cors = require('cors');

app.use(cors());

app.use(bodyParse.json());

app.use('/api/users',userRoutes);

app.use('/api/products',productRoutes);

app.use('/api/category',categoryRoutes);

app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown message occur'});
});

mongoose
  .connect('mongodb+srv://khushboorana2531:Kb%40mongodb@cluster0.33qw8mz.mongodb.net/KbEcom?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected')
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
