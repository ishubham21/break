import styles from './CodeBlock.module.css'

const CodeBlock = ({ fileName, code, input, language, userId }) => {

    fileName = fileName.substring(0, fileName.indexOf('-'))

    return (
        <div className={styles.container}>
            {fileName}
        </div>
    )
}

export default CodeBlock