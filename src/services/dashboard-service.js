// This file is created to make API calles seperately

import axios from "axios";


const API_BASE_URL = "https://jsonplaceholder.typicode.com";  


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

