export function formatCPF(cpf: string): string {
  const newValue = cpf.replace(/[^\d]/g, "");

  return newValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
