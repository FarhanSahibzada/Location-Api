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


    console.log("request aye ", data);
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
        IP: ip === '::1' ? '127.0.0.1' : ip
    };

    console.log("current ip", customer.IP)

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

    const callbackMethod = (result)=>{
        if(result['response_code'] === 400){
            console.log("this is the result" , result['result']);            
        }else{
             console.log(result.redirect_url);
        }

    }

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