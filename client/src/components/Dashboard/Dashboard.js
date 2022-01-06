import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CodeBlock from './components/CodeBlock/CodeBlock'
import Navbar from '../Navbar/Navbar'
import styles from './Dashboard.module.css'
import { Drawer, Box, AppBar, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {

    const drawerWidth = 300 //for MUI drawer

    //setting a loading msg before the content of the dashboard loads
    const [loadingMsg, setLoadingMsg] = useState("Crunching your awesome codes, please wait!")
    const [notLoaded, setNotLoaded] = useState(true)    //using this to set the visbility of the loading message

    //for navigating around the routes
    const [userData, setUserData] = useState(null)
    const [userCodes, setUserCodes] = useState(null)    //for getting all the previous codes of the users 

    const history = useHistory()
    const logout = () => {  //function to clear users' data from the localStorage and redirect them to the login page
        localStorage.clear()
        sessionStorage.clear()
        history.push('/home')
    }

    //running a function every time the dashboard is loaded
    useEffect(() => {
        fetch('https://code-executor-backend-ishubham21.vercel.app/dashboard', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')    //sending auth-token as the request header
            }
        })
            .then(res => res.json())
            .then(async ({ error, data }) => {
                const hasError = error != null      //checking for errors returned from the API
                if (!hasError) {                      //setting values incase of no errors 
                    setLoadingMsg(null)
                    setUserData(data.user)
                    setNotLoaded(false)

                    //to prevent empty rendering
                    if (data.content.length !== 0) {
                        setUserCodes(data.content.reverse())

                    }

                    //storing the userId in sessionStorage to use it in Editor.js
                    //using sessionStorage because this data is rendered each time the user opens dashboard (due to useEffect hook) and hence no need to store the data after the tab has been closed 
                    sessionStorage.setItem('userId', data.user.id)
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
                    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} />
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundColor: '#5663F7',
                                color: '#fff',
                                borderTopRightRadius: '100px'
                            },
                            height: '100%',
                            position: 'relative',
                            animation: 'slideIn 0.8s'
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Navbar userName={userData.name} logout={logout} />
                    </Drawer>

                    <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative' }}>

                        <p className={styles.codesHead}>My Codes</p>
                        {userCodes && <Box>
                            <Box sx={{display: 'flex', padding: '10px' }}>
                                {userCodes.map(code => (
                                    <CodeBlock fileName={code.fileName} codeId={code._id} lang={code.language} key={code._id} />
                                ))}
                            </Box>
                        </Box>}

                        {!userCodes && <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                            Nothing here, click on the add button to start coding
                        </Box>}

                        <Link to='/dashboard/code' x={{ display: 'block' }}>
                            <Fab
                                color="secondary"
                                aria-label="language"
                                sx={{
                                    position: 'absolute',
                                    bottom: '70px',
                                    right: '70px'
                                }}
                            >
                                <AddIcon />
                            </Fab>
                        </Link>

                    </Box>
                </Box>
            </div>}
        </div>
    )
}

export default Dashboard
