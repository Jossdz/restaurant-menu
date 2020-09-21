import axios from "axios"
let baseURL

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:3000")

const service = axios.create({ withCredentials: true, baseURL })

export const test = async () => {
  return await service.get("/")
}

export const signup = async user => {
  return await service.post("/signup", user)
}
export const login = async user => {
  return await service.post("/login", user)
}
export const logOut = async () => {
  return await service.get("/logout")
}
export const getProfile = async () => {
  return await service.get("/profile")
}
export const facebookLogin = async () => {
  return await service.get("/auth/facebook")
}
