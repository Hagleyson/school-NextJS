import { TOKEN } from "./../../constant/cookies";
import { parseCookies } from "nookies";

export function redirectPage(ctx: any, isAuthPage?: boolean) {
  const { [TOKEN]: token } = parseCookies(ctx);
  if (isAuthPage && token) {
    console.log("1");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (!token && !isAuthPage) {
    console.log("2");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return null;
}
