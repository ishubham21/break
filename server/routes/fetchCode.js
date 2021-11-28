const router = require('express').Router()
const { findCodeById } = require('./../controllers/validation')

router.get('/', async (req, res) => {
    
    const codeId = req.query.id
    const codeData = await findCodeById(codeId)
    
    //returning error via response
    if(codeData == null){
        return res.status(400).json({
            error: "Code not found!"
        })
    }

    //sending codeData as the response
    return res.status(200).json({
        error: null,
        data: codeData
    })
})

module.exports = router