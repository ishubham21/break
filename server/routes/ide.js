const router = require('express').Router()
const { validateCode, findUserById, findCodeByFileName, findCodeById } = require('../controllers/validation')
const { executeCode } = require('../executors/runCode')
const { fileCleanup } = require('./../executors/fileCleanup')
const Code = require('../model/Code')

router.post('/save', async (req, res) => {

    //handling any request errors - if encountered
    const requestErrors = validateCode(req.body).error
    if (requestErrors) {
        return res.status(400).json({
            error: requestErrors.details[0].message
        })
    }

    //returning error in case of userId not found
    if (!(await findUserById(req.body.userId))) {
        return res.status(400).json({
            error: "You are not allowed to save your code"
        })
    }

    const fileName = `${req.body.fileName}-${req.body.userId}` //creating a filename by appending filename and userId

    //if the code with same fileName exists, update the value of code and input etc, else make a new document
    if (await findCodeByFileName(fileName)) {

        //query that is to be performed on the databse
        const query = { fileName: fileName }

        //updated values for the database - userId and fileName wouldn't change
        const update = {
            code: req.body.code,
            input: req.body.input,
            language: req.body.language
        }

        //updating code using mongoose's pre-defined function
        const updatedCode = await Code.findOneAndUpdate(query, update)

        return res.status(200).json({
            fileName: updatedCode.fileName,
            codeId: updatedCode._id,
        })
    } else {

        //setting initial values
        const code = new Code({
            fileName,
            code: req.body.code,
            language: req.body.language,
            input: req.body.input,
            userId: req.body.userId
        })

        //saving the verified request in the database
        try {
            const savedCode = await code.save()
            res.status(200).json({
                fileName: savedCode.fileName,
                codeId: savedCode._id,
            })
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
})

router.post('/run', async (req, res) => {

    //handling any request errors - if encountered
    const requestErrors = validateCode(req.body).error
    if (requestErrors) {
        return res.status(400).json({
            error: requestErrors.details[0].message
        })
    }

    //returning error in case of userId not found
    if (!(await findUserById(req.body.userId))) {
        return res.status(400).json({
            error: "You are not allowed to run your code"
        })
    }

    //function to execute code recieved from the user
    executeCode(req.body.code, req.body.input, req.body.language)
        .then(response => {
            fileCleanup(req.body.language)  //cleaning the files after the code has been executed
            return res.status(200).json({
                error: null,
                data: response
            })
        })
        .catch(async ({errCode, error}) => {

            //different error codes correspond to different kind of files to be deleted
            //0 - no files saved
            //1 - compile-time error where the executables are not generated
            //2 - run time error
            if(errCode != 0){
                if(errCode == 1){
                    fileCleanup(`${req.body.language}compileTime`)
                }
                else if(errCode == 2){
                    fileCleanup(req.body.language)
                }
            }

            return res.status(500).json({
                error
            })
        })

})

module.exports = router