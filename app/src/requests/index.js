import axios from 'axios'
/*
essai basé sur https://github.com/O-clock-Blob/Spe-React-E17-recipes-login-Eden-Cadagiani-Oclock/blob/master/src/requests/index.js

*/
const axiosInstance = axios.create({
  baseURL: 'https://api.totum.ovh/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})

export function saveAuthorisation(token) {
  //fonction permettant de modifier l'instance axios en sauvegardant le token
  axiosInstance.defaults.headers.common.Authorization = `bearer ${token}`
}

export function removeAuthorization() {
  // on supprime le token par defaut de notre instance
  axiosInstance.defaults.headers.common.Authorization = ''
}

export async function requestLogin(email, password) {
  // on utilise notre instance personnalisé de axios, donc on a pas besoin
  // de preciser la baseURL
  const response = await axiosInstance.post('/login', {
    email,
    password,
  })
  return response.data
}

export async function getActivities() {
  try {
    const response = await axios.get('https://api.totum.ovh/v1/activities')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
