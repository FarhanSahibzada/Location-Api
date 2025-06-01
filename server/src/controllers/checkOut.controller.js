import paytabs from 'paytabs_pt2';
import { asyncHandler } from '../utlis/asynchandler';

let profileID = process.env.PAYTAB_PROFILE_ID,
    serverKey = process.env.PAYTAB_SERVER_KEY,
    region = "Pakistan";

paytabs.setConfig(profileID, serverKey, region);

const checkoutController = asyncHandler(async (req, res) => {
    const data = req.body;

    const paymentMethods = ['all'];
    
    let transactionDetails = [
        transaction.type,
        transaction.class
    ];

    let cartDetails = [
        cart.id,
        cart.currency,
        cart.amount,
        cart.description
    ];

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

    let shippingDetails = customer_details; // If both are the same, otherwise set the shipping details.

    let response_URLs = [
        url.response,
        url.callback
    ];

    let lang = "ar";

    callback = function ($results) {
        console.log($results);
    }

    let frameMode = true;

    PayTabs.createPaymentPage(
        paymentMethods,
        transactionDetails,
        cartDetails,
        customerDetails,
        shippingDetails,
        responseURLs,
        lang,
        callback,
        frameMode
    );

})


export {
    checkoutController
}