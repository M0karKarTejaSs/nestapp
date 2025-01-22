import { useState, useEffect } from 'react';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem('authToken'); // Assuming the token is saved in localStorage
      if (authToken) {
        try {
            console.log("here-----");
            
          const response = await fetch('http://localhost:8080/auth/user/userProfile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
          } else {
            setErrorMessage('Failed to fetch user profile');
          }
        } catch (error) {
          setErrorMessage('An error occurred while fetching the user profile');
        }
      } else {
        setErrorMessage('No authentication token found');
      }
    };

    fetchUserProfile();
  }, []);

  return { userProfile, errorMessage };
};

export default useUserProfile;
