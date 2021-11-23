import styles from './Home.module.css'
import Grid from '@mui/material/Grid'
import peaceImg from './../../assets/smallScreen.png'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { useState } from 'react'
import { Alert } from '@mui/material'

const Home = () => {

    const [isLogin, setIsLogin] = useState(true)    //decides which component to render
    const [statusText, setStatusText] = useState(null)  //to set the alert toast

    //making sure that the window is opened only in the desktop window
    const width = window.innerWidth
    if (window.innerWidth < 800) {
        return (
            <div className={styles.smallScreenMsg}>
                <img src={peaceImg} alt="Peace illustration" />
                <strong>Please use a desktop to open this window</strong>
            </div>
        )
    }

    return (<>
        <div className={styles.container}>
            <div className={styles.sideBlk}></div>
            <Grid container className={styles.subContainer}>
                <Grid item md={4} className={styles.headBlk}>
                    <p>Break</p>
                    for developers, by developers
                </Grid>
                <Grid item md={8} className={styles.innerGrid}>
                    {isLogin ? <Login setStatusText={setStatusText} setIsLogin={setIsLogin} /> : <Register setStatusText={setStatusText} setIsLogin={setIsLogin} />}
                </Grid>
            </Grid>

            {statusText && <div className={styles.alertToast}><Alert severity={statusText.severity}>
                {statusText.text}
            </Alert></div>}
        </div>
    </>
    )
}

export default Home