import { Button, Box, Select, MenuItem } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import styles from './../Ide.module.css'

const IdeNavbar = ({ lang, fileName, setFileName, saveCode, setLanguage }) => {

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
            <Box sx={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                marginRight: '25px'
            }}>

                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#fff',
                        color: '#5663F7',
                        marginRight: '15px',
                        '&:hover': {
                            border: '1px solid #fff',
                            backgroundColor: '#5663F7',
                            color: '#fff'
                        }
                    }}
                    onClick={() => { logout() }}
                >
                    Run
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#fff',
                        color: '#5663F7',
                        marginRight: '15px',
                        '&:hover': {
                            border: '1px solid #fff',
                            backgroundColor: '#5663F7',
                            color: '#fff'
                        }
                    }}
                    onClick={() => { saveCode() }}
                >
                    Save
                </Button>

                {fileName && <input id="filename" name="filename" type="text" value={fileName} className={styles.fileName} onChange={(e) => { setFileName(e.target.value) }} />}

                {lang && <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    label="Language"
                    sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        marginRight: '35px'
                    }}
                    onChange={(e) => { setLanguage(e.target.value) }}
                >
                    <MenuItem value={'c'}>C</MenuItem>
                    <MenuItem value={'cpp'}>C++</MenuItem>
                    <MenuItem value={'java'}>Java</MenuItem>
                    <MenuItem value={'py'}>Python</MenuItem>
                    <MenuItem value={'javascript'}>JavaScript</MenuItem>

                </Select>}

                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#fff',
                        color: '#5663F7',
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
        </Box>
    </>)
}

export default IdeNavbar