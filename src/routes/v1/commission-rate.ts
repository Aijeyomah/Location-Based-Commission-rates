import { getLocationCommissionRate } from 'controllers/location-commission-rate';
import { Router } from 'express';

const router = Router();

router.post(
    '/',
    getLocationCommissionRate

)

export default router;