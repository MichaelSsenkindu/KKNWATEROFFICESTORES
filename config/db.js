const mongoose=require('mongoose')

async function connectDB(req,res){
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Atlas connected successfully')
    
} catch (error) {
    console.log('failed to connect MongoDB')
    console.log(error)
    return
}
}

module.exports=connectDB