import { asyncHandler } from "../utlis/asynchandler.js";
import { ApiError } from "../utlis/ErrorApi.js";
import { responseApi } from "../utlis/responseApi.js";


const paymentCallback = asyncHandler(async (req, res) => {
    const result = req.body;

    if (result.payment_result?.response_status === 'A') {
        console.log("✅ Transaction successful:", result);
       res.status(200).success(true).json(new responseApi(200, {} ,"Transaction processed." ));
    } else {
        throw new ApiError(500, "transcation is not successed");
    }

})


export {
    paymentCallback
}