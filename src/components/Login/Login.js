import styles from './Login.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { TextField } from '@mui/material'
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/utils'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

const Login = () => {

    const classes = useStyles()

    // ClassNameGenerator.configure((component) => `inputField ${component}`)

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
            .then(({ error, data }) => {

                //detecting if request has any errors
                const hasError = error != null

                //setting the message to be shown to the user based on the errors encountered
                setMessage({
                    out: hasError ? `${data.error}` : `Logging you in...`,
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
            .catch(error => {
                setMessage({
                    out: 'Login failed, please check your connection and refresh.',
                    color: 'alert-danger'
                })
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        margin="normal"
                        color="secondary"
                        sx={{ width: '100%' }}
                        className={classes.root}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        margin="normal"
                        color="secondary"
                        sx={{ width: '100%' }}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <div className="btnContainer d-flex justify-content-center align-items-center">
                        <button type="submit" className="d-block btn btn-success" style={{ marginRight: '10px' }}>Login</button>
                    </div>
                </form>

                {message && <div className={`mt-4 text-center ${styles.statusText} ${message.color}`}>
                    {message.out}
                </div>}
            </div>
        </div>
    )
}

export default Login