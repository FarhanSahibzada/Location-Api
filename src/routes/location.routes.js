import {Router} from 'express'
import {getAreas, InsertApi} from '../controllers/city_location.js'

const router = Router()

router.route('/').post(InsertApi)
router.route('/findarea').get(getAreas)





export default router;
