import React, { useState, useRef, useEffect } from "react";
import {
  MdMenu,
  MdKeyboardArrowDown,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import img from "../assets/profile.jpeg";
import { useAuthStore } from "../store/authStore";

const NavbarPublisher = ({ userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user, balance } = useAuthStore();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    console.log("Full User Object:", user);
    console.log("Avatar URL:", user?.avatar);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      [user];
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const goToProfile = () => {
    navigate("/publisher/profile");
    setIsProfileDropdownOpen(false); // Close the dropdown after navigation
  };

  return (
    <nav className="h-16 bg-white border-b">
      <div className="px-4 md:px-6 h-full flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MdMenu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold text-gray-800 font-poppins tracking-wide bg-gradient-to-r from-foundations-primary to-blue-600 bg-clip-text text-transparent">
          Publisher Dashboard
        </h1>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4 md:gap-6">
          

          <div className="bg-foundations-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            € {balance.toFixed(2)}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <div
                className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-foundations-primary shadow-sm"
                style={{
                  backgroundImage: user?.profileImage
                    ? `url(${user.profileImage})`
                    : `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <MdKeyboardArrowDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isProfileDropdownOpen && (
              <div className="absolute z-50 bg-white rounded-lg shadow-lg py-1 right-0 top-12 w-48">
                <button
                  onClick={goToProfile} // Navigate to profile
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <MdPerson className="w-5 h-5" />
                  Your Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <MdLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile User Avatar */}
        <div className="lg:hidden">
          <div
            className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-foundations-primary shadow-sm"
            style={{
              backgroundImage: user?.profileImage
                ? `url(${user.profileImage})`
                : `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <img src="/flags/us.svg" alt="US Flag" className="w-6 h-4" />
                <span className="text-gray-700 font-medium">United States</span>
              </div>
            </div>
            <div className="bg-foundations-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              € {balance.toFixed(2)}
            </div>
            <div className="border-t pt-4">
              <span className="text-gray-700 font-medium">Hi, {userName}!</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {isProfileDropdownOpen && (
        <div className="lg:hidden absolute z-50 bg-white rounded-lg shadow-lg py-1 right-4 top-16 w-48">
          <button
            onClick={goToProfile} // Navigate to profile
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <MdPerson className="w-5 h-5" />
            Your Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <MdLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarPublisher;
