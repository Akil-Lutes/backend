// promisfy  is for promisify decoded variable
const { promisfy } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/characterModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    
    // id of new user which is _id from mongoDB & store SECRET string in config.env file
    const token = signToken(newUser._id);
        jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'success',
        // how to login new user back to client
        token,
        data: {
            user: newUser
        }
    });
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide and email and password!', 400))
    }
    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');

    // It's best to give a potential attacker vague error info about wrong email or password
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or Password', 401))
    }

    // 3) If things check out, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1. Get token & check if it exists (in postman)
    let token;
    if (
        req.headers.authorization &&
        // bearer token is a cryptic string
        req.headers.authorization.startsWith('Bearer')
    ) {
        // To get 2nd part of string after Bearer (turned string into array)
        token = req.headers.authorization.split(' ')[1];

    }

    if (!token) {
      return next(new AppError('You are not logged in.', 401))  
    }
    // 2. Validate/verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3. Check if user still exists

    // 4. Check if user changed password after JWT (token) was issued

    // If there were no problems in these steps, next(); will be called
    
    next();
});

// const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm
// });