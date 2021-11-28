import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sideBlk}></div>
            <div className={styles.paraContainer}>
                <p className={styles.fourOFour}>404!</p>
                <p className={styles.para}>Please go back to home <Link to='/'>from here</Link></p>
            </div>
        </div>
    )
}

export default NotFound