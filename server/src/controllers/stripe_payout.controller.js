import { ApiError } from "../utlis/ErrorApi.js";
import { responseApi } from "../utlis/responseApi.js";
import { asyncHandler } from "../utlis/asynchandler.js";
import { Stripe } from "../config/StripePaymentIntregation.js";
import { v4 as uuidv4 } from 'uuid';

const stripe_checkout = asyncHandler(async (req, res) => {
    const { data } = req.body;
    const idempotencyKey = uuidv4();;


    if (
        [data.product_name, data.amount, data.token].some((product) => product?.trim() == '')
    ) {
        throw new ApiError(400, "cannot get the data the data");
    }

    return Stripe.customers.create({
        email: req.email,
        source: data.token
    }).then((customer) => {
        Stripe.charges.create({
            amount: data.amount * 100,
            currency: "SGD",
            customer: customer.id,
            receipt_email: req.email,
            description: `puschase of product name: ${data.product_name}`
        }, { idempotencyKey })
    }).then((result) => res.status(200).json(new responseApi(200, result)))
        .catch((err) => { throw new ApiError(400, `error when requesting the stripe payment api ${err}`) })

})

export {
    stripe_checkout
}