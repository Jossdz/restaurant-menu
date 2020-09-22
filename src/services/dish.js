import axios from "axios"
let baseURL

process.env.NODE_ENV === "production"
  ? (baseURL = "/api/dish")
  : (baseURL = "http://localhost:3000/api/dish")

const service = axios.create({ withCredentials: true, baseURL })

export const createDish = async (restaurantId, dishInfo) =>
  await service.post(`/${restaurantId}`, dishInfo)

export const getOneDish = async dishId => await service.get(`/${dishId}`)
