import styles from './Register.module.css'
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Register = ({ setStatusText, setIsLogin }) => {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            setStatusText({
                text: `Please fill all the values`,
                severity: 'error'
            })
        } else {
            //setting display message for the user
            setStatusText({
                text: "Creating your account...",
                severity: "success"
            })

            //making a POST request to the register API 
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
            fetch('https://code-executor-backend-ishubham21.vercel.app/user/register', requestOptions)
                .then(res => res.json())
                .then(({ error }) => {

                    //handling errors
                    const hasError = error != null
                    setStatusText({
                        text: hasError ? `${error}` : `Congratulations, ${name}. You have been successfully registered!`,
                        severity: hasError ? 'error' : 'success'
                    })
                    if (!hasError) {
                        e.target.reset()
                        setTimeout(() => {
                            setStatusText(null)
                            setIsLogin(true)
                        }, 2000)
                    }
                })
                .catch(error => {
                    setStatusText({
                        text: 'Registration failed, please try again.',
                        severity: 'error'
                    })
                })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.sample}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="standard"
                        margin="normal"
                        color="secondary"
                        sx={{ width: '100%' }}
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
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
                    <Button variant="contained" type="submit" color="secondary">Register</Button>
                </form>
                <p className={styles.noAccount} onClick={() => {setIsLogin(true)}}>Already have an account?</p>
            </div>
        </div>
    );
}

export default Register
