import axios from "axios";
import { parseCookies } from "nookies";
import { removeCookies } from "../helpers";

const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

Http.interceptors.request.use(
  (config) => {
    const { TOKEN: token } = parseCookies();

    const { headers } = config;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    headers["Content-Type"] = "application/json";
    headers.Accept = "application/json";

    return config;
  },
  async (error) => {
    return error;
  }
);

Http.interceptors.response.use(
  (value) => {
    return Promise.resolve(value);
  },
  (error) => {
    const { isAxiosError = false, response = null } = error;
    if (isAxiosError && response && response.status === 401) {
      removeCookies();
      return Promise.reject(error);
    }
    return response;
  }
);
export default Http;
