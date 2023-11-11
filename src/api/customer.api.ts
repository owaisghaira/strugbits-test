import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const fetchCustomers = async (page: number) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
