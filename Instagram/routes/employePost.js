const express = require('express')
const router = express.Router()
const fs=require('fs')
router.get('/details',(req,res)=>{
    const data   = fs.readFileSync(__dirname+'/employee.json');

    console.log("Enter "+data)
    res.send(JSON.parse(data))
})
router.post('/form',(req,res)=>{
    const {employee}=req.body;
    console.log(employee+"h")
fs.appendFileSync('employee.json',employee)

})
module.exports=router