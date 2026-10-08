const express=require('express')
const loginRouter=express.Router()
const path=require('path')
const {signupAdmin,addUser,signup,login,viewUsers}=require('../Controllers/loginController')
const isLoggedIn=require('../middleware/authMiddeleware')

loginRouter.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/login.html'))
})
loginRouter.get('/dashboard',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/dashboard.html'))
})
loginRouter.get('/login',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/login.html'))
})
loginRouter.get('/addUser',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/addUser.html'))
})
loginRouter.get('/viewUsers',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/viewUsers.html'))
})

// loginRouter.get('/signupAdmin',signupAdmin)
loginRouter.post('/addUser',isLoggedIn,addUser)
loginRouter.post('/signup',signup)
loginRouter.post('/login',login)
loginRouter.get('/users/viewUsers',isLoggedIn,viewUsers)





module.exports=loginRouter