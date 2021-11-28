const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    input:{
        type: String,
    },
    language: {
        type: String,
        required: true,
        default: 'C++'
    },
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Code", codeSchema)