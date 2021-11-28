const mongoose = require('mongoose')
const Code = require('./../model/Code')

//function to fetch all the codes that belong to a particulr user
const fetchAllCodes = async (userId) => {
    return (await Code.find({ userId: userId }).exec())
}

module.exports = {
    fetchAllCodes
}
