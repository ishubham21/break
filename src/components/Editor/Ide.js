import styles from './Ide.module.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Editor from '@monaco-editor/react'
import getCode from '../../helpers/getCode'
import getRandomString from '../../helpers/getRandomString'

const Ide = () => {

    const [code, setCode] = useState(null)
    const [filename, setFileName] = useState(null)
    const [language, setLanguage] = useState(null)
    const [input, setInput] = useState(null)
    const [userId, setUserId] = useState(null)  //picking up the user id from the session storage
    const [output, setOutput] = useState(null)

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
                    "auth-token": localStorage.getItem('token') //to verify the request on the server-side
                }
            })
                .then(res => res.json())
                .then(async ({ error, data }) => {
                    if (error === null) {
                        console.log(data);
                        setCode(data.code)
                        setInput(data.input)
                        setLanguage(data.language)
                        setFileName(await data.fileName.substring(0, data.fileName.indexOf('-')))
                    }
                })
        }
        else {   //if a new code is loaded, setting it's default values
            setCode(getCode('cpp'))
            setFileName(getRandomString())
            setLanguage('cpp')
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className={styles.container}>
            {code && <div>

                <nav className={styles.navbar}>
                    <button>Save</button>
                    <button>Run</button>
                    {filename && <input type="text" name="filename" value={filename} onChange={(e) => { setFileName(e.target.value) }} />}
                </nav>

                <div className={styles.ide}>
                    <Editor
                        height="90vh"
                        theme="vs-dark"
                        defaultLanguage="cpp"
                        defaultValue={code}
                    />
                    <div className={styles.subContainer}>
                        {input && <textarea name="input" placeholder="Your input here" value={input} onChange={(e) => { setInput(e.target.value) }}></textarea>}
                        {output && <div className={styles.output}> {output} </div>}
                        {!output && <div className={styles.output}> Your output will appear here</div>}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Ide