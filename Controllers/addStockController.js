const {addStockModel,givenOutMaterialsModel}=require('../modules/addStockModel')

async function addStock(req,res){
const {materialName,materialSize,materialType,quantity,date}=req.body
if(!materialName || !materialSize || !materialType || !quantity || !date){
  return res.json({success:false})
}
try {
   await addStockModel.create({
    materialName:materialName,
    materialSize:materialSize,
    materialType:materialType,
    quantity:quantity,
    date:date
   })
   res.json({success:true}) 
} catch (error) {
    console.log(error)
    return
}
}
async function couplersOD20mm(req,res){
const materials=await addStockModel.find()
let total20mm=0;let total25mm=0;let total32mm=0;let total40mm=0;let total50mm=0;let total63mm=0;let total75mm=0;let total90mm=0;let total110mm=0;let total160mm=0

let totalPipe20mm=0;let totalPipe25mm=0;let totalPipe32mm=0;let totalPipe40mm=0;let totalPipe50mm=0;let totalPipe63mm=0;let totalPipe75mm=0;let totalPipe90mm=0;let totalPipe110mm=0;let totalPipe160mm=0

if(materials){
materials.forEach(material => {
  if(material.materialName ==='Connector' && material.materialSize ==='OD20mm'){
    total20mm =total20mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD20mm'){
    totalPipe20mm =totalPipe20mm + material.quantity  
  }
 if(material.materialName ==='Connector' && material.materialSize ==='OD25mm'){
    total25mm =total25mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD25mm'){
    totalPipe25mm =totalPipe25mm + material.quantity  
  }
  if(material.materialName ==='Connector' && material.materialSize ==='OD32mm'){
    total32mm =total32mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD32mm'){
    totalPipe32mm =totalPipe32mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD40mm'){
    total40mm =total40mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD40mm'){
    totalPipe40mm =totalPipe40mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD50mm'){
    total50mm =total50mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD50mm'){
    totalPipe50mm =totalPipe50mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD63mm'){
    total63mm =total63mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD63mm'){
    totalPipe63mm =totalPipe63mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD75mm'){
    total75mm =total75mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD75mm'){
    totalPipe75mm =totalPipe75mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD90mm'){
    total90mm =total90mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD90mm'){
    totalPipe90mm =totalPipe90mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD110mm'){
    total110mm =total110mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD110mm'){
    totalPipe110mm =totalPipe110mm + material.quantity  
  }
if(material.materialName ==='Connector' && material.materialSize ==='OD160mm'){
    total160mm =total160mm + material.quantity  
  }
  if(material.materialName ==='Pipe' && material.materialSize ==='OD160mm'){
    totalPipe160mm =totalPipe160mm + material.quantity  
  }


}) 
res.json({success:true,total20mm,totalPipe20mm,total25mm,totalPipe25mm,total32mm,totalPipe32mm,total40mm,totalPipe40mm,total50mm,totalPipe50mm,total63mm,totalPipe63mm,total75mm,totalPipe75mm,total90mm,totalPipe90mm,total110mm,totalPipe110mm,total160mm,totalPipe160mm})
}
}
//giveOutMaterials
async function giveOutMaterials(req,res) {
const {GIVENTO,materialName,materialSize,materialType,quantity,date}=req.body
if(!GIVENTO || !materialName ||!materialSize || !materialType || !quantity || !date){
  return res.json({success:false})
}
try{
const materials=await addStockModel.findOne({materialName:materialName,materialSize:materialSize})
if(!materials){return res.json({success:false})}
//check for enough materials
if(quantity > materials.quantity){return res.json({success:false})}
//reduce materials if given out
materials.quantity=materials.quantity-quantity
//save new stock
await materials.save()
//reg given out materials
const givenOut=new  givenOutMaterialsModel({
  materialName:materials.materialName,
  materialSize:materials.materialSize,
  quantity:quantity,
  GIVENTO:GIVENTO,
  materialType,
  date:date
})
await givenOut.save()
return res.json({success:true})
}
 catch (error) {
  console.log(error)
  return res.json({success:false})
}
}
async function viewStock(req,res) {
  try {
    const availableStock=await addStockModel.find()
  if(availableStock){
    res.json({success:true,availableStocks:availableStock})
  }
  } catch (error) {
    console.log(error)
    return res.json({success:false})
  }
  
}



module.exports={addStock,couplersOD20mm,giveOutMaterials,viewStock}