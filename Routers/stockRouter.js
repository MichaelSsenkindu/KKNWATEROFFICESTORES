const express=require('express')
const router=express.Router()
const {addStock,couplersOD20mm,giveOutMaterials,viewStock}=require('../Controllers/addStockController')



router.post('/addStock',addStock)
router.get('/couplersOD20mm',couplersOD20mm)
router.post('/giveOutMaterials',giveOutMaterials)
router.get('/viewStock',viewStock)

module.exports=router