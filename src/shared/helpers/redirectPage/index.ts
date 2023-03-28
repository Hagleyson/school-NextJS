import { toast } from "react-toastify";
import { TOKEN } from "./../../constant/cookies";
import { parseCookies } from "nookies";

export function redirectPage(ctx: any) {
  const { [TOKEN]: token } = parseCookies(ctx);
  toast.warn("Sessão Expirada");
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return null;
}
