export function translateErrosLogin(error: string) {
  switch (error) {
    case "E_INVALID_AUTH_UID":
      return "Usuário Não Encontrado, Por Favor Tente Novamente!";

    case "E_INVALID_AUTH_PASSWORD":
      return "Senha Incorreta, Por Favor Tente Novamente!";
    default:
      return "Ocorreu Um Erro Por Favor Tente Novamente!";
  }
}
