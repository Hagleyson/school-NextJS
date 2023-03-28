import axios from "axios";

const Http = axios.create({
  baseURL: "http://127.0.0.1:3333/v1",
});
console.log("env ", process.env.API_URL);

Http.interceptors.request.use(
  (config) => {
    const response = { token: { token: "" } };
    const { headers } = config;
    if (response.token) {
      headers.Authorization = `Bearer ${response.token.token}`;
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
    if (isAxiosError && response && response.status === 403) {
      //   destroySession();
      return Promise.reject(error);
    }
    return response;
  }
);
export default Http;
