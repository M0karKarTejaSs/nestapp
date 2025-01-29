import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { retToken } from '../AuthToken';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem('AuthToken');

      // Check if token exists; avoid making API calls if it doesn't
      if (!authToken) {
        console.warn('No authentication token found. Skipping user profile fetch.');
        setErrorMessage('No authentication token found');
        return; // Exit early without breaking the app
      }

      try {
        const response = await fetch('http://localhost:8080/auth/user/userProfile', {
          method: 'GET',
          headers: {
            'Authorization': retToken(),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage('Unauthorized access. Please log in again.');
            navigate('/'); // Redirect to login
          } else {
            setErrorMessage('Failed to fetch user profile');
          }
          return;
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorMessage('An error occurred while fetching the user profile');
        navigate('/'); // Redirect to login page on API error
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return { userProfile, errorMessage };
};

export default useUserProfile;
