const experss=require('express')
const route=experss.Router()

const checkNumbers=require('../middleware/checkNumbers')
route.post('/addnumber',checkNumbers,(req,res)=>{
    const {num1,num2}=req.body
 const result=num1+num2;
 
 res.send({ans:result})
 
})
module.exports=route