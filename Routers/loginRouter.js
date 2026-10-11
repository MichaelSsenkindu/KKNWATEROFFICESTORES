const express=require('express')
const loginRouter=express.Router()
const path=require('path')
const {signupAdmin,addUser,signup,login,viewUsers,disableUser,editUser,deleteUser}=require('../Controllers/loginController')
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
loginRouter.get('/disableUser',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/disableUser.html'))
})
loginRouter.get('/editUser',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/editUser.html'))
})
loginRouter.get('/deleteUser',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/deleteUser.html'))
})
// loginRouter.get('/signupAdmin',signupAdmin)
loginRouter.post('/addUser',isLoggedIn,addUser)
loginRouter.post('/signup',signup)
loginRouter.post('/login',login)
loginRouter.get('/users/viewUsers',isLoggedIn,viewUsers)
loginRouter.put('/users/disableUser/:id',isLoggedIn,disableUser)
loginRouter.put('/users/editUser/:id',isLoggedIn,editUser)
loginRouter.delete('/users/deleteUser/:id',isLoggedIn,deleteUser)





module.exports=loginRouter