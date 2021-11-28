const path = require('path')

const getCompileCommand = (language, dirName) => {
    switch (language) {
        case 'c': return `gcc ${path.join(dirName, '../code.c')}`
        case 'cpp': return `g++ ${path.join(dirName, '../code.cpp')}`   //generate an executabele file - a.out
        case 'python': return `python ${path.join(dirName, '../code.py')} -f < input.txt`
        case 'java': return `javac ${path.join(dirName, '../code.java')}`   //generates a class "Main" in java - Main is the name of the class recieved from the user
        case 'javascript': return `node ${path.join(dirName, '../code.js')}`
    }
}

const getRunCommand = (language) => {
    switch (language) {
        case 'c': return `./a.out < input.txt`
        case 'cpp': return `./a.out < input.txt`
        case 'java': return `java Main < input.txt`
    }
}

module.exports = {
    getCompileCommand,
    getRunCommand
}