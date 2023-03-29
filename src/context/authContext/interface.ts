import { ISign, IUserResponse } from "@/shared/Interfaces";

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUserResponse;
  signIn: (data: ISign) => Promise<void>;
}
