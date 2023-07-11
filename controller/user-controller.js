const { validationResult } = require('express-validator');
const User = require('../models/user');
const HttpError = require('../models/http-error');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const getUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching user failed',
            500
        );
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
          new HttpError('Invalid inputs',422)
        );
    }
    
    const { email, password } = req.body;
    let existingUser
    try{ 
       existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed',
            500
        );
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'user exists already',
            422
        );
        return next(error);
    }
    const createdUser = new User({
        email,
        password
    });

    try {
       await createdUser.save();
    }catch (err) {
        console.log(err);
        const error = new HttpError(
         'Signing up failed2',
          500
        );
        return next(error);
    }
   
    res.status(201).json({user: createdUser.toObject({ getters: true })});
};


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser, responseArr;

    try{ 
       existingUser = await User.findOne({ email: email })

        if(existingUser && existingUser.password === password ){
            const userEmail = existingUser?.email
            const userPassword = existingUser?.password

            const token = generateAccessToken({
                userEmail,
                userPassword
            })

            responseArr={
                token,
                "statusCode":200,
                "userData": existingUser,
                "message": "Logged in"
            };

        } else{
            responseArr={
                "statusCode":401,
                "userData": existingUser,
                "message": "Invalid Credential"
               };
        }
      
    } catch (err) {
        const error = new HttpError(
            'Logging in failed',
            500
        );
        
       responseArr={
        "statusCode":401,
        "userData":[],
        "message": "error to Login"
       };
    }
    res.json(responseArr); 
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

