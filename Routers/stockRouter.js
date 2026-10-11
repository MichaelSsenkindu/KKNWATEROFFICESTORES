const express=require('express')
const router=express.Router()
const path=require('path')
const {addStock,
    couplersOD20mm,
    giveOutMaterials,
    viewStock,
    totalMaterialsUsed,editStock,searchStock,
deleteStock,viewAllRequests}=require('../Controllers/addStockController')
const isLoggedIn=require('../middleware/authMiddeleware')

router.get('/addStock',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/addStock.html'))
})
router.get('/viewStock',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/viewStock.html'))
})
router.get('/giveOutMaterials',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/giveOutMaterials.html'))
})
router.get('/totalMaterialsUsed',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/totalMaterialsUsed.html'))
})
router.get('/editStock',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/editStock.html'))
})
router.get('/searchStock',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/searchStock.html'))
})
router.get('/deleteStock',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/deleteStock.html'))
})
router.get('/viewAllRequests',isLoggedIn,(req,res)=>{
res.sendFile(path.join(__dirname,'../protected/viewAllRequests.html'))
})
router.post('/addStock',isLoggedIn,addStock)
router.get('/couplersOD20mm',isLoggedIn,couplersOD20mm)
router.post('/stocks/giveOutMaterials',isLoggedIn,giveOutMaterials)
router.get('/stocks/viewStock',isLoggedIn,viewStock)
router.get('/stocks/totalMaterialsUsed',isLoggedIn,totalMaterialsUsed)
router.put('/stocks/editStock/:id',isLoggedIn,editStock)
router.get('/stocks/searchStock',isLoggedIn,searchStock)
router.delete('/stocks/deleteStock/:id',isLoggedIn,deleteStock)
router.delete('/stocks/viewAllRequests',isLoggedIn,viewAllRequests)



module.exports=router