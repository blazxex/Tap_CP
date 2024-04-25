import { fetchUser } from "./api.js";

export const BACKEND_URL = process.env.BACKEND_URL;
export let user = await fetchUser();
