import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CodeBlock from '../CodeBlock/CodeBlock'
import Navbar from '../Navbar/Navbar'
import styles from './Dashboard.module.css'
import { Drawer, Box, AppBar } from '@mui/material'

const Dashboard = () => {

    const drawerWidth = 340 //for MUI drawer

    //setting a loading msg before the content of the dashboard loads
    const [loadingMsg, setLoadingMsg] = useState("Crunching your awesome codes, please wait!")
    const [notLoaded, setNotLoaded] = useState(true)    //using this to set the visbility of the loading message

    //for navigating around the routes
    const [userData, setUserData] = useState(null)
    const history = useHistory()

    const [userCodes, setUserCodes] = useState(null)    //for getting all the previous codes of the users 

    const logout = () => {  //function to clear users' data from the localStorage and redirect them to the login page
        localStorage.clear()
        history.push('/home')
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
                    setNotLoaded(false)
                }
            })
            .catch(error => {
                setLoadingMsg("Some error occured, please try again!")
            })
    }, [])

    return (
        <div className={styles.container}>

            {notLoaded && <div className={styles.loadingBlk}>
                {loadingMsg}
            </div>}

            {userData && <div className={styles.wrapper}>

                <Box sx={{ display: 'flex', height: '100%' }}>
                    <AppBar
                        position="fixed"
                        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                    >
                    </AppBar>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundColor: '#5663F7',
                                color: '#fff',
                                height: '100%'
                            },
                            height: '100%'
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Navbar userName={userData.user.name} logout={logout} />
                    </Drawer>
                    
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3 }}
                    >
                        {userCodes && <div>
                            <p className={styles.codesHead}>My Codes</p>
                            <div className={styles.subContainer}>
                                {userCodes.map(codeDetails => (
                                    <CodeBlock fileName={codeDetails.fileName} codeId={codeDetails._id} userId={codeDetails.userId} key={codeDetails._id} />
                                ))}
                            </div>
                        </div>}

                        <Link to='/dashboard/code'>
                            New
                        </Link>

                    </Box>
                </Box>

            </div>}
        </div>

    )
}

export default Dashboard
