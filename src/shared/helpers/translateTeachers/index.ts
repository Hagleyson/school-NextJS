export function translateErrosTeacher(error: string) {
  switch (error) {
    case "E_USER_LINKED":
      return "Esse professor está vinculado a curso, por esse motivo não é possível realizar a exclusão!";
    default:
      return "Ocorreu um erro ao deletar esse professor!";
  }
}
