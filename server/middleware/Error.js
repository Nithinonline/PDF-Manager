const ErrorHandler=require("../utils/ErrorHandler")


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500

    err.message=err.message || 'internal server Error'


    //duplicate key error
    if(err.code===11000){
        const message=`Duplicate key ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message, 400)
    }

    //wrong JWT
    if(err.name === 'jsonWebTokenError'){
        const message='Your Url or JWT is Invalid'
        err=new ErrorHandler(message, 400)
    }


    //jwt Expire
    if(err.name === 'TokenExpireError'){
        const message ='your Url or token is expired'
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}