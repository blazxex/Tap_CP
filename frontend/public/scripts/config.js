import { fetchUser } from "./api.js"

export const BACKEND_URL = "http://localhost:3222"
export let user = await fetchUser();