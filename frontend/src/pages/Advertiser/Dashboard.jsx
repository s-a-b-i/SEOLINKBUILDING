// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { websiteService, promoService } from "../../utils/services";
// import { useAuthStore } from "../../store/authStore";
// import DashboardCards from '../../components/Advertiser/Dashboard/DashboardCards';
// import SearchAndFilter from '../../components/Advertiser/Dashboard/SearchAndFilter';
// import RecentServices from '../../components/Advertiser/Dashboard/RecentServices';
// import RankisterPromo from '../../components/Advertiser/Dashboard/RankisterPromo';
// import { toast } from 'react-hot-toast';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const [recentServices, setRecentServices] = useState([]);
//   const [rankisterPromo, setRankisterPromo] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [da, setDa] = useState(0);
//   const [ascore, setAscore] = useState(0);
//   const [mediaType, setMediaType] = useState('');
//   const [category, setCategory] = useState('');
//   const [country, setCountry] = useState('');
//   const [googleNews, setGoogleNews] = useState('');
//   const [sensitiveTopics, setSensitiveTopics] = useState([]);

//   useEffect(() => {
//     if (!user?._id) {
//       toast.error("Please log in to view the dashboard");
//       navigate('/login');
//       return;
//     }
//     fetchRecentData();
//   }, [user, navigate]);

//   const handleViewProduct = (id, userId) => {
//     navigate(`/advertiser/products/view/${id}?action=${userId}`);
//   };

//   const handleSearch = () => {
//     const searchParams = new URLSearchParams();

//     if (searchQuery) {
//       searchParams.append('query', searchQuery);
//     }
//     if (priceRange.min > 0 || priceRange.max < 50000) {
//       searchParams.append('minPrice', priceRange.min.toString());
//       searchParams.append('maxPrice', priceRange.max.toString());
//     }
//     if (da > 0) searchParams.append('da', da.toString());
//     if (ascore > 0) searchParams.append('ascore', ascore.toString());
//     if (mediaType) searchParams.append('mediaType', mediaType);
//     if (category) searchParams.append('category', category);
//     if (country) searchParams.append('country', country);
//     if (googleNews) searchParams.append('googleNews', googleNews);
//     if (sensitiveTopics.length > 0) {
//       sensitiveTopics.forEach(topic => {
//         searchParams.append('sensitiveTopics', topic);
//       });
//     }

//     navigate(`/advertiser/catalogue?${searchParams.toString()}`);
//   };

//   const handleReset = () => {
//     setSearchQuery("");
//     setPriceRange({ min: 0, max: 50000 });
//     setDa(0);
//     setAscore(0);
//     setMediaType('');
//     setCategory('');
//     setCountry('');
//     setGoogleNews('');
//     setSensitiveTopics([]);
//   };

//   const fetchRecentData = async () => {
//     try {
//       setIsLoading(true);
      
//       const websitesData = await websiteService.getRecentlyCreatedWebsites(user._id, 5);
//       const formattedWebsites = websitesData.map(website => ({
//         id: website._id,
//         userId: website.userId,
//         type: website.mediaType,
//         name: website.webDomain,
//         price: `€ ${website.price.toFixed(2)}`,
//         icons: website.mediaType === "Social Pages" ? ["🌐"] : ["🌐"]
//       }));
//       setRecentServices(formattedWebsites);

//       const promosData = await promoService.getRecentlyCreatedPromos(3);
      
//       if (promosData.length > 0) {
//         const maxProductsPromo = promosData.reduce((max, current) => 
//           current.products.length > max.products.length ? current : max
//         , promosData[0]);
        
//         if (maxProductsPromo) {
//           const websiteDetails = await Promise.all(
//             maxProductsPromo.products.map(async websiteId => {
//               try {
//                 return await websiteService.getWebsiteById(websiteId, user._id);
//               } catch (error) {
//                 console.error(`Error fetching website ${websiteId}:`, error);
//                 return null;
//               }
//             })
//           );

