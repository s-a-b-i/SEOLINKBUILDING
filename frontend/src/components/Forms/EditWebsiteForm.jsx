// // components/EditWebsiteForm.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { websiteService } from '../../utils/services';
// import AddWebsiteForm from './AddWebsiteForm';

// const EditWebsiteForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchWebsiteData = async () => {
//       try {
//         const data = await websiteService.getWebsiteById(id);
//         setInitialData(data);
//       } catch (error) {
//         toast.error('Error fetching website data');
//         navigate('/websites');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWebsiteData();
//   }, [id, navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AddWebsiteForm 
//       initialData={initialData}
//       isEditing={true}
//       websiteId={id}
//     />
//   );
// };

// export default EditWebsiteForm;

/// components/EditWebsiteForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { websiteService } from '../../utils/services';
import AddWebsiteForm from './AddWebsiteForm';
import Loader from '../Loader';
import { useAuthStore } from '../../store/authStore';



const EditWebsiteForm = () => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      if (!user?._id || !id) {
        toast.error('Missing required data');
        navigate('/websites');
        return;
      }

      try {
        const data = await websiteService.getWebsiteById(id, user._id);
        if (!data) {
          toast.error('Website not found');
          navigate('/websites');
          return;
        }
        setInitialData(data);
      } catch (error) {
        console.error('Error fetching website:', error);
        toast.error(error.message || 'Error fetching website data');
        navigate('/websites');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsiteData();
  }, [id, navigate, user?._id]);

  if (isLoading) {
    return <Loader />; // Assuming you have a Loader component
  }

  if (!initialData) {
    return null;
  }

  return (
    <AddWebsiteForm 
      initialData={initialData} 
      isEditing={true} 
      websiteId={id} 
    />
  );
};

export default EditWebsiteForm;