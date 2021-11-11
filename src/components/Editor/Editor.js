import styles from './Editor.module.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { useState } from 'react'

const Editor = () => {

    const [code, setCode] = useState()

    const options = {
        theme: 'material',
        lineNumbers: true
    }

    return (
        <div className={styles.container}>
            <CodeMirror
                value='<h1>I ♥ react-codemirror2</h1>'
                options={options}
                onChange={(editor, data, value) => {

                }}
            />
        </div>
    )
}

export default Editor