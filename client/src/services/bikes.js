import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = 'http://localhost:9000/bikes'

const getAllBikes = async () =>{
  const response = await axios.get(`${baseURL}/bikeList`) ;
  return response.data 
}

const addBike = async (data) => {
  const response = await axios.post(`${baseURL}`, data)
  return response.data
}

const bikesService = {getAllBikes,addBike }
export default bikesService