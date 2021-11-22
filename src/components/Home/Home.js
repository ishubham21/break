import styles from './Home.module.css'
import Grid from '@mui/material/Grid'
import peaceImg from './../../assets/smallScreen.png'

const Home = () => {
    
    //making sure that the window is opened only in the desktop window
    const width = window.innerWidth
    if(window.innerWidth < 800){
        return(
            <div className={styles.smallScreenMsg}>
                <img src={peaceImg} alt="Peace illustration" />
                <strong>Please use a desktop to open this window</strong>
            </div>
        )
    }

    return(<>
            <div className={styles.container}>
                <div className={styles.subContainer}></div>
            </div>
        </>
    )
}

export default Home