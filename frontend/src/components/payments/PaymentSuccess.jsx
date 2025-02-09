// src/pages/Advertiser/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { paymentService } from "../../utils/paymentservices";
import { toast } from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import Loader from "../../components/Loader";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const capturePayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        
        if (!token) {
          toast.error("Payment token not found");
          navigate("/advertiser/cart");
          return;
        }

        const response = await paymentService.capturePayment(token);
        
        if (response.success) {
          toast.success("Payment completed successfully!");
        } else {
          toast.error(response.message || "Failed to complete payment");
          navigate("/advertiser/cart");
        }
      } catch (error) {
        console.error("Payment capture error:", error);
        toast.error("Failed to process payment");
        navigate("/advertiser/cart");
      } finally {
        setIsProcessing(false);
      }
    };

    capturePayment();
  }, [orderId, location.search, navigate]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader />
        <p className="mt-4 text-gray-600">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been processed successfully. You can view your order details below.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/advertiser/orders")}
            className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/advertiser/dashboard")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;