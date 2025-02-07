import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
 FaGift, FaClock, FaPen, FaChartBar, 
 FaGlobe, FaBars, FaTimes 
} from 'react-icons/fa';
import { websiteService } from '../../utils/services';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import PackageDiscountModal from './PackageDiscountModal';
import HighlightMediaModal from './HighlightMediaModal';
import Loader from '../../components/Loader';

const ApprovedList = () => {
 const navigate = useNavigate();
 const user = useAuthStore((state) => state.user);
 const [websites, setWebsites] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 // Modal states
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
 const [selectedWebsite, setSelectedWebsite] = useState(null);
 const [selectedMonths, setSelectedMonths] = useState('1');

 useEffect(() => {
   if (user?._id) {
     fetchWebsites();
   }
 }, [user]);

 const fetchWebsites = async () => {
   try {
     setIsLoading(true);
     const response = await websiteService.getWebsitesApproved(user._id);
     setWebsites(response);
     setError(null);
   } catch (err) {
     setError('Failed to fetch websites');
     toast.error('Error loading websites');
   } finally {
     setIsLoading(false);
   }
 };

 const handleModalClose = (updatedData = null) => {
   if (updatedData && selectedWebsite) {
     setWebsites(prevWebsites =>
       prevWebsites.map(website =>
         website._id === selectedWebsite._id ? { ...website, ...updatedData } : website
       )
     );
   }
   setIsModalOpen(false);
   setIsHighlightModalOpen(false);
   setSelectedWebsite(null);
 };

 const handleStatsClick = (websiteId) => {
   navigate(`/publisher/products/${websiteId}/stats`);
 };

 const handleGiftClick = (website) => {
   setSelectedWebsite(website);
   setIsModalOpen(true);
 };

 const handleClockClick = (website) => {
   setSelectedWebsite(website);
   setSelectedMonths(website.highlightMonths || '1');
   setIsHighlightModalOpen(true);
 };

 const handleEditClick = (websiteId) => {
   navigate(`/publisher/products/${websiteId}/edit`);
 };

 if (isLoading) return <div className="flex justify-center items-center h-64"><Loader /></div>;
 if (error) return <div className="text-center text-red-600 p-4">{error}</div>;
 if (!user) return <div className="text-center text-gray-600 p-4">Please log in to view your websites.</div>;
 if (websites.length === 0) return <div className="text-center text-gray-600 p-4">No approved websites found.</div>;

 return (
   <div className="container mx-auto px-4 py-6">
     <div className="flex justify-between items-center mb-6">
       <h2 className="text-xl md:text-2xl font-bold">Approved Websites</h2>
       <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
         <FaBars size={24} />
       </button>
     </div>

     <div className="space-y-4">
       {websites.map((website) => (
         <div key={website._id} className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white hover:shadow-lg transition-all duration-300">
           <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
             <div className="w-full md:w-48 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
               {website.thumbnail ? (
                 <img src={website.thumbnail} alt={website.webDomain} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                   <span className="text-gray-400">No Image</span>
                 </div>
               )}
             </div>

             <div className="flex-grow w-full">
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-2 h-2 bg-green-400 rounded-full" />
                 <h3 className="text-base md:text-lg font-semibold">{website.webDomain}</h3>
               </div>

               <div className="flex items-center gap-2 mb-4">
                 <span className="text-gray-600 text-sm">{website.mediaType}</span>
                 <FaGlobe className="text-gray-400" />
               </div>

               <div className="text-gray-600 text-sm mb-4 line-clamp-2">{website.description}</div>

               <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                 <div>
                   <div className="text-xs md:text-sm text-gray-500">Language</div>
                   <div className="font-medium text-sm">{website.language}</div>
                 </div>
                 <div>
                   <div className="text-xs md:text-sm text-gray-500">Category</div>
                   <div className="font-medium text-sm">{website.category.join(', ')}</div>
                 </div>
               </div>
             </div>

             <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4">
               <div className="text-xl md:text-2xl font-bold">€ {website.price}</div>
               <div className="grid grid-cols-4 md:flex gap-2">
                 <button
                   className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors"
                   onClick={() => handleGiftClick(website)}
                   title="Package Discount"
                 >
                   <FaGift size={18} />
                 </button>
                 <button
                   className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition-colors"
                   onClick={() => handleClockClick(website)}
                   title="Highlight Media"
                 >
                   <FaClock size={18} />
                 </button>
                 <button
                   className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                   onClick={() => handleEditClick(website._id)}
                   title="Edit Website"
                 >
                   <FaPen size={18} />
                 </button>
                 <button
                   className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                   onClick={() => handleStatsClick(website._id)}
                   title="Analytics"
                 >
                   <FaChartBar size={18} />
                 </button>
               </div>
             </div>
           </div>
           <div className="mt-4 text-xs md:text-sm text-green-600 bg-green-50 p-2 rounded">
             Status: Approved
           </div>
         </div>
       ))}
     </div>

     <PackageDiscountModal
       isOpen={isModalOpen}
       onClose={handleModalClose}
       websiteDomain={selectedWebsite?.webDomain}
       websiteId={selectedWebsite?._id}
       discountprop={selectedWebsite?.discount}
       slotsprop={selectedWebsite?.slots}
       pricePerPublicationprop={selectedWebsite?.pricePerPublication}
       websitePrice={selectedWebsite?.price} 
     />

     <HighlightMediaModal
       isOpen={isHighlightModalOpen}
       onClose={handleModalClose}
       websiteDomain={selectedWebsite?.webDomain}
       websiteId={selectedWebsite?._id}
       selectedMonths={selectedMonths}
       onMonthsChange={setSelectedMonths}
     />
   </div>
 );
};

