/* eslint-disable prettier/prettier */
import axios from 'axios';

const ApiManagerReset = axios.create({
  baseURL: 'https://hiousapp.com/api/admin',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerReset;
