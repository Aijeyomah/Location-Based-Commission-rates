import { orderSubmission } from './../../controllers/vendor-order-submission';
import { Router } from 'express';

const router = Router();

router.post('', orderSubmission);

export default router;