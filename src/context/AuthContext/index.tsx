import React, { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { authServices } from "@/shared/services/index";
import { ISign, IUserResponse } from "@/shared/Interfaces";
import { IAuthContext } from "./interface";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserResponse>({} as IUserResponse);
  const { login } = authServices();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { user: user } = parseCookies();
    // console.log("user ", user);

    // if (user) {
    //   setUser(JSON.parse(user));
    // }
  }, []);

  async function signIn({ email, password }: ISign) {
    try {
      const response = await login({
        email,
        password,
      });
      if (response.status === 200) {
        const { data } = response;
        setCookie(undefined, "token", data.token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });
        setCookie(undefined, "user", JSON.stringify(data.user));
        setUser(data.user);

        // Router.push("/");
      }
    } catch (error) {}
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
