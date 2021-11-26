import { Box, Grid } from "@mui/material"
import Editor from '@monaco-editor/react'
import styles from './../Ide.module.css'

const CodeEditor = ({ code, setCode, setInput }) => {
    return (
        <Box>
            <Grid container spacing={0} sx={{ height: '92vh' }}>
                <Grid item xs={9}>
                    <Editor
                        defaultValue={code}
                        theme="vs-dark"
                        onChange={(value) => {
                            setCode(value)
                        }}
                    >
                    </Editor>
                </Grid>
                <Grid item container xs={3} sx={{ color: '#fff', textAlign: 'center' }}>
                    <Grid item xs={12} sx={{ height: '50%', mt: '20px' }}>
                        <h4>Enter Input</h4>
                        <Box sx={{ p: '10px', height: '95%' }}>
                            <textarea aria-label="input" placeholder="Input here..." className={styles.inputBox} onChange={(e) => { setInput(e.target.value) }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Output</h4>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CodeEditor