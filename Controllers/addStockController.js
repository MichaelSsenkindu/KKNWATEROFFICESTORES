const {addStockModel,givenOutMaterialsModel}=require('../modules/addStockModel')

async function addStock(req,res){
const {materialName,materialSize,materialType,quantity,date}=req.body
if(!materialName || !materialSize || !materialType || !quantity || !date){
  return res.json({success:false})
}
if(quantity<=0){return res.json({success:false,message:"The quantity must be greater than 0"})}
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
if(!materials){return res.json({success:false,message:'No record found.!'})}
//check for enough materials
if(quantity > materials.quantity){return res.json({success:false,message:'Sorry materials are not enough'})}
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
  materialType:materialType,
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
//VIEW STOCK
async function viewStock(req,res) {
  try {
    const availableStocks=await addStockModel.find()
  if(availableStocks.length>0){
    res.json({success:true,availableStocks:availableStocks})
  }
  } catch (error) {
    console.log(error)
    return res.json({success:false})
  }
  
}
async function totalMaterialsUsed(req,res) {
  try {
    const givenStocks=await givenOutMaterialsModel.find()
  if(givenStocks){
    return res.json({success:true,givenStocks:givenStocks})
  }else{return res.json({success:false,message:'No stock found'})}
  
  } catch (error) {
    console.log(error)
  }
  
}
async function editStock(req,res) {
 const id=req.params.id
 const {materialName,materialSize,materialType,quantity}=req.body
 try {
  const edited=await addStockModel.findByIdAndUpdate(id,{
    materialName:materialName,
      materialSize:materialSize,
      materialType:materialType,
      quantity:quantity
  },
  { new: true }
)
  if(edited){
    return res.json({success:true,message:'Stock updated successfully'})
  }else{
    return res.json({success:false,message:'Failed to update Stock'})
  }
 } catch (error) {
  console.log(error)
  return res.json({success:false})
 }
     
  
}

//SEARCH STOCK
async function searchStock(req,res){
  const searchInput=req.query.searchInput
  if(!searchInput){return res.json({success:false})}
  try {
    const stocks=await addStockModel.find({materialName:{$regex:searchInput,$options:'i'}})
    //Note {$regex:searchInput,$options:'i'} changes to lower case
    if(stocks.length>0){
      return res.json({success:true,stocks:stocks})
    }else{
      return res.json({success:false,message:'No Stock found'})
    }
  } catch (error) {
    console.log(error)
    return res.json({success:false})
  }
}
//DELETE STOCK
async function deleteStock(req,res) {
  const id=req.params.id
  
  try {
   const deleted=await addStockModel.findByIdAndDelete(id)
  if(deleted){
    return res.json({success:true,message:'Stock deleted successfully'})
  }else{
    return res.json({success:false,message:'Failed to delete Stock'})
  } 
  } catch (error) {
    console.log(error)
    return res.json({success:false})
  }
  
}



module.exports={addStock,
  couplersOD20mm,
  giveOutMaterials,
  viewStock,
  totalMaterialsUsed,
  editStock,
  searchStock,
  deleteStock

}