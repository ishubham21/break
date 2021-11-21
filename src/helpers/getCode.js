const getCode = language => {
    switch (language) {
        case 'c': return `#include <stdio.h>\nint main() {\n\tprint("Hello world!")\n\treturn 0;\n}`
            break;
        case 'cpp': return `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n\tcout << "Hello world!";\n\treturn 0; \n}`
            break;
        case 'py': return `#Your code here`
            break;
        case 'java': return `class Main {\n\tpublic static void main(String[] args) {\n\tSystem.out.println("Hello world!");\n\t}\n}`
            break;
        case 'javascript': return `console.log("Hello World!");`
            break;
        default: return null
    }
}

export default getCode