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
  try {
    const result = await instance({
      method: 'get',
      url: '/activities',
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getActivityById(activityId) {
  try {
    const result = await instance({
      method: 'get',
      url: `/activity/${activityId}/manage`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getActivitiesByUserId(userId) {
  try {
    const result = await axios({
      method: 'get',
      url: `/user/${userId}/activity`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getParticipantByActivityId(activityId) {
  try {
    const result = await instance({
      method: 'get',
      url: `/activity/${activityId}/user`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCommentsByActivityId(activityId) {
  try {
    const result = await instance({
      method: 'get',
      url: `comment/${activityId}/activity`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllLevels() {
  try {
    const result = await instance({
      method: 'get',
      url: '/level/getAll',
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserById(userId) {
  try {
    const result = await instance({
      method: 'get',
      url: `/user/${userId}/manage`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllCategories() {
  try {
    const result = await instance({
      method: 'get',
      url: '/category/categories',
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllActivitiesBySearchName(searchName) {
  try {
    const result = await instance({
      method: 'get',
      url: `/activities/${searchName}/search`,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}
export default instance;
