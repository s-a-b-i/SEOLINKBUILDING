// import { create } from "zustand";
// import axios from "axios";
// import { profileService } from "../utils/services";

// const API_URL = "http://localhost:5000/api/auth";

// axios.defaults.withCredentials = true;

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   error: null,
//   isLoading: false,
//   isCheckingAuth: true,
//   message: null,

//   signUp: async (name, email, password , captcha) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/signup`, {
//         name,
//         email,
//         password,
//         captcha
//       });
//       set({
//         user: response.data.user,
//         isAuthenticated: true,
//         isLoading: false,
//         message: "User created successfully. Please verify your email."
//       });
//       return response.data;
//     } catch (error) {
//       let errorMessage = "Sign up failed";
//       if (error.response) {
//         switch (error.response.data.msg) {
//           case "Please enter all fields":
//             errorMessage = "Please fill in all required fields";
//             break;
//           case "User already exists with this email":
//             errorMessage = "An account with this email already exists";
//             break;
//           default:
//             errorMessage = error.response.data.msg || "Sign up failed";
//         }
//       }
//       set({
//         error: errorMessage,
//         isLoading: false,
//       });
//       throw error;
//     }
//   },

//   login: async (email, password, captcha) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//         captcha,
//       });
  
//       // Check if the user is blocked
//       if (response.data.user.status === false) {
//         set({
//           isLoading: false,
//           error: "Your account has been blocked. Please contact support.",
//         });
//         return response.data; // Return the blocked user response
//       }
  
//       let profileImage = null;
//       try {
//         const profileData = await profileService.getProfile(response.data.user._id);
//         profileImage = profileData?.avatar || null;
//       } catch (profileError) {
//         console.error("Profile fetch error:", profileError);
//       }
  
//       set({
//         user: {
//           ...response.data.user,
//           profileImage,
//         },
//         isAuthenticated: true,
//         error: null,
//         isLoading: false,
//         message: "Login successful",
//       });
//       return response.data;
//     } catch (error) {
//       let errorMessage = "Login failed";
//       if (error.response) {
//         switch (error.response.data.msg) {
//           case "Please enter all fields":
//             errorMessage = "Please provide both email and password";
//             break;
//           case "Invalid email or password":
//             errorMessage = "Incorrect email or password";
//             break;
//           case "Please verify your email to login":
//             errorMessage = "Please verify your email before logging in";
//             break;
//           default:
//             errorMessage = error.response.data.msg || "Login failed";
//         }
//       }
//       set({
//         error: errorMessage,
//         isLoading: false,
//       });
//       throw error;
//     }
//   },

//    logout: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/logout`);
//       set({
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         message: "Logged out successfully"
//       });
//       return response.data;
//     } catch (error) {
//       set({
//         error: "Logout failed. Please try again.",
//         isLoading: false,
//       });
//       throw error;
//     }
//   },



//   verifyEmail: async (code) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/verify-email`, { code });
//       set({
//         user: response.data.user,
//         isAuthenticated: true,
//         isLoading: false,
//         message: "Email verified successfully"
//       });
//       return response.data;
//     } catch (error) {
//       let errorMessage = "Email verification failed";
//       if (error.response) {
//         switch (error.response.data.msg) {
//           case "Invalid verification code":
//             errorMessage = "The verification code is invalid or has expired";
//             break;
//           default:
//             errorMessage = error.response.data.msg || "Email verification failed";
//         }
//       }
//       set({
//         error: errorMessage,
//         isLoading: false,
//       });
//       throw error;
//     }
//   },

//   checkAuth: async () => {
//     set({ isCheckingAuth: true, error: null });
//     try {
//       const response = await axios.get(`${API_URL}/check-auth`);
//       const userId = response.data.user._id;
      
//       let profileImage = null;
//       try {
//         const profileData = await profileService.getProfile(userId);
//         profileImage = profileData?.avatar || null;
//       } catch (profileError) {
//         console.error("Profile fetch error:", profileError);
//       }
      
//       set({
//         user: {
//           ...response.data.user,
//           profileImage
//         },
//         isAuthenticated: true,
//         isCheckingAuth: false,
//       });
//       return response.data;
//     } catch (error) {
//       set({
//         user: null,
//         isAuthenticated: false,
//         isCheckingAuth: false,
//       });
//       return null;
//     }
//   },


//   forgotPassword: async (email) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/forgot-password`, {
//         email,
//       });
//       set({
//         isLoading: false,
//         message: "Password reset email sent successfully",
//       });
//       return response.data;
//     } catch (error) {
//       let errorMessage = "Failed to send password reset email";
//       if (error.response) {
//         switch (error.response.data.msg) {
//           case "User not found":
//             errorMessage = "No account found with this email address";
//             break;
//           default:
//             errorMessage = error.response.data.msg || "Failed to send password reset email";
//         }
//       }
//       set({
//         isLoading: false,
//         error: errorMessage,
//       });
//       throw error;
//     }
//   },

