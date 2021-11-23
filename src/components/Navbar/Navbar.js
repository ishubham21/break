import styles from './Navbar.module.css'
import { Button } from '@mui/material'

const Navbar = ({ userName, logout }) => {
    return (<>
        <nav className={`${styles.navbar} ${styles.subContainer}`}>

            <div className={styles.headingBlk}>
                <h4 className={styles.brand}>Break</h4>
                <p>for developers, by developers</p>
            </div>

            <div className={`d-flex justify-content-center align-items-center`} style={{ marginLeft: 'auto' }}>
                <h6 >Welcome, {userName}</h6>
                <Button variant="contained" type="submit" onClick={() => { logout() }} className={styles.logoutBtn}>Logout</Button>
            </div>
        </nav>
    </>)
}

export default Navbar