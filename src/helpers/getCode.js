const getCode = language => {
    switch (language) {
        case 'c': return `#include <stdio.h>\nint main() {\n\tprint("Hello world!")\n\treturn 0;\n}`
        case 'cpp': return `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n\tcout << "Hello world!";\n\treturn 0; \n}`
        case 'python': return `print("Hello world!")`
        case 'java': return `class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello world!");\n\t}\n}`
        case 'javascript': return `console.log("Hello World!");`
        default: return null
    }
}

export default getCode