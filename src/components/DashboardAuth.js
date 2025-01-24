import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { retToken } from '../AuthToken';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem('AuthToken');
      if (authToken) {
        try {
          const response = await fetch('http://localhost:8080/auth/user/userProfile', {
            method: 'GET',
            headers: {
              'Authorization': retToken(),
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data, "datadata");
            setUserProfile(data);
          } else {
            setErrorMessage('Failed to fetch user profile');
          }
        } catch (error) {
          setErrorMessage('An error occurred while fetching the user profile');
        }
      } else {
        setErrorMessage('No authentication token found');
        navigate('/'); // Redirect to the login page
      }
    };

    fetchUserProfile();
  }, [navigate]); // Adding navigate to the dependency array to avoid warnings

  return { userProfile, errorMessage };
};

export default useUserProfile;
