import { toast } from "react-toastify";
import { IUserResponse } from "@/shared/Interfaces";
import { TOKEN, USER } from "@/shared/constant";
import { destroyCookie, setCookie } from "nookies";

export function removeCookies() {
  destroyCookie(null, TOKEN);
  destroyCookie(null, USER);
  toast.warn("Sessão Encerrada");
}
export function createSession(token: string, user: IUserResponse) {
  setCookie(undefined, TOKEN, token, {
    maxAge: 60 * 60 * 11,
  });
  setCookie(undefined, USER, JSON.stringify(user), {
    maxAge: 60 * 60 * 11,
  });
}
