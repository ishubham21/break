import styles from './Login.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router'

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
            .then(({ error, data}) => {

                //detecting if request has any errors
                const hasError = error != null
                
                //setting the message to be shown to the user based on the errors encountered
                setMessage({
                    out: hasError ? `${data.error}`: `Logging you in...`,
                    color: hasError ? 'alert-danger': `alert-success`
                })

                //in case of no errors wait for 3s and redirect the user to the dashboard
                if(!hasError){
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
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Email</label>
                        <input type="name" className="form-control" id="email" aria-describedby="Your email address" placeholder="Your email address here" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Your password here" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

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