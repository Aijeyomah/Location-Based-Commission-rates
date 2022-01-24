import { Router } from 'express';
import rates from './commission-rate'
import vendorOrder from './vendor-order-submission'

const router = Router();

router.use('/rates', rates);
router.use('/vendor-order', vendorOrder);
export default router;
