const mongoose=require('mongoose')


const adminSchema=new mongoose.Schema({
username:{type:String,required:true},
password:{type:String,required:true},
role:{type:String,required:true}


})
const adminModel=mongoose.model('Admin',adminSchema)

const loginSchema=new mongoose.Schema({
username:{type:String,required:true},
password:{type:String,required:true},
role:{type:String,required:true}

})
const loginModel=mongoose.model('Users',loginSchema)



module.exports={adminModel,loginModel}