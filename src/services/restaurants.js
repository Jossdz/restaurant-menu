import axios from "axios"
let baseURL

process.env.NODE_ENV === "production"
  ? (baseURL = "/api/restaurants")
  : (baseURL = "http://localhost:3000/api/restaurants")

const service = axios.create({ withCredentials: true, baseURL })

export const getAllRestaurants = async () => {
  return await service.get("/")
}
export const getOneRestaurant = async restaurantId => {
  return await service.get(`/${restaurantId}`)
}

export const createRestaurant = async restaurantInfo => {
  return await service.post("/", restaurantInfo)
}
