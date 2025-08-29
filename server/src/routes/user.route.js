import { Router } from 'express'
import { current_user, login, register } from '../controllers/user.controller.js';
import { VerifyToken } from '../middleware/VerifyFirebase.js';
import { api_tracking } from '../middleware/api_tracking.middleware.js';

const router = new Router();


router.route("/register").post(register);
router.route('/login').post(VerifyToken,login);
router.route('/current-user').get(VerifyToken , api_tracking , current_user)

export default router;