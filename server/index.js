const mongoose = require('mongoose')

const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
app.use(cors())

//to make sure that the JSON data is read too
app.use(express.json())

//connecting it the MongoDB Atlas - promise based approach
mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successful!')
}).catch(err => console.error(err))

//using the /user middleware
const authRoutes = require('./routes/auth')
app.use('/user', authRoutes)

//using the validateToken middleware to secure the /dashboard route
//any request coming to /dashboard will firstly be passed through validateToken where the JWT token is verfied
//if the verification is successful, the request is then moved to the dashboard route
const dashboardRoute = require('./routes/dashboard')
const validateToken = require('./middlewares/token-validator')
app.use('/dashboard', validateToken, dashboardRoute)

//to deal with all the IDE-related routes
const ideRoute = require('./routes/ide')
app.use('/ide', ideRoute)

//securing the /code route with validateToken middleware
const fetchCode = require('./routes/fetchCode')
app.use('/code', validateToken, fetchCode)

app.listen(4000, () => {
    console.log(`Listening on port 4000`);
})