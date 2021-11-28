const path = require('path')
const fs = require('fs')

const deleteFileWithName = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, `../${fileName}`), (error) => {
            if(error){
                reject(error)    
            }
            resolve()
        })
    })
}

//function to delete the files generated once the code has been executed
//cases with compileTime suffix deal with the compile time file cleanups
const fileCleanup = (language) => {
    switch(language){
        case 'c': {
            deleteFileWithName('code.c')
            deleteFileWithName('a.out')
            deleteFileWithName('input.txt')
        }
        break;
        case 'ccompileTime': {
            deleteFileWithName('code.c')
            deleteFileWithName('input.txt')
        }
        break;
        case 'cpp': {
            deleteFileWithName('code.cpp')
            deleteFileWithName('a.out')
            deleteFileWithName('input.txt')
        }
        break;
        case 'cppcompileTime': {
            deleteFileWithName('code.cpp')
            deleteFileWithName('input.txt')
        }
        break;
        case 'python': {
            deleteFileWithName('code.py')
            deleteFileWithName('input.txt')
        }
        break;
        case 'java': {
            deleteFileWithName('code.java')
            deleteFileWithName('Main.class')
            deleteFileWithName('input.txt')
        }
        case 'javacompileTime': {
            deleteFileWithName('code.java')
            deleteFileWithName('input.txt')
        }
        break;
        case 'javascript': {
            deleteFileWithName('code.js')
            deleteFileWithName('input.txt')
        }
    }
}

module.exports = {
    fileCleanup
}