import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Notice the '.js' extension is required in ES modules
import authRoutes from './routes/auth.routes.js';
import websiteRoutes from './routes/website.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import promoRoutes from './routes/promo.routes.js';
import profileRoutes from './routes/profile.routes.js';
import invoiceAccountRoutes from './routes/invoiceAccount.routes.js';
import emailChangeRoutes from './routes/emailChange.routes.js';
import searchWebsites from './routes/advertiser/searchWebsite.routes.js';
import favourite from './routes/advertiser/favourite.routes.js';
import cart from './routes/advertiser/cart.routes.js';
import stats from './routes/stats.routes.js';
import usersMangAdmin from './routes/admin/userMang.routes.js';
import contentRoutesAdmin from './routes/admin/content.routes.js';
import faqRoutes from './routes/admin/faq.routes.js';
import paymentRoutes from './routes/payment.routes.js'; 

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();


app.use(cors({
  origin: 'http://localhost:5173', credentials: true,
}))

// Middlewares
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.get("/" , (req, res) => {
  res.send("Hello World!");
})

app.use("/api/auth" , authRoutes)
app.use("/api/websites" , websiteRoutes)
app.use('/api/promos', promoRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/invoice-account', invoiceAccountRoutes);
app.use('/api/email-change', emailChangeRoutes);

// stats routes
app.use('/api/stats', stats);


// advertiser routes
app.use('/api/advertiser', searchWebsites);
app.use('/api/advertiser', favourite);
app.use('/api/advertiser', cart);


// admin routes
app.use('/api/admin', usersMangAdmin);
app.use('/api/admin', contentRoutesAdmin);
// admin FAQ routes
app.use('/api/admin', faqRoutes);
// public FAQ routes
app.use('/api', faqRoutes);

//payment routes
app.use('/api/payments', paymentRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
