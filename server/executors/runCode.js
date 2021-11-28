const path = require('path')
const { getFileName } = require('./getFileName')
const { getCompileCommand, getRunCommand } = require('./getExecutionCommands')
const { exec } = require('child_process')
const fs = require('fs')

//getting the filepath - to be used for relative paths
const dirName = __dirname

//save the code in a file - in the root directory
const saveFile = (fileName, code) => {
    //promise-based approach to make the code asynchronous
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, code, (error) => {
            if (error) {
                reject(error)   //rejecting the promise with the error
            } else {
                resolve()
            }
        })
    })
}

const executeCode = (code, input, language) => {
    return new Promise((resolve, reject) => {

        const fileName = getFileName(language)

        //saving the file with the name recieved from the other file
        saveFile(fileName, code)
            .then(() => {   //execute this only after the 
                fs.writeFile(`${path.join(dirName, '../input.txt')}`, input, (error) => {
                    if (error) {
                        return reject({
                            errCode: 0,
                            error: error
                        })
                    }
                })

                //getting the command to compile the code - this would generate a file
                const compileCommand = getCompileCommand(language, dirName)
                exec(compileCommand, (error, stdout, stderr) => {
                    if (error) {
                        return reject({
                            errCode: 1,
                            error: stderr
                        })
                    }

                    //doing this because python scripts are run differently
                    if (language === 'python' || language === 'javascript') {
                        return resolve(stdout)
                    }
                    else {  //putting this part in else since resolve() doesn't block the execution thread, only reject() does
                        //command to run the code - this would pass input from the input.txt file
                        const runCommand = getRunCommand(language)
                        exec(runCommand, (error, stdout, stderr) => {
                            if (error) {
                                return reject({
                                    errCode: "2",
                                    error: stderr
                                })
                            }
                            return resolve(stdout)
                        })
                    }
                })
            })
            .catch(error => {
                reject("Error occured on the server side")
            })
    })
}

module.exports = {
    executeCode
}
