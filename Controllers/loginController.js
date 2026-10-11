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
}
catch (error) {
    console.log(error)
    
    return res.json({success:false})
}
    
}


// ADD USER
async function addUser(req,res) {
    const {username,role,password}=req.body
    if(!username || !role || !password ){
        return res.json({success:false})
    }
    const cleanUsername=username.toLowerCase().trim()
    try {
const existingUser=await loginModel.findOne({username:cleanUsername})
    if(!existingUser){
 await loginModel.create({username:cleanUsername,role:role,password:password})
 res.json({success:true,message:'User added successsfully'})
    }else{return res.json({success:false,message:'Username already exists, try another one..!'})}
      
       
    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }
}
//signup user
async function signup(req,res){
const {username,role,password}=req.body
    if(!username || !role || !password ){
        return res.json({success:false})
    }
    const cleanUsername=username.toLowerCase().trim()
    try {
const existingUser=await loginModel.findOne({username:cleanUsername})
    if(!existingUser){
 await loginModel.create({username:cleanUsername,role:role,password:password})
 res.json({success:true})
    }else{return res.json({success:false,message:'Username already exists, try another one..!'})}
      


}catch(error){
    console.log(error)
    return res.json({success:false})
}

}
//login user
async function login(req,res){
const {username,password}=req.body
if(!username || !password){
    return res.json({success:false})
}
const cleanUsername=username.toLowerCase().trim()
try {
    const admin=await adminModel.findOne({username:cleanUsername,password:password})
    if (admin){
    req.session.user={username:admin.username, role:admin.role}
    return  res.json({success:true,username:admin.username,role:admin.role})
    }
    const logginUser=await loginModel.findOne({username:cleanUsername,password:password})

    if(!logginUser){
        return res.json({success:false,message:'Invalid Username/Password'})
    }else if(!logginUser.active){
       return res.json({success:false,message:'Your Account has been DISABLED, please contact admin'})  
    }
    req.session.user={username:logginUser.username,role:logginUser.role}
    return res.json({success:true,username:logginUser.username,role:logginUser.role})
    

 

}catch(error){
    console.log(error)
   
}
}
// view users
async function viewUsers(req,res){
    try {
      const users=await loginModel.find()
    if(users.length>0){
        res.json({success:true,users:users})
    }else{return res.json({success:false,message:'No Users were found..'})}

    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }

}
//disable user
async function disableUser(req,res) {
   const id=req.params.id 
   try {
    const disabledUser= await loginModel.findById(id)
    if(!disabledUser){
       return res.json({success:false,message:'User not found'})
    }
    
   if(disabledUser.active){
    disabledUser.active=false
    await disabledUser.save()
   return res.json({
    success:true,active:false,  message: 'User disabled successfully'})
}else{
            disabledUser.active=true
            await disabledUser.save()

            return res.json({
                success:true,
                message:'User enabled successfully',
                active:true,
                
            })
        }
   } catch (error) {
    console.log(error)
    return res.json({success:false})
   }
   
}
async function editUser(req,res) {
    const id=req.params.id
    try {
       
        const editedUser=await loginModel.findByIdAndUpdate(
            id,
         req.body,
            {new:true}
        )
        if(editedUser){
         return   res.json({success:true,message:'user edited successfully'})
        }else{return res.json({success:false,message:'Failed to edit user'})}
    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }

    
}
async function deleteUser(req,res) {
    const id=req.params.id
    try {
        
        const deletedUser=await loginModel.findByIdAndDelete(id)
        if(deletedUser){
            return res.json({success:true,message:'user deleted successfully'})
        }else{return res.json({success:false,message:'failed to delete user'})}
    } catch (error) {
       console.log(error)
       returnres.json({success:false}) 
    }
}

module.exports={signupAdmin,addUser,signup,login,viewUsers,disableUser,editUser,deleteUser}