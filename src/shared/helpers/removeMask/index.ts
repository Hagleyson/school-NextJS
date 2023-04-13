export function removeMask(value: string): string {
  let newValue = value.trim();
  newValue = newValue.replaceAll(/\D/g, "").replaceAll(" ", "");

  return newValue;
}