export default ApprovedList;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//  FaGift, FaClock, FaPen, FaChartBar, 
//  FaGlobe, FaBars, FaTimes 
// } from 'react-icons/fa';
// import { websiteService } from '../../utils/services';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import PackageDiscountModal from './PackageDiscountModal';
// import HighlightMediaModal from './HighlightMediaModal';
// import Loader from '../../components/Loader';

// const ApprovedList = () => {
//  const navigate = useNavigate();
//  const user = useAuthStore((state) => state.user);
//  const [websites, setWebsites] = useState([]);
//  const [isLoading, setIsLoading] = useState(true);
//  const [error, setError] = useState(null);
//  const [isMenuOpen, setIsMenuOpen] = useState(false);

//  // Modal states
//  const [isModalOpen, setIsModalOpen] = useState(false);
//  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
//  const [selectedWebsite, setSelectedWebsite] = useState(null);
//  const [selectedMonths, setSelectedMonths] = useState('1');

//  // Thumbnail API key from environment variable
//  const thumbnailApiKey = import.meta.env.VITE_THUMBNAIL_API_KEY;

//  useEffect(() => {
//    if (user?._id) {
//      fetchWebsites();
//    }
//  }, [user]);

//  const fetchWebsites = async () => {
//    try {
//      setIsLoading(true);
//      const response = await websiteService.getWebsitesApproved(user._id);
     
//      // Optional: Integrate Thumbnail.ws API for additional thumbnail processing
//      const websitesWithThumbnails = await Promise.all(response.map(async (website) => {
//        if (!website.thumbnail && thumbnailApiKey) {
//          try {
//            // Example Thumbnail.ws API integration (adjust based on actual API)
//            const thumbnailResponse = await fetch(`https://api.thumbnail.ws/api/${thumbnailApiKey}/thumbnail/get?url=${website.webDomain}&width=300&height=200`);
//            const thumbnailData = await thumbnailResponse.json();
//            return { ...website, thumbnail: thumbnailData.url };
//          } catch (thumbnailError) {
//            console.error('Thumbnail generation failed', thumbnailError);
//            return website;
//          }
//        }
//        return website;
//      }));

//      setWebsites(websitesWithThumbnails);
//      setError(null);
//    } catch (err) {
//      setError('Failed to fetch websites');
//      toast.error('Error loading websites');
//    } finally {
//      setIsLoading(false);
//    }
//  };

//  const handleModalClose = (updatedData = null) => {
//    if (updatedData && selectedWebsite) {
//      setWebsites(prevWebsites =>
//        prevWebsites.map(website =>
//          website._id === selectedWebsite._id ? { ...website, ...updatedData } : website
//        )
//      );
//    }
//    setIsModalOpen(false);
//    setIsHighlightModalOpen(false);
//    setSelectedWebsite(null);
//  };

//  const handleStatsClick = (websiteId) => {
//    navigate(`/publisher/products/${websiteId}/stats`);
//  };

