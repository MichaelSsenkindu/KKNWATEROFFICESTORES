const {loginModel,adminModel}=require('../modules/loginModule')

// signup admin
async function signupAdmin(req,res) {

try {
     
const admin=await adminModel.findOne({username:'admin'}) 
  
if(admin){
    return res.json({success:false,message:'Admin already exists'})
}
const newAdmin=await adminModel.create({username:'admin',password:'123',role:'Admin'})
res.json({success:true,role:newAdmin.role})
} catch (error) {
    console.log(error)
    
    return res.json({success:false})
}
    
}


// addUser
async function addUser(req,res) {
    const {username,role,password}=req.body
    if(!username || !role || !password ){
        return res.json({success:false})
    }
    try {
       const newUser=await loginModel.create({username:username,role:role,password:password})
       if(newUser){
res.json({success:true})
       }
       
    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }
}

async function login(req,res){
const {username,password}=req.body
if(!username || !password){
    return res.json({success:false})
}
try {
const admin=await adminModel.findOne({username:username,password:password})
if(admin){
    res.json({success:true,username:admin.username,role:admin.role})
}
const user=await loginModel.findOne({username:username,password:password}) 
if(user){
res.json({success:true,username:user.username,role:user.role})
}
   
} catch (error) {
    console.log(error)
    return res.json({success:false})
}
}
// view users
async function viewUsers(req,res){
    try {
      const users=await loginModel.find()
    console.log(users)
    res.json({success:true,users:users})

    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }

}


module.exports={signupAdmin,addUser,login,viewUsers}