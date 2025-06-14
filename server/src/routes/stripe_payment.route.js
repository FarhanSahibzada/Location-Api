import { Router } from "express";
import { stripe_checkout } from "../controllers/stripe_payout.controller.js";


const router =  new Router();

router.route('/stripe-checkout').post(stripe_checkout)



export default router;