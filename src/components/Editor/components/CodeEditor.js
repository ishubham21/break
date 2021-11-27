import { Box, Grid } from "@mui/material"
import Editor from '@monaco-editor/react'
import styles from './../Ide.module.css'

const CodeEditor = ({ code, language, setCode, setInput, output }) => {
    return (
        <Box key={language}> {/* using this to update the code everytime the language changes - react rerenders when the key is updated */}
            <Grid container spacing={0} sx={{ height: '92vh' }}>
                <Grid item xs={9}>
                    <Editor
                        defaultValue={code}
                        defaultLanguage={language}
                        theme="vs-dark"
                        onChange={(value) => {
                            console.log(value)
                            setCode(value)
                        }}
                    >
                    </Editor>
                </Grid>
                <Grid item xs={3} sx={{ color: '#fff' }}>
                    <Box sx={{ height: '50%', p: '15px', textAlign: 'center' }}>
                        <h4 className={styles.headText}>Enter Input</h4>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <textarea aria-label="input" placeholder="Input here..." className={styles.inputBox} onChange={(e) => { setInput(e.target.value) }} />
                        </Box>
                    </Box>
                    <Box sx={{ height: '50%', p: '15px' }}>
                        <h4 className={styles.headText}>Output here</h4>
                        {output && <Box sx={{ width: '100%', height: '100%', mt: '20px' }}>
                            {output}
                        </Box>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CodeEditor