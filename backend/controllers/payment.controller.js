// import paypal from '@paypal/checkout-server-sdk';
// import Order from '../models/order.model.js';
// import { User } from '../models/user.model.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const environment = new paypal.core.SandboxEnvironment(
//   process.env.PAYPAL_CLIENT_ID,
//   process.env.PAYPAL_SECRET
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// export const createPaypalOrder = async (req, res) => {
//   try {
//     console.log("🔹 Received request:", req.body); // ✅ Debugging

//     const { cartItems, userId } = req.body;

//     const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
//     const adminCommission = cartItems.reduce((sum, item) => sum + item.commission, 0);

//     const order = new Order({
//       userId,
//       websites: cartItems.map(item => ({
//         websiteId: item._id,
//         price: item.price,
//         commission: item.commission
//       })),
//       totalAmount,
//       adminCommission,
//     });

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//       intent: 'CAPTURE',
//       purchase_units: [{
//         amount: {
//           currency_code: 'EUR',
//           value: totalAmount.toString()
//         },
//         custom_id: order._id.toString()
//       }]
//     });

//     const paypalOrder = await client.execute(request);
//     order.paypalOrderId = paypalOrder.result.id;
//     await order.save();

//     // Find the approve URL in the response
//     const approveUrl = paypalOrder.result.links.find(link => link.rel === 'approve').href;

//     // Return the approve URL to the client
//     res.json({ orderId: paypalOrder.result.id, approveUrl });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const capturePaypalPayment = async (req, res) => {
//   try {
//     const { orderID } = req.body;
//     const request = new paypal.orders.OrdersCaptureRequest(orderID);
//     const capture = await client.execute(request);

//     const order = await Order.findOne({ paypalOrderId: orderID });
//     if (!order) throw new Error('Order not found');

//     order.paymentStatus = 'completed';
//     order.paypalPaymentId = capture.result.purchase_units[0].payments.captures[0].id;
//     await order.save();

//     // Update user balance
//     const user = await User.findById(order.userId);
//     user.balance += order.totalAmount;
//     await user.save();

//     res.json({ success: true, orderId: order._id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// paymentController.js
import paypal from '@paypal/checkout-server-sdk';
import Order from '../models/order.model.js';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// export const createPaypalOrder = async (req, res) => {
//   try {
//     console.log("🔹 Received request:", req.body);

//     const { cartItems, userId } = req.body;

//     if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//       return res.status(400).json({ error: 'Invalid cart items' });
//     }

//     const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
//     const adminCommission = cartItems.reduce((sum, item) => sum + item.commission, 0);

//     const order = new Order({
//       userId,
//       websites: cartItems.map(item => ({
//         websiteId: item._id,
//         price: item.price,
//         commission: item.commission
//       })),
//       totalAmount,
//       adminCommission,
//     });

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//       intent: 'CAPTURE',
//       purchase_units: [{
//         amount: {
//           currency_code: 'EUR',
//           value: totalAmount.toString()
//         },
//         custom_id: order._id.toString()
//       }],
//       application_context: {
//         return_url: 'http://localhost:3000/advertiser/payment-success/${order._id}',
//         cancel_url: 'http://localhost:3000/advertiser/payment-cancel/${order._id}'
//       }
//     });

//     const paypalOrder = await client.execute(request);
//     order.paypalOrderId = paypalOrder.result.id;
//     await order.save();

//     // Return all necessary URLs and order information
//     const approveUrl = paypalOrder.result.links.find(link => link.rel === 'approve').href;
    
//     res.json({
//       orderId: paypalOrder.result.id,
//       approveUrl,
//       orderDetails: order,
//       links: paypalOrder.result.links
//     });
//   } catch (error) {
//     console.error('Error creating PayPal order:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// In your paymentController.js, modify the createPaypalOrder function:

export const createPaypalOrder = async (req, res) => {
  try {
    console.log("🔹 Received request:", req.body);

    const { cartItems, userId } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Invalid cart items' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    const adminCommission = cartItems.reduce((sum, item) => sum + item.commission, 0);

    const order = new Order({
      userId,
      websites: cartItems.map(item => ({
        websiteId: item._id,
        price: item.price,
        commission: item.commission
      })),
      totalAmount,
      adminCommission,
    });

    // Save the order first to get the order._id
    await order.save();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: totalAmount.toString()
        },
        custom_id: order._id.toString()
      }],
      application_context: {
        return_url: `http://localhost:5173/advertiser/payment-success/${order._id}`,
        cancel_url: `http://localhost:5173/advertiser/payment-cancel/${order._id}`
      }
    });

    const paypalOrder = await client.execute(request);
    order.paypalOrderId = paypalOrder.result.id;
    await order.save();

    res.json({
      orderId: paypalOrder.result.id,
      approveUrl: paypalOrder.result.links.find(link => link.rel === 'approve').href,
      orderDetails: order,
      links: paypalOrder.result.links
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: error.message });
  }
};

export const capturePaypalPayment = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // 1. First verify the order status
    console.log('Verifying order status...');
    const orderRequest = new paypal.orders.OrdersGetRequest(orderID);
    const orderResponse = await client.execute(orderRequest);
    console.log('Order status:', orderResponse.result.status);

    // 2. Check if order exists in our database
    const order = await Order.findOne({ paypalOrderId: orderID });
    if (!order) {
      return res.status(404).json({ error: 'Order not found in database' });
    }

    // 3. Proceed with capture if order is approved
    if (orderResponse.result.status === 'APPROVED') {
      console.log('Proceeding with capture...');
      const request = new paypal.orders.OrdersCaptureRequest(orderID);
      const capture = await client.execute(request);

      order.paymentStatus = 'completed';
      order.paypalPaymentId = capture.result.purchase_units[0].payments.captures[0].id;
      await order.save();

      // Update user balance
      const user = await User.findById(order.userId);
      if (user) {
        user.balance += order.totalAmount;
        await user.save();
      }

      return res.json({
        success: true,
        orderId: order._id,
        paypalOrderId: orderID,
        captureId: capture.result.purchase_units[0].payments.captures[0].id,
        status: 'COMPLETED'
      });
    } else {
      return res.status(400).json({
        error: 'Order not approved',
        status: orderResponse.result.status,
        message: 'User needs to approve the payment first'
      });
    }
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.details || 'No additional details available'
    });
  }
};

// Add this new endpoint to check order status
export const checkOrderStatus = async (req, res) => {
  try {
    const { orderID } = req.params;
    
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const order = await client.execute(request);
    
    res.json({
      status: order.result.status,
      orderDetails: order.result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};