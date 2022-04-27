import endPoints from '@services/api';
import axios from 'axios';

const getCategories = async () => {
  try {
    const response = await axios.get(endPoints.categories.getCategories);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCategories };
