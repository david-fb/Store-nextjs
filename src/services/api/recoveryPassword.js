import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const sendRecoveryMail = async (body) => {
  try {
    const response = await axios.post(endPoints.auth.recoveryPassword, body, config);
    return response.status;
  } catch (error) {
    console.error(error);
    return Promise.reject(error.response);
  }
};

const changePasswordFromToken = async (body) => {
  try {
    const response = await axios.post(endPoints.auth.changePasswordFromToken, body, config);
    return response.status;
  } catch (error) {
    console.error(error);
    return Promise.reject(error.response);
  }
};

module.exports = { sendRecoveryMail, changePasswordFromToken };
