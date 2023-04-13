export const masks = (name: string) => {
  if (name.includes("date")) {
    return "99/99/9999";
  }
  if (name.includes("phone")) {
    return "(99) 99999-9999";
  }
  if (name.includes("cpf")) {
    return "999-999-999-99";
  }
};
