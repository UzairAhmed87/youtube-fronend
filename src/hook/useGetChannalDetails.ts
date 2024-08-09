import axios from 'axios';
import { useEffect, useState } from 'react';
import getRefreshToken from '../../src/config';
import { useParams } from 'react-router-dom';

interface ChannelDetails {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number; // Adjust type based on how you handle duration
  views: number; // Adjust type based on how you handle views
  isPublished: boolean;
  owner: string;
  createdAt: string; // You may use Date if parsing this as a Date object
  updatedAt: string; // You may use Date if parsing this as a Date object
  videoLikes: number; // Adjust type based on how you handle likes
}

export default function useGetChannalProfile(username: string | undefined) {
  const [channelProfile, setChannelProfile] = useState<ChannelDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state if needed

  useEffect(() => {
    const fetchChannelProfile = async () => {
      try {
        if (!getRefreshToken) {
          console.log('No token found, user might be logged out');
          return;
        }
        
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}channel/${username}`, // Corrected spelling from 'channal' to 'channel'
          {
            headers: {
              Authorization: `Bearer ${getRefreshToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setChannelProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching channel profile:', error);
        setError('Failed to fetch channel profile'); // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelProfile();
  }, [username]); // Add `username` and `getRefreshToken` to the dependency array if necessary

  return {
    isLoading,
    channelProfile,
    error, // Include error in the returned object
  };
}
