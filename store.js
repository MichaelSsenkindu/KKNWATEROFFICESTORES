const dotenv=require('dotenv')
dotenv.config()
// console.log('secret:',process.env.KKN_SESSION_KEY)
const express=require('express')
const app=express()
const session=require('express-session')
const MongoStore=require('connect-mongo').default
const mongoose=require('mongoose')
const connectDB=require('./config/db')
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
 secret:process.env.KKN_SESSION_KEY,
 resave:false,
 saveUninitialized:false,
 store: MongoStore.create({
   mongoUrl:process.env.MONGO_URI 
 }),
 cookie:{
    maxAge:1000*60*30
   
 }
 
}))
const router=require('./Routers/stockRouter')
const loginRouter=require('./Routers/loginRouter')
app.use(router)
app.use(loginRouter)

    const port= process.env.PORT ||3000
    app.listen(port,()=>{
        console.log(`app running on port ${port}`)
    })

