const mongoose=require('mongoose')

const addStockSchema=new mongoose.Schema({
materialName:{type:String,required:true},
materialSize:{type:String,required:true},
materialType:{type:String,required:true},
quantity:{type:Number,required:true},
date:{type:String,dafault:Date.now(),required:true}

})
const addStockModel=mongoose.model('Stocks',addStockSchema)

const givenOutMaterialsSchema=new mongoose.Schema({
GIVENTO:{type:String,required:true},   
materialName:{type:String,required:true},
materialSize:{type:String,required:true},
materialType:{type:String,required:true},
quantity:{type:Number,required:true},
date:{type:String,default:Date.now(),required:true}

})
const givenOutMaterialsModel=mongoose.model('GivenOutMaterials',givenOutMaterialsSchema)



module.exports={addStockModel,givenOutMaterialsModel}