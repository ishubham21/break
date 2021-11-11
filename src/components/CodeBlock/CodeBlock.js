import styles from './CodeBlock.module.css'
import { useHistory } from 'react-router'

const CodeBlock = ({ fileName, codeId, userId }) => {

    //slicing the string to keep the part before -
    fileName = fileName.substring(0, fileName.indexOf('-'))
    
    //storing the userId in sessionStorage to use it in Editor.js
    //using sessionStorage because this data is rendered each time the user opens dashboard (due to useEffect hook) and hence no need to store the data after the tab has been closed 
    sessionStorage.setItem('userId', userId)

    //using the useHistory hook to redirect the user to editor with the codeId that would be used to retrive the particular code
    const history = useHistory()
    const loadEditor = (codeId) => {
        history.push(`/dashboard/code?id=${codeId}`)
    }

    return (
        <div className={styles.container} onClick={() => {
            loadEditor(codeId)
        }}>
            {fileName}
        </div>
    )
}

export default CodeBlock