import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';
import ReactCountryFlag from 'react-country-flag';
import Select from 'react-select';

// Mapping countries to their ISO country codes and languages
const countryLanguageMap = {
  'Austria': { code: 'AT', languages: ['German'] },
  'Belgium': { code: 'BE', languages: ['Dutch', 'French', 'German'] },
  'Bulgaria': { code: 'BG', languages: ['Bulgarian'] },
  'Czech Republic': { code: 'CZ', languages: ['Czech'] },
  'Denmark': { code: 'DK', languages: ['Danish'] },
  'Estonia': { code: 'EE', languages: ['Estonian'] },
  'Finland': { code: 'FI', languages: ['Finnish'] },
  'France': { code: 'FR', languages: ['French'] },
  'Germany': { code: 'DE', languages: ['German'] },
  'Greece': { code: 'GR', languages: ['Greek'] },
  'Hungary': { code: 'HU', languages: ['Hungarian'] },
  'Ireland': { code: 'IE', languages: ['Irish', 'English'] },
  'Italy': { code: 'IT', languages: ['Italian'] },
  'Latvia': { code: 'LV', languages: ['Latvian'] },
  'Lithuania': { code: 'LT', languages: ['Lithuanian'] },
  'Luxembourg': { code: 'LU', languages: ['Luxembourgish', 'French', 'German'] },
  'Netherlands': { code: 'NL', languages: ['Dutch'] },
  'Norway': { code: 'NO', languages: ['Norwegian'] },
  'Poland': { code: 'PL', languages: ['Polish'] },
  'Portugal': { code: 'PT', languages: ['Portuguese'] },
  'Romania': { code: 'RO', languages: ['Romanian'] },
  'Russia': { code: 'RU', languages: ['Russian'] },
  'Slovakia': { code: 'SK', languages: ['Slovak'] },
  'Slovenia': { code: 'SI', languages: ['Slovenian'] },
  'Spain': { code: 'ES', languages: ['Spanish'] },
  'Sweden': { code: 'SE', languages: ['Swedish'] },
  'Switzerland': { code: 'CH', languages: ['German', 'French', 'Italian'] },
  'Canada': { code: 'CA', languages: ['English', 'French'] },
  'United States': { code: 'US', languages: ['English'] },
  'Argentina': { code: 'AR', languages: ['Spanish'] },
  'Bolivia': { code: 'BO', languages: ['Spanish'] },
  'Brazil': { code: 'BR', languages: ['Portuguese'] },
  'Chile': { code: 'CL', languages: ['Spanish'] },
  'Colombia': { code: 'CO', languages: ['Spanish'] },
  'Costa Rica': { code: 'CR', languages: ['Spanish'] },
  'Cuba': { code: 'CU', languages: ['Spanish'] },
  'Dominican Republic': { code: 'DO', languages: ['Spanish'] },
  'Ecuador': { code: 'EC', languages: ['Spanish'] },
  'El Salvador': { code: 'SV', languages: ['Spanish'] },
  'Guatemala': { code: 'GT', languages: ['Spanish'] },
  'Honduras': { code: 'HN', languages: ['Spanish'] },
  'Mexico': { code: 'MX', languages: ['Spanish'] },
  'Nicaragua': { code: 'NI', languages: ['Spanish'] },
  'Panama': { code: 'PA', languages: ['Spanish'] },
  'Paraguay': { code: 'PY', languages: ['Spanish'] },
  'Peru': { code: 'PE', languages: ['Spanish'] },
  'Uruguay': { code: 'UY', languages: ['Spanish'] },
  'Venezuela': { code: 'VE', languages: ['Spanish'] },
  'China': { code: 'CN', languages: ['Chinese'] },
  'Hong Kong': { code: 'HK', languages: ['Chinese'] },
  'Japan': { code: 'JP', languages: ['Japanese'] },
  'South Korea': { code: 'KR', languages: ['Korean'] },
  'Australia': { code: 'AU', languages: ['English'] },
  'UAE': { code: 'AE', languages: ['English'] }
};

const mediaTypes = [
  { value: "Blog", label: "Blog" },
  { value: "Social Pages", label: "Social Pages" },
  { value: "Newspaper", label: "Newspaper" },
];

const BasicInfo = ({ formData, handleInputChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([]);

  const handleCountryChange = (selectedOption) => {
    const country = selectedOption.value;
    setSelectedCountry(country);

    // Update available languages based on selected country
    const languages = countryLanguageMap[country]?.languages || [];
    setAvailableLanguages(languages);

    // Reset language selection when country changes
    handleInputChange({
      target: {
        name: 'language',
        value: ''
      }
    });

    // Update country in parent component's form data
    handleInputChange({
      target: {
        name: 'country',
        value: country
      }
    });
  };

  const tooltipContent = {
    language: "Select primary language",
    mediaType: "Choose media platform",
    nofollow: "Add nofollow attribute",
    webDomain: "Enter website URL",
    mediaName: "Enter official name",
    followLinks: "Enable follow links",
    sponsoredTag: "Tag sponsored articles",
    noSponsoredTag: "Do not tag sponsored articles",
  };

  const countryOptions = Object.keys(countryLanguageMap).map((country) => ({
    value: country,
    label: (
      <div className="flex items-center">
        <ReactCountryFlag
          countryCode={countryLanguageMap[country].code}
          svg
          style={{ marginRight: '10px', width: '20px', height: '15px' }}
        />
        {country}
      </div>
    ),
  }));

  return (
    <div className="max-w-4xl">
      <div className="space-y-8 p-6">
        {/* Country Dropdown */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Country <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.country}
              </Popover.Panel>
            </Popover>
          </label>
          <Select
            options={countryOptions}
            value={countryOptions.find(option => option.value === selectedCountry)}
            onChange={handleCountryChange}
            className="w-3/4"
            placeholder="Select country"
          />
        </div>

        {/* Language Dropdown */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Language <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.language}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!selectedCountry}
          >
            <option value="">
              {selectedCountry ? 'Select language' : 'Please select a country first'}
            </option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Media Type */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Media Type <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.mediaType}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="mediaType"
            value={formData.mediaType}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select media type</option>
            {mediaTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nofollow */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
          nofollowLinks <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.nofollow}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="nofollow"
              checked={formData.nofollow}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {/* Follow Links */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Follow Links
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.followLinks}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="followLinks"
              checked={formData.followLinks}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {/* Sponsored Tag */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Sponsored Tag
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.sponsoredTag}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sponsoredTag"
              checked={formData.sponsoredTag}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {/* No Sponsored Tag */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            No Sponsored Tag
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.noSponsoredTag}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="noSponsoredTag"
              checked={formData.noSponsoredTag}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {/* Web Domain */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Web Domain <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.webDomain}
              </Popover.Panel>
            </Popover>
          </label>
          <input
            type="url"
            name="webDomain"
            value={formData.webDomain}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Media Name */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Media Name <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.mediaName}
              </Popover.Panel>
            </Popover>
          </label>
          <input
            type="text"
            name="mediaName"
            value={formData.mediaName}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter media name"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;