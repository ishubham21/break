import styles from './Register.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';

const Register = () => {

    const history = useHistory()

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null)

    const handleSubmit = (e) => {

        e.preventDefault()
        
        if (!name || !email || !password) {
            setMessage({
                out: `Please fill all the values`,
                color: 'alert-danger'
            })
        }
        else {
            //setting display message for the user
            setMessage({
                out: "Creating your account...",
                color: "alert-success"
            })

            //making a POST request to the register API 
            fetch('http://localhost:4000/user/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    //handling errors
                    const hasError = data.error != null

                    setMessage({
                        out: hasError ? `${data.error}` : `Congratulations, ${name}. You have been successfully registered!`,
                        color: hasError ? 'alert-danger' : 'alert-success'
                    })

                    if (!hasError) {
                        e.target.reset()
                        setTimeout(() => {
                            history.push('/login')
                        }, 3000)
                    }
                })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your name</label>
                        <input type="name" className="form-control" id="name" aria-describedby="Your name" placeholder="Your name here" onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>

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
                        <button type="submit" className="d-block btn btn-success" style={{ marginRight: '10px' }}>Register</button>
                        <Link to="/login">
                            <button className="d-block btn btn-outline-danger"> Cancel</button>
                        </Link>
                    </div>
                </form>

                {message && <div className={`mt-4 text-center ${styles.statusText} ${message.color}`}>
                    {message.out}
                </div>}
            </div>
        </div>
    );
}

export default Register