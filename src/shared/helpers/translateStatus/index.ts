interface IOptions {
  [key: string]: string;
}
export function translateStatus(screen: "courses", status: string): string {
  if (screen === "courses") {
    const optionProjectsTranslate: IOptions = {
      inactive: "Inativo",
      active: "Ativo",
    };
    return optionProjectsTranslate[status] || status;
  }

  return "";
}
