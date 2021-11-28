const Joi = require('@hapi/joi')
const User = require('../model/User')
const Code = require('../model/Code')
const ObjectId = require('mongoose').Types.ObjectId

//verifying the data inserted by the user
const verifyRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    })

    //returns an object with the error string
    return schema.validate(data)
}

//verifying the login data entered
const verifyLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(data)
}

//return true if the user exists
const emailValidation = async (email) => {
    const user = await User.findOne({ email: email })   //findOne returns an entire obejct where email === email
    return user !== null
}

//verify the fields of the submitted code
const validateCode = (data) => {
    const schema = Joi.object({
        fileName: Joi.string().required(),
        code: Joi.string().required(),
        language: Joi.string().required(),
        input: Joi.any().optional().allow('').allow(null),                //input can be optional 
        userId: Joi.string().required(),
    })

    //returning the validated data - would return an error in case of one
    return schema.validate(data)
}

//verifying that the user with the given id exist on the database
const findUserById = async (userId) => {
    //making use of a try and catch to handle all the errors that might popup
    try {
        const user = await User.findOne({ _id: new ObjectId(userId) })  //using ObjectId imported from mongoose - using this to perform type matching since _id is not a simple string but an object   //it must be a 12character string
        return user !== null
    }
    catch (error) {
        if (error) {
            return false
        }
    }
}

//checking if the code with same fileName exists on the database
const findCodeByFileName = async (fileName) => {
    const code = await Code.findOne({ fileName: fileName })
    return code !== null
}

//finding the given code by it's id
const findCodeById = async (id) => {
    
    //returning null in case of any error via a try and catch block
    try {
        const code = await Code.findOne({ _id: new ObjectId(id) })  //using new ObjectId method to convert the string into mongoose object
        return code
    }
    catch(err){
        return null
    }
}

module.exports = {
    verifyRegistration,
    verifyLogin,
    emailValidation,
    validateCode,
    findUserById,
    findCodeByFileName,
    findCodeById
}

