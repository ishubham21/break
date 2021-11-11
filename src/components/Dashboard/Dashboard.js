import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './Dashboard.module.css'

const Dashboard = () => {

    //setting a loading msg before the content of the dashboard loads
    const [loadingMsg, setLoadingMsg] = useState("Crunching your awesome codes, please wait!")

    //for navigating around the routes
    const [userData, setUserData] = useState(null)
    const history = useHistory()

    //for getting all the previous codes of the users 
    const [userCodes, setUserCodes] = useState([])  //giving it an empty value to prevent unmount error

    //function to clear users' data and redirect them to the login page
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
                const hasError = error != null      //checking for errors returned from the API

                if (!hasError) {                      //setting values incase of no errors 
                    setLoadingMsg(null)
                    setUserData(data)
                    setUserCodes(data.content)
                }

            })
            .catch(error => {
                setLoadingMsg("Some error occured, please try again!")
            })
    }, [])

    return (
        <div className={styles.container}>

            {<div className={styles.loadingBlk}>
                {loadingMsg}
            </div>}

            {userData && <div className={styles.wrapper}>

                <nav className={`d-flex align-items-center ${styles.navbar} ${styles.subContainer}`}>

                    <div className={styles.headingBlk}>
                        <h4 className={styles.brand}>Code Executor</h4>
                        <p>by developers, for developers</p>
                    </div>

                    <div className={`d-flex justify-content-center align-items-center`} style={{ marginLeft: 'auto' }}>
                        <h6 >Welcome, {userData.user.name}</h6>
                        <button className="btn btn-outline-danger mx-3" onClick={logout}>Logout</button>
                    </div>
                </nav>

                <p className={styles.codesHead}>My Codes</p>

                <div className={styles.subContainer}>

                    {userCodes.map(codeDetails => (
                        <CodeBlock fileName={codeDetails.fileName} codeId={codeDetails._id} userId={codeDetails.userId} key={codeDetails._id}/>
                    ))}
                </div>

                <Link to='/dashboard/editor'>
                    New
                </Link>

            </div>}
        </div>

    )
}

export default Dashboard