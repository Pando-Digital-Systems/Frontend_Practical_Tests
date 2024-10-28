// This file is created to make API calles seperately

import axios from "axios";


const API_BASE_URL = "https://jsonplaceholder.typicode.com";  
const PHOTOS_ENDPOINT = (id) => `https://randomuser.me/api/portraits/women/${id}.jpg`; // Endpoint for user photos


// Fetching list of users.
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetching user photo based on user_id
export const fetchUserPhotos = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user photo URL based on user_id
export const getPhotoUrl = (userId) => {
  return PHOTOS_ENDPOINT(userId); // Returns the URL for the user photo
};

