const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])
const connectDB=require('./config/db')
connectDB()
const router=require('./Routers/stockRouter')
const loginRouter=require('./Routers/loginRouter')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(router)
app.use(loginRouter)

    const port= process.env.PORT ||3000
    app.listen(port,()=>{
        console.log(`app running on port ${port}`)
    })

