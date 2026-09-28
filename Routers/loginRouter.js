const express=require('express')
const loginRouter=express.Router()
const path=require('path')
const {signupAdmin,addUser,login,viewUsers}=require('../Controllers/loginController')

loginRouter.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/login.html'))
})
// loginRouter.get('/signupAdmin',signupAdmin)
loginRouter.post('/addUser',addUser)
loginRouter.post('/login',login)
loginRouter.get('/viewUsers',viewUsers)

module.exports=loginRouter