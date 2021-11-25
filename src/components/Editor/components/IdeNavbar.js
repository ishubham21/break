import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { Link, useHistory } from 'react-router-dom'
import styles from './../Ide.module.css'

const IdeNavbar = ({ fileName, setFileName }) => {

    const history = useHistory()

    const logout = () => {  //function to clear users' data from the localStorage and redirect them to the login page
        localStorage.clear()
        history.push('/home')
    }

    return (<>

        <Box sx={{
            backgroundColor: '#5663F7',
            height: '8vh',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
        }}>
            <Link to='/'>
                <h4 className={styles.heading}>Break</h4>
            </Link>
            <Button
                variant="contained"
                type="submit"
                sx={{
                    color: '#fff',
                    backgroundColor: '#fff',
                    color: '#5663F7',
                    position: 'absolute',
                    right: '25px',
                    '&:hover': {
                        border: '1px solid #fff',
                        backgroundColor: '#5663F7',
                        color: '#fff'
                    }
                }}
            onClick={() => { logout() }} 
            >
                Logout
            </Button>
        </Box>
        <nav>

            <div className={`d-flex justify-content-center align-items-center`} style={{ marginLeft: 'auto' }}>
                {/* <p>Welcome, {userName}</p> */}


            </div>
        </nav>
    </>)
}

export default IdeNavbar