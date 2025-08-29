import { logger } from "../logger/winston_logger.js";
import { asyncHandler } from "../utlis/asynchandler.js";

const api_tracking = asyncHandler(async (req,res, next)=>{
    logger.info({
        message : {
            text : "Api Request",
            method : req.method,
            url : req.originalUrl,
            time : new Date().toISOString(),
            ip : req.ip
        }
    });

    next();
});

export {
    api_tracking
};
