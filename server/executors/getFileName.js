const getFileName = (language) => {
    switch(language){
        case 'c': return 'code.c'
        case 'cpp': return  'code.cpp'
        case 'python': return 'code.py'
        case 'java': return 'code.java'
        case 'javascript': return 'code.js'
    }
}

module.exports = {
    getFileName
}