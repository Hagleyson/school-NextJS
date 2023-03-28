import React, { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { authServices } from "@/shared/services/index";
import { ISign, IUserResponse } from "@/shared/Interfaces";
import { IAuthContext } from "./interface";
import { toast } from "react-toastify";
import { translateErrosLogin } from "@/shared/helpers";
import { TOKEN, USER } from "@/shared/constant";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserResponse>({} as IUserResponse);

  const { login } = authServices();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { USER: user } = parseCookies();
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  async function signIn({ email, password }: ISign) {
    try {
      const response = await login({
        email,
        password,
      });
      const { data } = response;

      if (response.status === 200) {
        setCookie(undefined, TOKEN, data.token, {
          maxAge: 60 * 60 * 1,
        });
        setCookie(undefined, USER, JSON.stringify(data.user));
        setUser(data.user);

        Router.push("/");
        return;
      }

      throw { error: data.code };
    } catch ({ error }: any) {
      toast.error(translateErrosLogin(error));
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = (): IAuthContext => {
  return useContext(AuthContext);
};
