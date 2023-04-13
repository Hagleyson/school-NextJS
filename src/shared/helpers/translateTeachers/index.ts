export function translateErrosTeacher(error: string) {
  switch (error) {
    case "E_USER_LINKED":
      return "Esse professor está vinculado a curso, por esse motivo não é possível realizar a exclusão!";
    case "alternative_email":
      return "Email alternativo já cadastrado para outro professor";
    case "email":
      return "Email  já cadastrado para outro professor";
    default:
      return "Ocorreu um erro ao deletar esse professor!";
  }
}
