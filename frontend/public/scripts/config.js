import { fetchUser } from "./api.js";

export const BACKEND_URL = "http://3.233.163.92:3222";
export let user = await fetchUser();
