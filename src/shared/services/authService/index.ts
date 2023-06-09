import { urls } from "@/shared/constant/apiUrl";
import { http } from "@/shared/lib";
import { ILoginResponse, ISession } from "./interface";
import { ISign } from "@/shared/Interfaces";

const authServices = (): ISession => {
  async function login(data: ISign): Promise<ILoginResponse> {
    return http.post(urls.auth.login(), data);
  }

  async function logout(): Promise<void> {
    return http.post(urls.auth.logout());
  }

  return { login, logout };
};

export default authServices;
