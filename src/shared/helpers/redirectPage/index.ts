import { setContext } from "@/shared/lib";
import { TOKEN } from "./../../constant/cookies";
import { parseCookies } from "nookies";

export function redirectPage(ctx: any, isAuthPage?: boolean) {
  const { [TOKEN]: token } = parseCookies(ctx);
  setContext(ctx);
  if (isAuthPage && token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (!token && !isAuthPage) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return null;
}