//  const handleGiftClick = (website) => {
//    setSelectedWebsite(website);
//    setIsModalOpen(true);
//  };

//  const handleClockClick = (website) => {
//    setSelectedWebsite(website);
//    setSelectedMonths(website.highlightMonths || '1');
//    setIsHighlightModalOpen(true);
//  };

//  const handleEditClick = (websiteId) => {
//    navigate(`/publisher/products/${websiteId}/edit`);
//  };

//  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader /></div>;
//  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;
//  if (!user) return <div className="text-center text-gray-600 p-4">Please log in to view your websites.</div>;
//  if (websites.length === 0) return <div className="text-center text-gray-600 p-4">No approved websites found.</div>;

//  return (
//    <div className="container mx-auto px-4 py-6">
//      <div className="flex justify-between items-center mb-6">
//        <h2 className="text-xl md:text-2xl font-bold">Approved Websites</h2>
//        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//          <FaBars size={24} />
//        </button>
//      </div>

//      <div className="space-y-4">
//        {websites.map((website) => (
//          <div key={website._id} className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white hover:shadow-lg transition-all duration-300">
//            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
//              <div className="w-full md:w-48 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
//                {website.thumbnail ? (
//                  <img src={website.thumbnail} alt={website.webDomain} className="w-full h-full object-cover" />
//                ) : (
//                  <div className="w-full h-full flex items-center justify-center">
//                    <span className="text-gray-400">No Image</span>
//                  </div>
//                )}
//              </div>

//              <div className="flex-grow w-full">
//                <div className="flex items-center gap-2 mb-3">
//                  <div className="w-2 h-2 bg-green-400 rounded-full" />
//                  <h3 className="text-base md:text-lg font-semibold">{website.webDomain}</h3>
//                </div>

//                <div className="flex items-center gap-2 mb-4">
//                  <span className="text-gray-600 text-sm">{website.mediaType}</span>
//                  <FaGlobe className="text-gray-400" />
//                </div>

//                <div className="text-gray-600 text-sm mb-4 line-clamp-2">{website.description}</div>

//                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
//                  <div>
//                    <div className="text-xs md:text-sm text-gray-500">Language</div>
//                    <div className="font-medium text-sm">{website.language}</div>
//                  </div>
//                  <div>
//                    <div className="text-xs md:text-sm text-gray-500">Category</div>
//                    <div className="font-medium text-sm">{website.category.join(', ')}</div>
//                  </div>
//                </div>
//              </div>

//              <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4">
//                <div className="text-xl md:text-2xl font-bold">€ {website.price}</div>
//                <div className="grid grid-cols-4 md:flex gap-2">
//                  <button
//                    className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors"
//                    onClick={() => handleGiftClick(website)}
//                    title="Package Discount"
//                  >
//                    <FaGift size={18} />
//                  </button>
//                  <button
//                    className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition-colors"
//                    onClick={() => handleClockClick(website)}
//                    title="Highlight Media"
//                  >
//                    <FaClock size={18} />
//                  </button>
//                  <button
//                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
//                    onClick={() => handleEditClick(website._id)}
//                    title="Edit Website"
//                  >
//                    <FaPen size={18} />
//                  </button>
//                  <button
//                    className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
//                    onClick={() => handleStatsClick(website._id)}
//                    title="Analytics"
//                  >
//                    <FaChartBar size={18} />
//                  </button>
//                </div>
//              </div>
//            </div>
//            <div className="mt-4 text-xs md:text-sm text-green-600 bg-green-50 p-2 rounded">
//              Status: Approved
//            </div>
//          </div>
//        ))}
//      </div>

//      <PackageDiscountModal
//        isOpen={isModalOpen}
//        onClose={handleModalClose}
//        websiteDomain={selectedWebsite?.webDomain}
//        websiteId={selectedWebsite?._id}
//        discountprop={selectedWebsite?.discount}
//        slotsprop={selectedWebsite?.slots}
//        pricePerPublicationprop={selectedWebsite?.pricePerPublication}
//      />

//      <HighlightMediaModal
//        isOpen={isHighlightModalOpen}
//        onClose={handleModalClose}
//        websiteDomain={selectedWebsite?.webDomain}
//        websiteId={selectedWebsite?._id}
//        selectedMonths={selectedMonths}
//        onMonthsChange={setSelectedMonths}
//      />
//    </div>
//  );
// };

// export default ApprovedList;