// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import { cartService, websiteService } from "../../utils/services";
// import { FaTrashAlt } from "react-icons/fa";
// import useCartStore from "../../store/cartStore";
// import ProductCard from "../../components/Advertiser/ProductCard";
// import { toast } from "react-hot-toast";
// import { use } from "react";

// const Cart = () => {
//   const { user } = useAuthStore();
//   const { updateCartCount } = useCartStore();
//   const [cartItems, setCartItems] = useState([]);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchCartItems = async () => {
//     if (!user?._id) return;

//     try {
//       setLoading(true);
//       const carts = await cartService.getCarts(user._id);

//       const enhancedCarts = await Promise.all(
//         carts.map(async (item) => {
//           try {
//             // Updated to match new API signature
//             const websiteDetails = await websiteService.getWebsiteById(item.websiteId, user._id);
//             return { ...item, websiteDetails };
//           } catch (err) {
//             console.error(`Failed to fetch website details for ${item._id}:`, err);
//             return { ...item, websiteDetails: null };
//           }
//         })
//       );

//       setCartItems(enhancedCarts);

//       if (enhancedCarts.length > 0) {
//         const categories = enhancedCarts.map((item) => item.websiteDetails?.category).flat();
//         const uniqueCategories = [...new Set(categories)];

//         const allWebsites = await websiteService.getAllWebsites(user._id);

//         const similarItems = allWebsites
//           .filter(
//             (website) =>
//               website.category.some((cat) => uniqueCategories.includes(cat)) &&
//               !enhancedCarts.some((cartItem) => cartItem.websiteId === website._id)
//           )
//           .slice(0, 6);

//         setSimilarProducts(similarItems);
//       } else {
//         setSimilarProducts([]);
//       }

//       setLoading(false);
//     } catch (err) {
//       setError(err.message || "Failed to fetch cart items");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (cartId) => {
//     try {
//       await cartService.deleteCart(user._id, cartId);
//       const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
//       setCartItems(updatedCartItems);
//       updateCartCount(user._id);
      
//       if (updatedCartItems.length === 0) {
//         setSimilarProducts([]);
//       } else {
//         const deletedItem = cartItems.find(item => item._id === cartId);
//         if (deletedItem?.websiteDetails) {
//           setSimilarProducts(prev => [...prev, deletedItem.websiteDetails].slice(0, 6));
//         }
//       }
      
//       toast.success("Item removed from cart");
//     } catch (err) {
//       console.error("Failed to delete item:", err);
//       toast.error(err.message || "Failed to delete item");
//     }
//   };

//   const handleAddToCart = async (websiteId) => {
//     if (!user?._id) {
//       toast.error("Please login to add items to cart");
//       return;
//     }
//     try {
//       const response = await cartService.createCart(user._id, websiteId);
//       updateCartCount(user._id);
//       setSimilarProducts((prev) => prev.filter((item) => item._id !== websiteId));
      
//       // Updated to match new API signature
//       const websiteDetails = await websiteService.getWebsiteById(websiteId, user._id);
      
//       setCartItems((prev) => [...prev, { 
//         _id: response._id,
//         websiteId, 
//         websiteDetails,
//         userId: user._id
//       }]);
      
//       toast.success("Item added to cart");
//     } catch (err) {
//       console.error("Failed to add item to cart:", err);
//       toast.error(err.message || "Failed to add item to cart");
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [user._id]);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = item.websiteDetails?.price
//         ? typeof item.websiteDetails.price === "object"
//           ? parseFloat(item.websiteDetails.price.$numberInt)
//           : parseFloat(item.websiteDetails.price)
//         : 0;
//       return total + price;
//     }, 0);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foundations-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-6">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto max-w-7xl px-6 py-10">
//       <h1 className="text-3xl font-bold text-foundations-dark mb-6">Shopping Cart</h1>

//       <div className="border-b pb-4 mb-6">
//         <p className="text-emerald-500">
//           You will be able to fill all the needed information after checkout in the Orders section.
//         </p>
//         <p className="text-red-500">Orders must be posted within 3 months of the order date.</p>
//       </div>

//       {cartItems.length > 0 ? (
//         <>
//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="bg-foundations-light shadow rounded-lg p-6 flex justify-between items-center border border-foundations-hover mb-4"
//             >
//               <div>
//                 <h2 className="font-bold text-lg text-foundations-dark">
//                   {item.websiteDetails?.webDomain || "Unknown Domain"}
//                 </h2>
//                 <p className="text-sm text-foundations-secondary">
//                   {item.websiteDetails?.mediaType || "Unknown Media"}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <span className="text-xl font-semibold text-foundations-primary">
//                   {parseFloat(item.websiteDetails?.price || 0).toFixed(2)} €
//                 </span>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-red-500 hover:text-red-700 transition-colors"
//                 >
//                   <FaTrashAlt size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <div className="text-center text-gray-600 py-12 bg-foundations-light rounded-lg">
//           Your cart is empty
//         </div>
//       )}