//   resetPassword: async (token, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
//       set({ 
//         message: "Password reset successfully", 
//         isLoading: false 
//       });
//       return response.data;
//     } catch (error) {
//       let errorMessage = "Failed to reset password";
//       if (error.response) {
//         switch (error.response.data.msg) {
//           case "Invalid or expired reset token":
//             errorMessage = "The password reset link is invalid or has expired";
//             break;
//           default:
//             errorMessage = error.response.data.msg || "Failed to reset password";
//         }
//       }
//       set({
//         isLoading: false,
//         error: errorMessage,
//       });
//       throw error;
//     }
//   },

//   setUserProfileImage: (profileImage) => {
//     set(state => ({
//       user: {
//         ...state.user,
//         profileImage
//       }
//     }));
//   },
  

// }));

import { create } from "zustand";
import axios from "axios";
import { profileService } from "../utils/services";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  balance: 0,
  transactions: [],

  signUp: async (name, email, password, captcha) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
        captcha
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "User created successfully. Please verify your email."
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Sign up failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Please enter all fields":
            errorMessage = "Please fill in all required fields";
            break;
          case "User already exists with this email":
            errorMessage = "An account with this email already exists";
            break;
          default:
            errorMessage = error.response.data.msg || "Sign up failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password, captcha) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
        captcha,
      });
  
      if (response.data.user.status === false) {
        set({
          isLoading: false,
          error: "Your account has been blocked. Please contact support.",
        });
        return response.data;
      }
  
      let profileImage = null;
      try {
        const profileData = await profileService.getProfile(response.data.user._id);
        profileImage = profileData?.avatar || null;
      } catch (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      let balance = 0;
      try {
        const balanceData = await axios.get(`${API_URL}/balance`);
        balance = balanceData.data.balance;
      } catch (balanceError) {
        console.error("Balance fetch error:", balanceError);
      }
  
      set({
        user: {
          ...response.data.user,
          profileImage,
        },
        balance,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        message: "Login successful",
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Login failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Please enter all fields":
            errorMessage = "Please provide both email and password";
            break;
          case "Invalid email or password":
            errorMessage = "Incorrect email or password";
            break;
          case "Please verify your email to login":
            errorMessage = "Please verify your email before logging in";
            break;
          default:
            errorMessage = error.response.data.msg || "Login failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: "Logged out successfully",
        balance: 0,
        transactions: []
      });
      return response.data;
    } catch (error) {
      set({
        error: "Logout failed. Please try again.",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "Email verified successfully"
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Email verification failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Invalid verification code":
            errorMessage = "The verification code is invalid or has expired";
            break;
          default:
            errorMessage = error.response.data.msg || "Email verification failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      const userId = response.data.user._id;
      
      let profileImage = null;
      try {
        const profileData = await profileService.getProfile(userId);
        profileImage = profileData?.avatar || null;
      } catch (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      let balance = 0;
      try {
        const balanceData = await axios.get(`${API_URL}/balance`);
        balance = balanceData.data.balance;
      } catch (balanceError) {
        console.error("Balance fetch error:", balanceError);
      }
      
      set({
        user: {
          ...response.data.user,
          profileImage
        },
        balance,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return response.data;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        balance: 0,
        transactions: []
      });
      return null;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({
        isLoading: false,
        message: "Password reset email sent successfully",
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to send password reset email";
      if (error.response) {
        switch (error.response.data.msg) {
          case "User not found":
            errorMessage = "No account found with this email address";
            break;
          default:
            errorMessage = error.response.data.msg || "Failed to send password reset email";
        }
      }
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ 
        message: "Password reset successfully", 
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to reset password";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Invalid or expired reset token":
            errorMessage = "The password reset link is invalid or has expired";
            break;
          default:
            errorMessage = error.response.data.msg || "Failed to reset password";
        }
      }
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  setUserProfileImage: (profileImage) => {
    set(state => ({
      user: {
        ...state.user,
        profileImage
      }
    }));
  },

  // getBalance: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.get(`${API_URL}/balance`);
  //     set({
  //       balance: response.data.balance,
  //       isLoading: false
  //     });
  //     return response.data;
  //   } catch (error) {
  //     set({
  //       error: "Failed to fetch balance",
  //       isLoading: false
  //     });
  //     throw error;
  //   }
  // },

  // updateBalance: async (amount, type) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.post(`${API_URL}/update-balance`, {
  //       amount,
  //       type
  //     });
  //     set({
  //       balance: response.data.balance,
  //       isLoading: false,
  //       message: "Balance updated successfully"
  //     });
  //     return response.data;
  //   } catch (error) {
  //     let errorMessage = "Failed to update balance";
  //     if (error.response) {
  //       switch (error.response.data.msg) {
  //         case "Insufficient funds":
  //           errorMessage = "You don't have sufficient funds for this transaction";
  //           break;
  //         case "Invalid amount":
  //           errorMessage = "Please enter a valid amount";
  //           break;
  //         default:
  //           errorMessage = error.response.data.msg || "Failed to update balance";
  //       }
  //     }
  //     set({
  //       error: errorMessage,
  //       isLoading: false
  //     });
  //     throw error;
  //   }
  // },

  // getTransactionHistory: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.get(`${API_URL}/transactions`);
  //     set({
  //       transactions: response.data.transactions,
  //       isLoading: false
  //     });
  //     return response.data;
  //   } catch (error) {
  //     set({
  //       error: "Failed to fetch transaction history",
  //       isLoading: false
  //     });
  //     throw error;
  //   }
  // }

}));