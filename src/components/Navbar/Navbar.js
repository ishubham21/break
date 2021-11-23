import styles from './Navbar.module.css'
import { Button } from '@mui/material'

const Navbar = ({ userName, logout }) => {
    return (<>
        <nav className={`${styles.navbar} ${styles.subContainer}`}>

            <div className={styles.headingBlk}>
                <h4 className={styles.brand}>Break</h4>
            </div>

            <div className={`d-flex justify-content-center align-items-center`} style={{ marginLeft: 'auto' }}>
                <p className={styles.username} >Welcome, {userName}</p>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        color: '#fff',
                        backgroundColor: '#fff',
                        color: '#5663F7',
                        position: 'absolute',
                        bottom: '50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        '&:hover': {
                            border: '1px solid #fff',
                            backgroundColor: '#5663F7',
                            color: '#fff'
                        }
                    }}
                    onClick={() => { logout() }} >
                    Logout
                </Button>
            </div>
        </nav>
    </>)
}

export default Navbar