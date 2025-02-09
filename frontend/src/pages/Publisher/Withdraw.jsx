import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const Withdraw = () => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentDetails: "",
    invoice: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        invoice: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        invoice: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const isFormValid = () => {
    return (
      formData.amount >= 20 &&
      formData.paymentDetails.trim() !== "" &&
      formData.invoice !== null
    );
  };

  const tooltipContent = {
    amount: "Minimum withdrawal amount is 20,00",
    paymentDetails: "Enter IBAN or PayPal email for payment",
    invoice: "Upload invoice in PDF format"
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Withdrawal Request</h1>

      {/* Instructions Panel */}
      <div className="space-y-4 bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="font-semibold">Important Instructions</h2>
        <div className="space-y-3 text-gray-700">
          <p>-Please only request one withdrawal during the month, towards the end of the month and on a single invoice. Uploading multiple invoices for multiple withdrawals may result in delays.</p>
          <p>-If you are a private individual and resident in Italy you will have to charge a Withholding Tax to request the withdrawal. You will have to separate 20% of the Withholding from the amount you withdraw. For example: if you are requesting a withdrawal of €100.00 Gross (earned on the platform), you will have to upload a document with a total of €100.00.</p>
          <p>-To separate the amount you can use this formula: €100.00 x 0.20 = €80.00 (net)</p>
          <p>-For those who apply the flat rate or advantage regime (minimum), the amount due from Rankister SRL is inclusive of charges such as INPS compensation or professional fund supplementary contribution or stamp duty</p>
          <p>-For those in the ordinary VAT regime, the amount due from Rankister SRL is understood to include charges such as INPS reimbursement or supplementary professional fund contribution or stamp duty, while it is understood to be net of the VAT due by law.</p>
        </div>
      </div>

      {/* Status Information */}
      <div className="space-y-2 mb-8 p-6 bg-blue-50 rounded-lg">
        <p>Please also display the withholding tax if applicable (professionals)</p>
        <p className="font-semibold">Maximum withdrawable amount: € 0.00</p>
        <p className="text-red-500">Attention: you must issue an invoice from the name entered in the Profile: TeqnoWebs</p>
      </div>

      <form className="space-y-8 p-6">
        {/* Amount Input */}
        <div className="flex items-center gap-8 border-t pt-6">
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

        {/* Payment Details */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Payment Details <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.paymentDetails}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="w-3/4">
            <input
              type="text"
              name="paymentDetails"
              value={formData.paymentDetails}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter IBAN or PayPal email"
            />
            <span className="text-red-500 text-sm mt-1 block">Enter the payment destination here (if bank IBAN otherwise email paypal)</span>
          </div>
        </div>

        {/* Invoice Upload */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Invoice <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.invoice}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="w-3/4">
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex justify-center mb-2">📄</div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="invoice-upload"
              />
              <label
                htmlFor="invoice-upload"
                className="text-foundations-primary cursor-pointer"
              >
                Upload a file
              </label>
              <span className="text-gray-500"> or drag and drop (.pdf)</span>
              {formData.invoice && (
                <p className="text-sm text-green-600 mt-2">
                  Selected file: {formData.invoice.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t pt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">RANKISTER Srl</h3>
            <p>Via Cristoforo Colombo 2 - 10024 - Moncalieri (TO)</p>
            <p>P.iva 12684530012 - C.F. 12684530012</p>
            <p>SDI: M5UXCR1</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            className={`bg-foundations-primary text-white px-6 py-2 rounded-lg ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            disabled={!isFormValid()}
          >
            Request Withdrawal
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

export default Withdraw;