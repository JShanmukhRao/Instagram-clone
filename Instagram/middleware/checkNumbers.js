module.exports=(req,res,next)=>{
    const {num1,num2}=req.body
 console.log("num")
    if(num1<=0 || num2<=0)
    {
        return res.status(402).json({err:"Numbers should be greater than zero"});
    }
    else{
        next();
    }
}