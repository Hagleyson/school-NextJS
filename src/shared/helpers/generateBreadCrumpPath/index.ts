export const toPascalCase = (url: string) => {
  return url.replace(/\w+/g, (w) => {
    return w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase();
  });
};

export const generateBreadCrumpPath = (route: string) => {
  const removeQuestionMark = route.replace(/\?/g, "/");
  const removeEquals = removeQuestionMark.replace(/\=/g, "/");
  const pathToPascalCase = toPascalCase(removeEquals);
  console.log(pathToPascalCase);
  return pathToPascalCase.split("/");
};
