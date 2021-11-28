const router = require('express').Router()
const User = require('./../model/User')
const bcrypt = require('bcrypt') //used for password hashing
const jwt = require('jsonwebtoken')

//for validations
const { verifyRegistration, verifyLogin, emailValidation } = require('../controllers/validation')

//register route
router.post('/register', async (req, res) => {

    //verifying if the registration data is according to the specifications
    const verificationError = verifyRegistration(req.body).error

    //send a status of 400 in case of wrong details
    if (verificationError) {
        return res.status(400).json({
            error: verificationError.details[0].message
        })
    }

    //checking if the email entered by the user is already present
    if (await emailValidation(req.body.email)) {
        return res.status(400).json({
            error: "Email already exists"
        })
    }

    //hasing the password submitted by user using bcrypt
    const salt = await bcrypt.genSalt(10)   //generating a random string
    const password = await bcrypt.hash(req.body.password, salt)

    //destructuring the user from the request
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    })

    //trying to save the user data in MongoDB Atlas
    try {
        const savedUser = await user.save()
        res.status(200).json(savedUser._id)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
})

//login route
router.post('/login', async (req, res) => {

    //checking for verification errors
    const verificationError = verifyLogin(req.body).error
    if (verificationError) {
        return res.status(400).json({
            error: verificationError.details[0].message
        })
    }

    //checking if the email entered by the user is already present
    if (!(await emailValidation(req.body.email))) {
        return res.status(400).json({
            error: "Email doesn't exist"
        })
    }

    const user = await User.findOne({ email: req.body.email });

    // checking for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            error: "Incorrect Password"
        });
    }

    // create token by encypting the data
    //jwt contains - header + data + encryption info
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    
    //sending token as a header upon successful login
    res.header("auth-token", token).json({
        data: {
            token
        },
    });
})

module.exports = router