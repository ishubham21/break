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

    useEffect(() => {
        fetch('http://localhost:4000/dashboard', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(({ error, data }) => {
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

            {loadingMsg && <div className={styles.loadinBlk}>
                {loadingMsg}
            </div>}

            {userData && <div className={styles.wrapper}>
                <button onClick={logout}> Logout</button>
                Welcome, {userData.user.name}
            </div>}
        </div>

    )
}

export default Dashboard