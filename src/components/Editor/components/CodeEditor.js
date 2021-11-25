import { Box } from "@mui/material"
import Editor from '@monaco-editor/react'

const CodeEditor = ({ code }) => {
    return (
        <Box>
            <Editor
                height="90vh"
                defaultValue={code}
                theme="vs-dark"
            >
            </Editor>
        </Box>
    )
}

export default CodeEditor