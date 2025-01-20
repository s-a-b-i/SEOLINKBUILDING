import React from "react";

const HeroSection = () => {
  return (
    <section className="text-center py-10 bg-[#7091E6] text-white">
      <h2 className="text-3xl font-semibold mb-4">Read all FAQs to use Rankister</h2>
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for answers"
          className="w-full px-4 py-2 rounded-md text-gray-700"
        />
        <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;