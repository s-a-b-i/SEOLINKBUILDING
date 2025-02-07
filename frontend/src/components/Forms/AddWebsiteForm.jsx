import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { websiteService } from '../../utils/services';
import BasicInfo from './BasicInfo';
import CategorySelection from './CategorySelection';
import PriceSection from './PriceSection';
import EditorSection from './EditorSection';
import SocialMediaSection from './SocialMediaSection';
import { useAuthStore } from "../../store/authStore"; // ✅ Import auth store

const initialFormData = {
  country: "", // Add country field
  language: "",
  mediaType: "",
  nofollow: false,
  followLinks: false,
  sponsoredTag: false,
  noSponsoredTag: false,
  category: [],
  webDomain: "",
  mediaName: "",
  price: "",
  commission: 0,
  netProfit: 0,
  description: "",
  publicationGuidelines: "",
  publicationDuration: "",
  averagePublicationTime: "",
  socialMedia: {
    facebook: [],
    instagram: [],
    tiktok: [],
    reddit: [],
    telegram: []
  },
  sensitiveTopics: [],
  googleNews: false,
};

const AddWebsiteForm = ({ initialData, isEditing, websiteId }) => {
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [description, setDescription] = useState(initialData?.description || "");
  const [publicationGuidelines, setPublicationGuidelines] = useState(initialData?.publicationGuidelines || "");
  const [selectedCountry, setSelectedCountry] = useState(initialData?.country || '');
  const [availableLanguages, setAvailableLanguages] = useState(
    initialData?.country 
      ? countryLanguageMap[initialData.country]?.languages || [] 
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Get user from Auth Store
  const { user } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name === "price") {
      const cleanedValue = value.replace(/^0+/, "").replace(/[^\d]/g, "");
      const numValue = parseInt(cleanedValue) || 0;
      const commission = numValue * 0.1;
      const netProfit = numValue * 0.9;
  
      setFormData((prevData) => ({
        ...prevData,
        price: cleanedValue,
        commission,
        netProfit,
      }));
    } else if (name === "country") {
      setFormData((prevData) => ({
        ...prevData,
        country: value,
        language: "", // Reset language when country changes
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({ ...formData, category: categories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user?._id) throw new Error("User ID is required");

      const finalFormData = {
        ...formData,
        description,
        publicationGuidelines,
        socialMedia: {
          facebook: formData.socialMedia.facebook,
          instagram: formData.socialMedia.instagram,
          tiktok: formData.socialMedia.tiktok,
          reddit: formData.socialMedia.reddit,
          telegram: formData.socialMedia.telegram,
        },
        userId: user._id, // ✅ Include userId
      };

      if (isEditing) {
        await websiteService.updateWebsite(websiteId, finalFormData, user._id);
        toast.success('Website updated successfully!');
      } else {
        await websiteService.createWebsite(finalFormData);
        toast.success('Website added successfully!');
      }

      navigate('/publisher/products');
    } catch (error) {
      toast.error(error.message || 'Error saving website');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Website / Fanpage' : 'Add Website / Fanpage'}
      </h1>

      <p>In this section you can put descriptions for your Media.
Rankister is designed as an outside Salesperson for your Company and retains 20% of orders, so please enter the price you normally charge for your sales and do not increase price. Rankister provides the platform and technology to make you sell more. In this you will get more orders monthly.
Publishers who charge increased prices from their public prices will NOT be approved!
First you need to name your Media, for example if the website is Rankister.com you can put the name Rankister.
You can sell publications on the website by putting the domain name in the Website Domain field. If the website also has social channels and to share an article you ask for extra you can add in the Extras field for example: Share on Facebook Page and put the price in the Box next to it.
Rankister was also designed for companies or people who do not own a website but have pages or groups on social, for example who work as Influencers and have only Social profiles. In that case the Site Domain Name is left Blank and only the Social part is filled in by putting the link of the page or Group. If you want more information before proceeding, you can contact us from the Contact page.</p>

      <BasicInfo 
         formData={formData} 
         handleInputChange={handleInputChange}
         selectedCountry={selectedCountry}
         setSelectedCountry={setSelectedCountry}
         availableLanguages={availableLanguages}
         setAvailableLanguages={setAvailableLanguages}
      />

      <CategorySelection 
        formData={formData}
        handleCategoryChange={handleCategoryChange} 
      />

      <PriceSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      <EditorSection 
        description={description}
        publicationGuidelines={publicationGuidelines}
        handleDescriptionChange={setDescription}
        setPublicationGuidelines={setPublicationGuidelines}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <SocialMediaSection 
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`${
          isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } text-white py-2 px-6 rounded-md transition-colors`}
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Save Product'}
      </button>
    </form>
  );
};

export default AddWebsiteForm;
