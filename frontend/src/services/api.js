import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`http://localhost:8000${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
  }
};



export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};






