import styles from './Editor.module.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { useState } from 'react'
import { useLocation } from 'react-router'

const Editor = () => {

    const [code, setCode] = useState()
    const [language, setLanguage] = useState('c++')
    const [input, setInput] = useState('')
    const [fileName, setFileName] = useState('undefined')

    const search = useLocation().search
    const id = new URLSearchParams(search).get('id');
    console.log(id)

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