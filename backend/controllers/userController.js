const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @des     Register new User
// @route   POST /api/users/:id
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})
    if(userExists)
    {
        throw new Error("User already exists")
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }


    res.json({message: 'Register User'})
})

// @des     Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credential')
    }

    res.json({message: 'login User'})
})

// @des     Get user data
// @route   POST /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})



// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',

    })   
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}