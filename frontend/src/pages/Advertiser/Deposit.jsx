import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const Deposit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    invoicingAccount: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.amount >= 20 &&
      formData.paymentMethod !== "" &&
      formData.invoicingAccount !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form submitted:", formData);
    }
  };

  const tooltipContent = {
    amount: "Minimum deposit amount is 20,00",
    paymentMethod: "Select your preferred payment method",
    invoicingAccount: "Choose invoicing account type"
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Deposit</h1>

      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        {/* Amount Input */}
        <div className="flex items-center gap-8  pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Amount <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.amount}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="w-3/4">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="20"
            />
            <span className="text-red-500 text-sm mt-1 block">Minimum amount is 20,00</span>
          </div>
        </div>

        {/* Payment Method Dropdown */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Payment Method <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.paymentMethod}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select payment method</option>
            <option value="paypal">PayPal</option>
            <option value="creditCard">Credit Card</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>

        {/* Invoicing Account Dropdown */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Invoicing Account <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.invoicingAccount}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="invoicingAccount"
            value={formData.invoicingAccount}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select invoicing account</option>
            <option value="personal">Personal Account</option>
            <option value="business">Business Account</option>
          </select>
        </div>


        {/* Submit Button */}
        <div className="border-t pt-6">
          <button 
            onClick={() => navigate('/balance/deposit')}
            className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Deposit
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex gap-2 text-[#3D52A0] border-t pt-6">
          <Link to="/terms" className="hover:underline">
            Terms and conditions
          </Link>
          <span>•</span>
          <Link to="https://rankister.com" className="hover:underline">
            Rankister.com
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Deposit;