import styles from './Editor.module.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

const Editor = () => {

    const [codeDetails, setCodeDetails] = useState({})   //splitting it into multiple 
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'))

    //catching the codeId from the url
    //using useLocation hook to find the id
    const search = useLocation().search
    const codeId = new URLSearchParams(search).get('id');

    //rendering this code each time the user opens his/her old codes
    useEffect(() => {
        //if id is not null that means the user is creating a new code
        if (codeId) {
            const url = `http://localhost:4000/code?id=${codeId}`
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(({ error, data }) => {
                    if (error === null) {
                        console.log(data);
                        setCodeDetails(data)
                    }
                })
        }else{
            setCodeDetails({
                fileName: 'undefined',
                code: '#include <iostream>'  //to be fetched from antoher file based on the selected language

            })
        }
    }, [])

    //codemirror options
    const options = {
        theme: 'material',
        lineNumbers: true
    }

    return (
        <div className={styles.container}>
            <CodeMirror
                value={codeDetails.code}
                options={options}
                onChange={(editor, data, value) => {

                }}
            />

            <button>Save</button>
            <button>Run</button>
        </div>
    )
}

export default Editor