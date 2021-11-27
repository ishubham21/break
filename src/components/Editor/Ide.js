import styles from './Ide.module.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import getCode from '../../helpers/getCode'
import getRandomString from '../../helpers/getRandomString'
import IdeNavbar from './components/IdeNavbar'
import CodeEditor from './components/CodeEditor'

const Ide = () => {

    const [code, setCode] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [language, setLanguage] = useState(null)
    const [input, setInput] = useState("0")    //since input is required during the post request - input.txt will not be saved without it
    const userId = sessionStorage.getItem('userId') //picking up the user id from the session storage
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
        }
    }, [codeId])

    //functions to be passed as props
    //updating the language 
    //MAJOR! - the code in CodeEditor was not getting updated, so we have used a key value there to perform rerendering
    const updateLang = (language) => {
        setLanguage(language)
        setCode(getCode(language))
    }

    //function to create a request
    const saveCode = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName, code, input, userId, language
            })
        }
        fetch('http://localhost:4000/ide/save', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const runCode = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName, code, input, userId, language
            })
        }

        fetch('http://localhost:4000/ide/run', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className={styles.container}>
                <IdeNavbar
                    lang={language}
                    fileName={fileName}
                    setFileName={setFileName}
                    saveCode={saveCode}
                    runCode={runCode}
                    currentLang={updateLang}
                />
                <CodeEditor
                    code={code}
                    language={language}
                    setCode={setCode}
                    setInput={setInput}
                />
            </div>
        </>
    )
}

export default Ide