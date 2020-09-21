import axios from "axios"
let baseURL

process.env.NODE_ENV === "production"
  ? (baseURL = "here should be your production endpoint")
  : (baseURL = "http://localhost:3000/dish")

const service = axios.create({ withCredentials: true, baseURL })

export const createDish = async (restaurantId, dishInfo) =>
  await service.post(`/${restaurantId}`, dishInfo)

export const getOneDish = async dishId => await service.get(`/${dishId}`)
