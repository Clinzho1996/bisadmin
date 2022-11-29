/* eslint-disable prettier/prettier */
import axios from 'axios';

const ApiManagerHistory = axios.create({
  baseURL: 'https://hiousapp.com/api/admin',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerHistory;
