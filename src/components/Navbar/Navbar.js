import styles from './Navbar.module.css'

const Navbar = ({ userName, logout }) => {
    return (<>
        <nav className={`d-flex align-items-center ${styles.navbar} ${styles.subContainer}`}>

            <div className={styles.headingBlk}>
                <h4 className={styles.brand}>Break</h4>
                <p>for developers, by developers</p>
            </div>

            <div className={`d-flex justify-content-center align-items-center`} style={{ marginLeft: 'auto' }}>
                <h6 >Welcome, {userName}</h6>
                <button className="btn btn-outline-danger mx-3" onClick={logout()}>Logout</button>
            </div>
        </nav>
    </>)
}

export default Navbar