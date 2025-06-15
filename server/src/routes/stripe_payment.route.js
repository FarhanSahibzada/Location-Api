import { Router } from "express";
import { stripe_checkout } from "../controllers/stripe_payout.controller.js";
import { VerifyToken } from "../middleware/VerifyFirebase.js";


const router =  new Router();

router.route('/stripe-checkout').post(VerifyToken,stripe_checkout)



export default router;