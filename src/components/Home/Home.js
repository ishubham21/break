import styles from './Home.module.css'
import Grid from '@mui/material/Grid'

const Home = () => {
    
    //making sure that the window is opened only in the desktop window
    const width = window.innerWidth
    if(window.innerWidth < 800){
        return(
            <div className={styles.smallScreenMsg}>
                Please open this window on a desktop
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