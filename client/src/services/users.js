import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = 'http://localhost:9000/users'
const registering = async (credentials) =>{
  console.log(credentials);
  const response = await axios.post(`${baseURL}/register` ,credentials ) ;
  return response.data 
}

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials)
  return response.data
}


const usersList = async () => {
  try {
    const response = await axios.get(`${baseURL}/userlist`, getAuthHeader());
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to fetch user list:', error.message);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseURL}/userlist/${userId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user: ' + error.message);
  }}

const logout = async () => {
  await axios.post(`${baseURL}/logout`, undefined, getAuthHeader())
}

const update = async (user) => {
  const response = await axios.patch(
    `${baseURL}/me`,
    {
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      username: user?.username,
      photo: user?.photo
    },
    getAuthHeader()
  )
  return response?.data
}

const usersService = { registering, login, logout, update, usersList , deleteUser }
export default usersService