//           const validWebsites = websiteDetails.filter(website => website !== null);
          
//           if (validWebsites.length > 0) {
//             const formattedPromo = {
//               id: maxProductsPromo._id,
//               userId: validWebsites[0]?.userId,
//               name: maxProductsPromo.promoName,
//               webDomains: validWebsites.map(website => website.webDomain),
//               price: validWebsites[0]?.price ? 
//                 `€ ${validWebsites[0].price.toFixed(2)}` : "N/A",
//               discountPrice: validWebsites[0]?.price ? 
//                 `€ ${(validWebsites[0].price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A",
//               discount: `${maxProductsPromo.discount}%`,
//               numberOfProducts: validWebsites.length,
//               websites: validWebsites.map(website => ({
//                 id: website._id,
//                 webDomain: website.webDomain,
//                 price: website.price ? `€ ${website.price.toFixed(2)}` : "N/A",
//                 discountPrice: website.price ? 
//                   `€ ${(website.price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A"
//               }))
//             };
            
//             setRankisterPromo([formattedPromo]);
//           } else {
//             setRankisterPromo([]);
//           }
//         }
//       } else {
//         setRankisterPromo([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recent data:", error);
//       toast.error("Error fetching recent data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <DashboardCards />
//       <SearchAndFilter 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         da={da}
//         setDa={setDa}
//         ascore={ascore}
//         setAscore={setAscore}
//         mediaType={mediaType}
//         setMediaType={setMediaType}
//         category={category}
//         setCategory={setCategory}
//         country={country}
//         setCountry={setCountry}
//         googleNews={googleNews}
//         setGoogleNews={setGoogleNews}
//         sensitiveTopics={sensitiveTopics}
//         setSensitiveTopics={setSensitiveTopics}
//         onSearch={handleSearch}
//         onReset={handleReset}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//         <RecentServices 
//           isLoading={isLoading} 
//           recentServices={recentServices} 
//           onViewProduct={handleViewProduct}
//         />
//         <RankisterPromo 
//           isLoading={isLoading} 
//           rankisterPromo={rankisterPromo} 
//           onViewProduct={handleViewProduct}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { websiteService, promoService } from "../../utils/services";
import { useAuthStore } from "../../store/authStore";
import DashboardCards from '../../components/Advertiser/Dashboard/DashboardCards';
import SearchAndFilter from '../../components/Advertiser/Dashboard/SearchAndFilter';
import RecentServices from '../../components/Advertiser/Dashboard/RecentServices';
import RankisterPromo from '../../components/Advertiser/Dashboard/RankisterPromo';
import { toast } from 'react-hot-toast';
import Loader from "../../components/Loader"; // Import the Loader component

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [recentServices, setRecentServices] = useState([]);
  const [rankisterPromo, setRankisterPromo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [da, setDa] = useState(0);
  const [ascore, setAscore] = useState(0);
  const [mediaType, setMediaType] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [googleNews, setGoogleNews] = useState('');
  const [sensitiveTopics, setSensitiveTopics] = useState([]);

  useEffect(() => {
    if (!user?._id) {
      toast.error("Please log in to view the dashboard");
      navigate('/login');
      return;
    }
    fetchRecentData();
  }, [user, navigate]);

  const handleViewProduct = (id, userId) => {
    navigate(`/advertiser/products/view/${id}?action=${userId}`);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    // Add all parameters with proper checks
    if (searchQuery) searchParams.append('query', searchQuery);
    if (priceRange.min > 0) searchParams.append('minPrice', priceRange.min.toString());
    if (priceRange.max < 50000) searchParams.append('maxPrice', priceRange.max.toString());
    if (da > 0) searchParams.append('da', da.toString());
    if (ascore > 0) searchParams.append('ascore', ascore.toString());
    if (mediaType) searchParams.append('mediaType', mediaType);
    if (category) searchParams.append('category', category);
    if (country) searchParams.append('country', country);
    if (googleNews) searchParams.append('googleNews', googleNews);
    if (sensitiveTopics.length > 0) {
      sensitiveTopics.forEach(topic => {
        searchParams.append('sensitiveTopics', topic);
      });
    }
  
    // Navigate with the search parameters
    navigate(`/advertiser/catalogue?${searchParams.toString()}`);
  };
  
  const handleReset = () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: 50000 });
    setDa(0);
    setAscore(0);
    setMediaType('');
    setCategory('');
    setCountry('');
    setGoogleNews('');
    setSensitiveTopics([]);
  };

  const fetchRecentData = async () => {
    try {
      setIsLoading(true);
      
      const websitesData = await websiteService.getRecentlyCreatedWebsites(user._id, 5);
      const formattedWebsites = websitesData.map(website => ({
        id: website._id,
        userId: website.userId,
        type: website.mediaType,
        name: website.webDomain,
        price: `€ ${website.price.toFixed(2)}`,
        icons: website.mediaType === "Social Pages" ? ["🌐"] : ["🌐"]
      }));
      setRecentServices(formattedWebsites);

      const promosData = await promoService.getRecentlyCreatedPromos(3);
      
      if (promosData.length > 0) {
        const maxProductsPromo = promosData.reduce((max, current) => 
          current.products.length > max.products.length ? current : max
        , promosData[0]);
        
        if (maxProductsPromo) {
          const websiteDetails = await Promise.all(
            maxProductsPromo.products.map(async websiteId => {
              try {
                return await websiteService.getWebsiteById(websiteId, user._id);
              } catch (error) {
                console.error(`Error fetching website ${websiteId}:`, error);
                return null;
              }
            })
          );

          const validWebsites = websiteDetails.filter(website => website !== null);
          
          if (validWebsites.length > 0) {
            const formattedPromo = {
              id: maxProductsPromo._id,
              userId: validWebsites[0]?.userId,
              name: maxProductsPromo.promoName,
              webDomains: validWebsites.map(website => website.webDomain),
              price: validWebsites[0]?.price ? 
                `€ ${validWebsites[0].price.toFixed(2)}` : "N/A",
              discountPrice: validWebsites[0]?.price ? 
                `€ ${(validWebsites[0].price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A",
              discount: `${maxProductsPromo.discount}%`,
              numberOfProducts: validWebsites.length,
              websites: validWebsites.map(website => ({
                id: website._id,
                webDomain: website.webDomain,
                price: website.price ? `€ ${website.price.toFixed(2)}` : "N/A",
                discountPrice: website.price ? 
                  `€ ${(website.price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A"
              }))
            };
            
            setRankisterPromo([formattedPromo]);
          } else {
            setRankisterPromo([]);
          }
        }
      } else {
        setRankisterPromo([]);
      }
    } catch (error) {
      console.error("Error fetching recent data:", error);
      toast.error("Error fetching recent data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {isLoading && <Loader />} {/* Show loader when loading */}
      <DashboardCards />
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        da={da}
        setDa={setDa}
        ascore={ascore}
        setAscore={setAscore}
        mediaType={mediaType}
        setMediaType={setMediaType}
        category={category}
        setCategory={setCategory}
        country={country}
        setCountry={setCountry}
        googleNews={googleNews}
        setGoogleNews={setGoogleNews}
        sensitiveTopics={sensitiveTopics}
        setSensitiveTopics={setSensitiveTopics}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <RecentServices 
          isLoading={isLoading} 
          recentServices={recentServices} 
          onViewProduct={handleViewProduct}
        />
        <RankisterPromo 
          isLoading={isLoading} 
          rankisterPromo={rankisterPromo} 
          onViewProduct={handleViewProduct}
        />
      </div>
    </div>
  );
};

export default Dashboard;