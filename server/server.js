import express from 'express'

const app = express()
const PORT = 5000

import userRoute from './routes/user.route.js'
app.use('/api/v1/user', userRoute)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})

