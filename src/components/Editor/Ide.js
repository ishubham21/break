import styles from './Ide.module.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Editor from '@monaco-editor/react'
import getCode from '../../helpers/getCode'
import getRandomString from '../../helpers/getRandomString'

const Ide = () => {

    const [code, setCode] = useState(getCode('cpp'))    //getting a default template of cpp code
    const [filename, setFileName] = useState(getRandomString()) //getting a random word as an initial value
    const [language, setLanguage] = useState('cpp')
    const [input, setInput] = useState(null)    //setting input to be null
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'))  //picking up the user id from the session storage

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
                        // setCodeDetails(data)
                    }
                })
        } else {
            // setCodeDetails({
            //     fileName: 'undefined',
            //     code: '#include <iostream>'  //to be fetched from antoher file based on the selected language

            // })
        }
    }, [])

    return (
        <div className={styles.container}>
            <button>Save</button>
            <button>Run</button>
            <input type="text" name="filename" placeholder={'undefined'} />
            <select name="language" id=""></select>

            <Editor
                height="90vh"
                defaultLanguage="cpp"
                defaultValue={code}
            />

        </div>
    )
}

export default Ide