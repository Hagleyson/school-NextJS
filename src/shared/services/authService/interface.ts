import { ILoggedUser, ISign } from "@/shared/Interfaces/index";

export interface ILoginResponse {
  data: ILoggedUser;
  status: number;
}

export interface ISession {
  login: (data: ISign) => Promise<ILoginResponse>;
  logout: () => Promise<void>;
}
