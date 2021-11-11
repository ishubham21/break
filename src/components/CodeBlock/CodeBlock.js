import styles from './CodeBlock.module.css'
import { useHistory } from 'react-router'

const CodeBlock = ({ fileName, codeId, userId }) => {

    fileName = fileName.substring(0, fileName.indexOf('-'))

    const history = useHistory()
    const loadEditor = (codeId) => {
        history.push(`/dashboard/editor?id=${codeId}`)
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