import { Router } from "express"; 
import { checkoutController } from "../controllers/checkOut.controller.js";
import { paymentCallback } from "../controllers/payment_callback.controller.js";

const router = new  Router()

router.route("/checkout").post(checkoutController)
router.route("/payment-callback").post(paymentCallback)

export default router;