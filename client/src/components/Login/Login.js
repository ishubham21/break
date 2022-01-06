import styles from './Login.module.css'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const Login = ({ setStatusText, setIsLogin, redirectAfterSuccess }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    //for redirection purposes

    const handleSubmit = (e) => {
        e.preventDefault()

        setStatusText({
            text: "Please wait...",
            severity: "info"
        })

        //sending a post request to the specified URL with email and password as the body of the request
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        fetch('https://code-executor-backend-ishubham21.vercel.app/user/login', requestOptions)
            .then(res => res.json())
            .then(({ error, data }) => {

                //detecting if request has any errors
                const hasError = error != null

                //setting the message to be shown to the user based on the errors encountered
                setStatusText({
                    text: hasError ? `${error}` : `Logging you in...`,
                    severity: hasError ? 'error' : `success`
                })

                //in case of no errors wait for 3s and redirect the user to the dashboard
                if (!hasError) {
                    e.target.reset()
                    localStorage.setItem('token', data.token)

                    //redirecting users to the dashboard after 3s
                    setTimeout(() => {
                        setStatusText(null)    //nullifying this to remove the value from the home    
                        redirectAfterSuccess()  //the function passed down from the parent to redirect to dashboard
                    }, 3000)
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.sample}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        margin="normal"
                        color="secondary"
                        sx={{ width: '100%' }}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        margin="normal"
                        color="secondary"
                        sx={{ width: '100%', marginBottom: '30px' }}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <Button variant="contained" type="submit" color="secondary">Login</Button>
                </form>
                <p className={styles.noAccount} onClick={() => {setIsLogin(false)}}>Don't have an account?</p>
            </div>
        </div>
    )
}

export default Login
