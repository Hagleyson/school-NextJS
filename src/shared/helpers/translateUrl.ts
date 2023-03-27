export function translateUrl(url: string) {
  switch (url) {
    case "view":
      return "visualizar";

    case "update":
      return "atualizar";

    case "register":
      return "registro";
  }
}
