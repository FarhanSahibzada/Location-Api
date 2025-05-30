
const asyncHandler = (requestfunction)=> async(req , res ,next)=>{
    try {
        await requestfunction(req,res, next)    
    } catch (error) {
        next(error)
    }
}


export {
    asyncHandler
}