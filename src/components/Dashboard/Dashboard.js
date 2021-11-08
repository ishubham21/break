import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from './Dashboard.module.css'

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null)
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        history.push('/login')
    }

    useEffect(() => {
        fetch('http://localhost:4000/dashboard', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')    //setting headers to match the request
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const hasError = data.error != null
            !hasError && setDashboard(data)
        })
    }, [])

    return (
        <div className={styles.container}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    Code Executor
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/dashboard">
                                Dashboard <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <span
                                className="nav-link cursor-pointer"
                                onClick={() => logout()}
                            >
                                Logout
                            </span>
                        </li>
                    </ul>
                    <span className="navbar-text">Welcome!</span>
                </div>
            </nav>
        </div>
    )
}

export default Dashboard