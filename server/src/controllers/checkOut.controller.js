import { asyncHandler } from '../utlis/asynchandler.js';
import { paytabs } from '../config/payTabIntegration.js';
import { responseApi } from '../utlis/responseApi.js';



const checkoutController = asyncHandler(async (req, res) => {
    const data = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const paymentMethods = ['all'];

    let transaction = {
        type: "sale",
        class: "ecom"
    };

    let transactionDetails = [
        transaction.type,
        transaction.class
    ];

    let cart = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        currency: "PKR",
        amount: "1.00",
        description: "dummy description"
    }

    let cartDetails = [
        cart.id,
        cart.currency,
        cart.amount,
        cart.description
    ];

    let customer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
        IP: ip === '::1' ? '127.0.0.1' : ip
    };

    let customerDetails = [
        customer.name,
        customer.email,
        customer.phone,
        customer.street,
        customer.city,
        customer.state,
        customer.country,
        customer.zip,
        customer.IP
    ];

    let shippingDetails = customerDetails;

    let url = {
        response: 'https://webhook.site/cf9eee9b-98df-4508-b08a-4ebea4b8c9b8',
        callback: 'https://webhook.site/cf9eee9b-98df-4508-b08a-4ebea4b8c9b8'
    }

    let response_URLs = [
        url.response,
        url.callback
    ];

    let lang = "en";
    let frameMode = true;

    const callbackMethod = (result) => {
        if (result['response_code:'] === 400) {
            console.log("this is the result", result['result']);
            res.status(400).json(new responseApi(400, {}, result['result'], success = false));
        } else {
            const url = result.redirect_url;
            return res.status(200).json(new responseApi(200, { url: url }, "request is successfully accept"))
        }
    };


    paytabs.createPaymentPage(
        paymentMethods,
        transactionDetails,
        cartDetails,
        customerDetails,
        shippingDetails,
        response_URLs,
        lang,
        callbackMethod,
        frameMode
    );



})



export {
    checkoutController
}