//       {similarProducts.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-foundations-dark mb-4">Similar Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//             {similarProducts.map((product) => (
//               <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
//             ))}
//           </div>
//         </div>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-8 border-t pt-4">
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-bold text-foundations-dark">Total:</span>
//             <span className="text-2xl font-bold text-foundations-primary">
//               {calculateTotal().toFixed(2)} €
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="text-sm text-foundations-secondary pt-8">
//         <Link to="/terms" className="hover:underline">
//           Terms and conditions
//         </Link>
//         <span className="mx-2">•</span>
//         <Link to="/" className="hover:underline">
//           Rankister.com
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { cartService, websiteService } from "../../utils/services";
import { paymentService } from "../../utils/paymentservices";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import useCartStore from "../../store/cartStore";
import ProductCard from "../../components/Advertiser/ProductCard";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader"; // Import the Loader component

const Cart = () => {
  const { user } = useAuthStore();
  const { updateCartCount } = useCartStore();
  const [cartItems, setCartItems] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (!user?._id) return;

    try {
      setLoading(true); // Start loading
      const carts = await cartService.getCarts(user._id);

      const enhancedCarts = await Promise.all(
        carts.map(async (item) => {
          try {
            const websiteDetails = await websiteService.getWebsiteById(item.websiteId, user._id);
            return { ...item, websiteDetails };
          } catch (err) {
            console.error(`Failed to fetch website details for ${item._id}:`, err);
            return { ...item, websiteDetails: null };
          }
        })
      );

      setCartItems(enhancedCarts);

      if (enhancedCarts.length > 0) {
        const categories = enhancedCarts.map((item) => item.websiteDetails?.category).flat();
        const uniqueCategories = [...new Set(categories)];

        const allWebsites = await websiteService.getAllWebsites(user._id);

        const similarItems = allWebsites
          .filter(
            (website) =>
              website.category.some((cat) => uniqueCategories.includes(cat)) &&
              !enhancedCarts.some((cartItem) => cartItem.websiteId === website._id)
          )
          .slice(0, 6);

        setSimilarProducts(similarItems);
      } else {
        setSimilarProducts([]);
      }

      setLoading(false); // End loading
    } catch (err) {
      setError(err.message || "Failed to fetch cart items");
      setLoading(false); // End loading
    }
  };

  const handleDelete = async (cartId) => {
    try {
      await cartService.deleteCart(user._id, cartId);
      const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
      setCartItems(updatedCartItems);
      updateCartCount(user._id);
      
      if (updatedCartItems.length === 0) {
        setSimilarProducts([]);
      } else {
        const deletedItem = cartItems.find(item => item._id === cartId);
        if (deletedItem?.websiteDetails) {
          setSimilarProducts(prev => [...prev, deletedItem.websiteDetails].slice(0, 6));
        }
      }
      
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast.error(err.message || "Failed to delete item");
    }
  };

  const handleAddToCart = async (websiteId) => {
    if (!user?._id) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      const response = await cartService.createCart(user._id, websiteId);
      updateCartCount(user._id);
      setSimilarProducts((prev) => prev.filter((item) => item._id !== websiteId));
      
      const websiteDetails = await websiteService.getWebsiteById(websiteId, user._id);
      
      setCartItems((prev) => [...prev, { 
        _id: response._id,
        websiteId, 
        websiteDetails,
        userId: user._id
      }]);
      
      toast.success("Item added to cart");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      toast.error(err.message || "Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user._id]);

  const handleCheckout = async () => {
    try {
      const formattedCartItems = cartItems.map(item => ({
        _id: item.websiteId,
        price: parseFloat(item.websiteDetails?.price || 0),
        commission: parseFloat(item.websiteDetails?.commission || 0)
      }));
  
      const response = await paymentService.createOrder(formattedCartItems, user._id);
      
      if (response.success && response.data.approveUrl) {
        window.location.href = response.data.approveUrl;
      } else {
        toast.error("Failed to initialize checkout");
      }
    } catch (error) {
      toast.error("Error processing checkout");
      console.error("Checkout error:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.websiteDetails?.price
        ? typeof item.websiteDetails.price === "object"
          ? parseFloat(item.websiteDetails.price.$numberInt)
          : parseFloat(item.websiteDetails.price)
        : 0;
      return total + price;
    }, 0);
  };

  if (loading) {
    return <Loader />; // Show loader when loading
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-foundations-dark mb-6">Shopping Cart</h1>

      <div className="border-b pb-4 mb-6">
        <p className="text-emerald-500">
          You will be able to fill all the needed information after checkout in the Orders section.
        </p>
        <p className="text-red-500">Orders must be posted within 3 months of the order date.</p>
      </div>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-foundations-light shadow rounded-lg p-6 flex justify-between items-center border border-foundations-hover mb-4"
            >
              <div>
                <h2 className="font-bold text-lg text-foundations-dark">
                  {item.websiteDetails?.webDomain || "Unknown Domain"}
                </h2>
                <p className="text-sm text-foundations-secondary">
                  {item.websiteDetails?.mediaType || "Unknown Media"}
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-xl font-semibold text-foundations-primary">
                  {parseFloat(item.websiteDetails?.price || 0).toFixed(2)} €
                </span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center text-gray-600 py-12 bg-foundations-light rounded-lg">
          Your cart is empty
        </div>
      )}

      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foundations-dark mb-4">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foundations-dark">Total:</span>
            <span className="text-2xl font-bold text-foundations-primary">
              {calculateTotal().toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-end mt-4">
          <button 
  className="bg-foundations-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
  onClick={handleCheckout}
>
  Proceed to Checkout
</button>
    </div>
        </div>
      )}

      <div className="text-sm text-foundations-secondary pt-8">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Cart;