import paytabs from 'paytabs_pt2';
import { asyncHandler } from '../utlis/asynchandler.js';
import { responseApi } from '../utlis/responseApi.js';

let profileID = process.env.PAYTAB_PROFILE_ID,
    serverKey = process.env.PAYTAB_SERVER_KEY,
    region = "Pakistan";

paytabs.setConfig(profileID, serverKey, region);

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
        id: "car_123",
        currency: "USD",
        amount: "10",
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
        IP: ip
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
        response: 'http://localhost:5173/pricing-page',
        callback: 'http://localhost:8000/api/v1/payment/payment-callback'
    }

    let response_URLs = [
        url.response,
        url.callback
    ];


    let lang = "en";
    let frameMode = true;

    paytabs .createPaymentPage(
        paymentMethods,
        transactionDetails,
        cartDetails,
        customerDetails,
        shippingDetails,
        response_URLs,
        lang,
        frameMode,
        (err, result) => {
            if (err) {
                console.error('❌ PayTabs error:', err);
                return res.status(500).json(new responseApi(500 , "when doing a transcation created a error"));
            }

            console.log('✅ PayTabs result:', result);
            return res.status(200).json(new responseApi(200 , {payment_url : result.redirect_url }));
        }
    );

})


export {
    checkoutController
}