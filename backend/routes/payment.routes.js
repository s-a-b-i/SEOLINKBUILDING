import express from 'express';
import { createPaypalOrder, capturePaypalPayment, checkOrderStatus } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-order', createPaypalOrder);
router.post('/capture-payment', capturePaypalPayment);
router.get('/order-status/:orderID', checkOrderStatus);


export default router;