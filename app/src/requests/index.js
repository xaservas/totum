import axios from '../utils/axiosPool';
/*
essai basé sur https://github.com/O-clock-Blob/Spe-React-E17-recipes-login-Eden-Cadagiani-Oclock/blob/master/src/requests/index.js

*/
export function saveAuthoristaion(token) {
  axios.defaults.headers.common.Authorization = `bearer ${token}`;
}

export function removeAuthorization() {
  axios.defaults.headers.common.Authorization = '';
}

/* ACTIVITIES requests */
export async function requestActivitiesList() {
  const response = await axios.get('/activities');
  return response.data;
}

export async function requestActivitiesListByCategory(categoryId) {
  const response = await axios.get(`/activities/${categoryId}/category`);
  return response.data;
}

export async function requestActivitiesListByGeo(geoName) {
  const response = await axios.get(`/activities/${geoName}/geo`);
  return response.data;
}

export async function requestActivitiesListBySearch(searchName) {
  const response = await axios.get(`/activities/${searchName}/search`);
  return response.data;
}

/*
*à voir si on utilise cette requête et comment
export async function requestActivitiesListByAdvancedSearch() {}
*/

/* ACTIVITY requests */
export async function requestActivityCreate(activityDatas) {
  const response = await axios({
    method: 'post',
    url: '/activity/createNew',
    data: {
      ...activityDatas,
    },
  });
  return response.data;
}

export async function requestActivityById(activityId) {
  const response = await axios({
    method: 'get',
    url: `/activity/${activityId}/manage`,
  });
  return response.data;
}

export async function requestActivityUpdate(activityId, activityDatas) {
  const response = await axios({
    method: 'patch',
    url: `/activity/${activityId}/manage`,
    data: {
      ...activityDatas,
    },
  });
  return response.data;
}

export async function requestActivityDelete(activityId) {
  const response = await axios({
    method: 'delete',
    url: `/activity/${activityId}/manage`,
  });
  return response.data;
}

export async function requestActivtyUsersList(activityId) {
  const response = await axios({
    method: 'get',
    url: `/activity/${activityId}/user`,
  });
  return response.data;
}

/* CATEGORIES requests */
export async function requestCategoriesList() {
  const response = await axios({
    method: 'get',
    url: '/category/categories',
  });
  return response.data;
}

export async function requestCategoryCreate(categoryDatas) {
  const response = await axios({
    method: 'post',
    url: '/category/createNew',
    data: {
      ...categoryDatas,
    },
  });
  return response.data;
}

export async function requestCategoryById(categoryId) {
  const response = await axios({
    method: 'get',
    url: `/category/${categoryId}/manage`,
  });
  return response.data;
}

export async function requestCategoryUpdate(categoryId, categoryDatas) {
  const response = await axios({
    method: 'patch',
    url: `/category/${categoryId}/manage`,
    data: {
      ...categoryDatas,
    },
  });
  return response.data;
}

export async function requestCategoryDelete(categoryId) {
  const response = await axios({
    method: 'delete',
    url: `/category/${categoryId}/manage`,
  });
  return response.data;
}

/* COMMENTS requests */
export async function requestCommentsByUser(userId) {
  const response = await axios({
    method: 'get',
    url: `/comment/${userId}/user`,
  });
  return response.data;
}

export async function requestCommentsByActivity(activityId) {
  const response = await axios({
    method: 'get',
    url: `/comment/${activityId}/activity`,
  });
  return response.data;
}

export async function requestCommentCreate(commentDatas) {
  const response = await axios({
    method: 'post',
    url: '/comment/createNew',
    data: {
      ...commentDatas,
    },
  });
  return response.data;
}

export async function requestCommentById(commentId) {
  const response = await axios({
    method: 'get',
    url: `/comment/${commentId}/manage`,
  });
  return response.data;
}

export async function requestCommentUpdate(commentId, commentDatas) {
  const response = await axios({
    method: 'patch',
    url: `/comment/${commentId}/manage`,
    data: {
      ...commentDatas,
    },
  });
  return response.data;
}

export async function requestCommentDelete(commentId) {
  const response = await axios({
    method: 'delete',
    url: `/comment/${commentId}/manage`,
  });
  return response.data;
}

/* LEVEL requests */
export async function requestLevelsList() {
  const response = await axios({
    method: 'get',
    url: '/level/getAll',
  });
  return response.data;
}

export async function requestLevelById(levelId) {
  const response = await axios({
    method: 'get',
    url: `/level/getById/${levelId}`,
  });
  return response.data;
}

/* USER requests */

export async function requestUserLogin(userDatas) {
  const response = await axios({
    method: 'post',
    url: '/user/login',
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestUserLogout() {
  const response = await axios({
    method: 'get',
    url: '/user/logout',
  });
  return response.data;
}

export async function requestUserCreate(userDatas) {
  const response = await axios({
    method: 'post',
    url: '/user/createNew',
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestUserById(userId) {
  const response = await axios({
    method: 'get',
    url: `/user/${userId}/manage`,
  });
  return response.data;
}

export async function requestUserUpdate(userId, userDatas) {
  const response = await axios({
    method: 'patch',
    url: `/user/${userId}/manage`,
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestUserDelete(userId) {
  const response = await axios({
    method: 'delete',
    url: `/user/${userId}/manage`,
  });
  return response.data;
}

export async function requestUserActivities(userId) {
  const response = await axios({
    method: 'get',
    url: `/user/${userId}/activity`,
  });
  return response.data;
}

export async function requestPasswordUpdate(userId, userDatas) {
  const response = await axios({
    method: 'patch',
    url: `/user/${userId}/manage/passwordUpdate`,
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestEmailUpdate(userId, userDatas) {
  const response = await axios({
    method: 'patch',
    url: `/user/${userId}/manage/emailUpdate`,
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestUserSendMail(mailDatas) {
  const response = await axios({
    method: 'post',
    url: '/user/sendmail',
    data: {
      ...mailDatas,
    },
  });
  return response.data;
}

export async function requestUserResetPassword(mailDatas) {
  const response = await axios({
    method: 'post',
    url: '/user/resetPassword',
    data: {
      ...mailDatas,
    },
  });
  return response.data;
}

/* REGISTER USER TO ACTIVITY requests */
export async function requestRegisterUserToActivity(userDatas) {
  const response = await axios({
    method: 'post',
    url: '/register',
    data: {
      ...userDatas,
    },
  });
  return response.data;
}

export async function requestRegisterById(registerId) {
  const response = await axios({
    method: 'get',
    url: `/register/${registerId}/manage`,
  });
  return response.data;
}

export async function requestRegisterUpdate(registerId, registerDatas) {
  const response = await axios({
    method: 'patch',
    url: `/register/${registerId}/manage`,
    data: {
      ...registerDatas,
    },
  });
  return response.data;
}

export async function requestRegisterDelete(registerId) {
  const response = await axios({
    method: 'delete',
    url: `/register/${registerId}/manage`,
  });
  return response.data;
}
// pas certain d'avoir compris cette requête sur swagger
export async function requestRegisterGetForUser(registerDatas) {
  const response = await axios({
    method: 'post',
    url: '/register/getForUser',
    data: {
      ...registerDatas,
    },
  });
  return response.data;
}

/* META requests */
export async function requestUserMetaDatas(userId) {
  const response = await axios({
    method: 'get',
    url: `/meta/${userId}/manage`,
  });
  return response.data;
}

export async function requestUserMetaDatasUpdate(userId, metaDatas) {
  const response = await axios({
    method: 'patch',
    url: `/meta/${userId}/manage`,
    data: {
      ...metaDatas,
    },
  });
  return response.data;
}
