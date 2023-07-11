const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); // for hashing password

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
});

//hashing password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model('User', userSchema );