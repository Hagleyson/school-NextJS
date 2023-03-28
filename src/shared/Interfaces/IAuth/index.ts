export interface IUserResponse {
  secure_id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ILoggedUser {
  user: IUserResponse;
  token: string;
  type: string;
  expireAt: string;
}
export interface ISign {
  email: string;
  password: string;
}
