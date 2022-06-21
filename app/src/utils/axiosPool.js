import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.totum.ovh/v1/',
  // baseURL: 'http://localhost:3000/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export async function getAllActivities() {
  console.log('getallactivities')
  try {
    const result = await instance({
      method: 'get',
      url: '/activities',
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default instance;
