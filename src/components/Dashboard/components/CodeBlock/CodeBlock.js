import styles from './CodeBlock.module.css'
import { useHistory } from 'react-router'
import { Card, Fab } from '@mui/material'


const CodeBlock = ({ fileName, codeId }) => {

    //slicing the string to keep the part before -
    fileName = fileName.substring(0, fileName.indexOf('-'))

    //using the useHistory hook to redirect the user to editor with the codeId that would be used to retrive the particular code
    const history = useHistory()
    const loadEditor = (codeId) => {
        history.push(`/dashboard/code?id=${codeId}`)
    }

    return (
        <Card
            variant="outlined"
            sx={{
                flex: '0 0 10%',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                marginLeft: '15px'
            }}
            onClick={() => { loadEditor(codeId) }}
        >
            {fileName}
            <Fab
                color="secondary"
                size="small"
                aria-label="language"
                sx={{
                    marginLeft: '10px'
                }}
            >
                {/* <AddIcon /> */}
            </Fab>
        </Card>
    )
}

export default CodeBlock