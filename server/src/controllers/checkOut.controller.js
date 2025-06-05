import { asyncHandler } from '../utlis/asynchandler.js';
import { paytabs } from '../utlis/payTabIntegration.js';
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
        id:`cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
        response: 'https://webhook.site/c19f17d0-f59d-4b51-ad71-82b4cc14b250',
        callback: 'https://webhook.site/c19f17d0-f59d-4b51-ad71-82b4cc14b250'
    }

    let response_URLs = [
        url.response,
        url.callback
    ];

    let lang = "en";
    let frameMode = true;

    const callbackMethod = (result)=>{
      
        if(result['response_code:'] === 400){
            console.log("this is the result" , result['result']);            
        }else{
             console.log("url = ",result);
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

// const checkoutController = asyncHandler(async (req, res) => {
//     try {
//         const data = req.body;

//         console.log("=== PayTabs Global Request ===");
//         console.log("Request data:", JSON.stringify(data, null, 2));

//         // Validate environment variables
//         if (!process.env.PAYTAB_PROFILE_ID || !process.env.PAYTAB_SERVER_KEY) {
//             console.error("Missing PayTabs credentials");
//             return res.status(500).json({
//                 success: false,
//                 message: "PayTabs configuration error"
//             });
//         }

//         // Validate required fields
//         const requiredFields = ['name', 'email', 'phone'];
//         const missingFields = requiredFields.filter(field => !data[field]);

//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }

//         // Get client IP
//         const ip = req.headers['x-forwarded-for'] ||
//             req.connection.remoteAddress ||
//             req.socket.remoteAddress || '127.0.0.1';

//         // Payment configuration
//         const paymentMethods = ['all'];
//         const transactionDetails = ['sale', 'ecom'];

//         // Cart details with unique ID
//         const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//         const cartDetails = [
//             cartId,                                    // cart_id
//             "PKR",                                     // currency - USD should work for global
//             (data.amount || "10.00").toString(),       // amount
//             data.description || "Test Payment"        // description
//         ];

//         // Customer details - ensure all required fields are present
//         const customerDetails = [
//             data.name.toString(),                                    // name
//             data.email.toString(),                                   // email
//             data.phone.toString(),                                   // phone
//             (data.street || "Default Street").toString(),            // street
//             (data.city || "Karachi").toString(),                     // city
//             (data.state || "Sindh").toString(),                      // state
//             "PK",                                                    // country (Pakistan)
//             (data.zip || "75290").toString(),                        // zip
//             ip === '::1' ? '127.0.0.1' : ip.toString()             // IP
//         ];

//         // Shipping details (same as customer)
//         const shippingDetails = [...customerDetails];

//         // Response URLs
//         const response_URLs = [
//             'https://webhook.site/c19f17d0-f59d-4b51-ad71-82b4cc14b250',
//             'https://webhook.site/c19f17d0-f59d-4b51-ad71-82b4cc14b250'

//         ];

//         const lang = "en";
//         const frameMode = false;

//         console.log("=== Global PayTabs Parameters ===");
//         console.log("Payment Methods:", paymentMethods);
//         console.log("Transaction Details:", transactionDetails);
//         console.log("Cart Details:", cartDetails);
//         console.log("Customer Details:", customerDetails);
//         console.log("Response URLs:", response_URLs);
//         console.log("Base URL being used:", paytabs.baseUrl);
//         console.log("================================");

//         // Create payment page
//         const paymentResult = await new Promise((resolve, reject) => {
//             console.log("Creating payment page with global configuration...");

//             paytabs.createPaymentPage(
//                 paymentMethods,
//                 transactionDetails,
//                 cartDetails,
//                 customerDetails,
//                 shippingDetails,
//                 response_URLs,
//                 lang,
//                 (result) => {
//                     console.log("=== Global PayTabs Response ===");
//                     console.log("Raw result:", JSON.stringify(result, null, 2));

//                     if (result && (result.response_code === 400 || result['response_code:'] === 400)) {
//                         console.error("❌ PayTabs Error:", result.result || result);
//                         reject({
//                             code: 400,
//                             message: "PayTabs Error",
//                             details: result.result || result
//                         });
//                     } else if (result && result.redirect_url) {
//                         console.log("✅ Payment page created successfully!");
//                         console.log("Redirect URL:", result.redirect_url);

//                         resolve({
//                             success: true,
//                             payment_url: result.redirect_url,
//                             tran_ref: result.tran_ref || cartId,
//                             cart_id: cartId
//                         });
//                     } else {
//                         console.error("❌ Unexpected response:", result);
//                         reject({
//                             code: 500,
//                             message: "Unexpected PayTabs response",
//                             details: result
//                         });
//                     }
//                 },
//                 frameMode
//             );
//         });

//         // Return success response
//         res.status(200).json({
//             success: true,
//             message: "Payment page created successfully",
//             data: paymentResult
//         });

//     } catch (error) {
//         console.error("=== Global Checkout Error ===");
//         console.error("Error:", error);

//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal server error",
//             details: error.details || null
//         });
//     }
// });

export {
    checkoutController
}