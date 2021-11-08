import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from './Dashboard.module.css'

const Dashboard = () => {

    const [loadingMsg, setLoadingMsg] = useState("Fetching your awesome codes, please wait!")

    const [userData, setuserData] = useState(null)
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        history.push('/login')
    }

    //running a function every time the dashboard is loaded
    useEffect(() => {
        fetch('http://localhost:4000/dashboard', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')    //sending auth-token as the request header
            }
        })
            .then(res => res.json())
            .then(({ error, data }) => {
                console.log(data)
                const hasError = error != null
                setLoadingMsg(null)
                !hasError && setuserData(data)
            })
            .catch(error => {
                setLoadingMsg("Some error occured, please try again!")
            })
    }, [])

    return (
        <div className={styles.container}>

            {<div className={styles.loadinBlk}>
                {loadingMsg}
            </div>}

            {userData && <div className={styles.wrapper}>

                <nav className={`${styles.navbar}`}>
                    <div className={`d-flex align-items-center ${styles.subContainer}`}>
                        <h4>Code Executor</h4>
                        <div style={{ marginLeft: 'auto' }}>
                            Welcome, {userData.user.name}
                            <button className="btn btn-outline-danger mx-3" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </nav>



            </div>}
        </div>

    )
}

export default Dashboard