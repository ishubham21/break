import styles from './Login.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { TextField, Button } from '@mui/material'

const Login = () => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null)

    //for redirection purposes
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()

        setMessage({
            out: `Please wait...`,
            color: 'alert-success'
        })

        //sending a post request to the specified URL 
        //with email and password as the body of the request
        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(async ({ error, data }) => {

                //detecting if request has any errors
                const hasError = await error != null

                //setting the message to be shown to the user based on the errors encountered
                setMessage({
                    out: hasError ? `${error}` : `Logging you in...`,
                    color: hasError ? 'alert-danger' : `alert-success`
                })

                //in case of no errors wait for 3s and redirect the user to the dashboard
                if (!hasError) {
                    e.target.reset()
                    setTimeout(() => {
                        localStorage.setItem('token', data.token) //storing the JWT token in localStorage
                        history.push('/dashboard')   //redirecting users to the dashboard
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

                {message && <div className={`mt-4 text-center ${styles.statusText} ${message.color}`}>
                    {message.out}
                </div>}
            </div>
        </div>
    )
}

export default Login